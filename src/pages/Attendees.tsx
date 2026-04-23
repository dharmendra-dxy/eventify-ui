import { useState } from 'react';
import { CheckCircle, XCircle, Mail, UserPlus, Star, QrCode } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoModal } from '@/components/ui/NeoModal';
import { NeoSelect } from '@/components/ui/NeoSelect';
import { ExportButton } from '@/components/ExportButton';
import { getAttendees, getEvents, type Attendee } from '@/lib/data';
import { cn } from '@/lib/utils';

export const Attendees: React.FC = () => {
  const [attendees, setAttendees] = useState<Attendee[]>(getAttendees());
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventId: '',
    ticketId: '',
  });

  const events = getEvents();

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = eventFilter === 'all' || attendee.eventId === eventFilter;
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'checked-in' && attendee.checkInStatus) ||
      (statusFilter === 'not-checked-in' && !attendee.checkInStatus);
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const handleCheckIn = (attendeeId: string) => {
    setAttendees(attendees.map(a =>
      a._id === attendeeId ? { ...a, checkInStatus: !a.checkInStatus } : a
    ));
  };

  const handleAddAttendee = () => {
    const newAttendee: Attendee = {
      _id: `att${String(attendees.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      eventId: formData.eventId,
      ticketId: formData.ticketId || `tkt${String(attendees.length + 1).padStart(3, '0')}`,
      checkInStatus: false,
      registrationDate: new Date().toISOString().split('T')[0],
    };
    setAttendees([...attendees, newAttendee]);
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', eventId: '', ticketId: '' });
  };

  const getEventName = (eventId: string) => {
    const event = events.find(e => e._id === eventId);
    return event?.title || 'Unknown Event';
  };

  const openQRModal = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setIsQRModalOpen(true);
  };

  const eventOptions = events.map(e => ({ value: e._id, label: e.title }));
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'checked-in', label: 'Checked In' },
    { value: 'not-checked-in', label: 'Not Checked In' },
  ];

  return (
    <div className="neo-page p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 relative">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
            Attendees
          </h1>
          <NeoBadge variant="secondary" rotation={-2}>{attendees.length}</NeoBadge>
        </div>
        <p className="text-lg font-medium text-black/60">
          Manage event attendees and check-ins.
        </p>
        <Star className="absolute top-0 right-4 w-8 h-8 text-[#FFD93D] rotate-12 hidden lg:block" />
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 max-w-md">
            <NeoInput
              placeholder="Search attendees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <NeoSelect
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              options={[{ value: 'all', label: 'All Events' }, ...eventOptions]}
            />
          </div>
          <div className="w-full sm:w-48">
            <NeoSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <ExportButton
            data={filteredAttendees}
            filename="attendee_list"
            title="Event Attendee List"
          />
          <NeoButton onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="w-5 h-5 mr-2" />
            Add Attendee
          </NeoButton>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <NeoCard hover={false} className="p-4">
          <p className="text-xs uppercase font-bold text-black/60">Total</p>
          <p className="text-3xl font-black">{attendees.length}</p>
        </NeoCard>
        <NeoCard hover={false} className="p-4">
          <p className="text-xs uppercase font-bold text-black/60">Checked In</p>
          <p className="text-3xl font-black text-green-600">
            {attendees.filter(a => a.checkInStatus).length}
          </p>
        </NeoCard>
        <NeoCard hover={false} className="p-4">
          <p className="text-xs uppercase font-bold text-black/60">Pending</p>
          <p className="text-3xl font-black text-amber-600">
            {attendees.filter(a => !a.checkInStatus).length}
          </p>
        </NeoCard>
        <NeoCard hover={false} className="p-4">
          <p className="text-xs uppercase font-bold text-black/60">Check-in Rate</p>
          <p className="text-3xl font-black">
            {Math.round((attendees.filter(a => a.checkInStatus).length / attendees.length) * 100)}%
          </p>
        </NeoCard>
      </div>

      {/* Attendees Table */}
      <NeoCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FF6B6B]">
                <th className="border-4 border-black px-4 py-3 text-left font-black uppercase text-sm">Attendee</th>
                <th className="border-4 border-black px-4 py-3 text-left font-black uppercase text-sm">Event</th>
                <th className="border-4 border-black px-4 py-3 text-left font-black uppercase text-sm">Ticket ID</th>
                <th className="border-4 border-black px-4 py-3 text-left font-black uppercase text-sm">Status</th>
                <th className="border-4 border-black px-4 py-3 text-left font-black uppercase text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.map((attendee, index) => (
                <tr
                  key={attendee._id}
                  className={cn(
                    'hover:bg-[#FFFDF5] transition-colors',
                    index % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF5]'
                  )}
                >
                  <td className="border-4 border-black px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#C4B5FD] border-4 border-black flex items-center justify-center font-bold flex-shrink-0">
                        {attendee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold">{attendee.name}</p>
                        <p className="text-sm text-black/60 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {attendee.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-4 border-black px-4 py-3">
                    <p className="font-medium">{getEventName(attendee.eventId)}</p>
                  </td>
                  <td className="border-4 border-black px-4 py-3">
                    <span className="font-mono font-bold text-sm">{attendee.ticketId}</span>
                  </td>
                  <td className="border-4 border-black px-4 py-3">
                    <button
                      onClick={() => handleCheckIn(attendee._id)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1 border-4 border-black font-bold text-sm uppercase transition-all',
                        attendee.checkInStatus
                          ? 'bg-green-400 shadow-[3px_3px_0px_#000]'
                          : 'bg-gray-200 hover:bg-amber-300'
                      )}
                    >
                      {attendee.checkInStatus ? (
                        <><CheckCircle className="w-4 h-4" /> Checked In</>
                      ) : (
                        <><XCircle className="w-4 h-4" /> Pending</>
                      )}
                    </button>
                  </td>
                  <td className="border-4 border-black px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openQRModal(attendee)}
                        className="p-2 bg-[#FFD93D] border-4 border-black hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAttendees.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#C4B5FD] border-4 border-black mx-auto mb-4 flex items-center justify-center shadow-[6px_6px_0px_#000]">
              <UserPlus className="w-8 h-8" />
            </div>
            <p className="font-bold text-lg">No attendees found</p>
            <p className="text-black/60">Try adjusting your filters</p>
          </div>
        )}
      </NeoCard>

      {/* Add Attendee Modal */}
      <NeoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Attendee"
        footer={
          <>
            <NeoButton variant="muted" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </NeoButton>
            <NeoButton onClick={handleAddAttendee}>
              Add Attendee
            </NeoButton>
          </>
        }
      >
        <div className="space-y-4">
          <NeoInput
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter attendee name"
          />
          <NeoInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
          />
          <NeoSelect
            label="Event"
            value={formData.eventId}
            onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
            options={[{ value: '', label: 'Select Event' }, ...eventOptions]}
          />
          <NeoInput
            label="Ticket ID (Optional)"
            value={formData.ticketId}
            onChange={(e) => setFormData({ ...formData, ticketId: e.target.value })}
            placeholder="Auto-generated if empty"
          />
        </div>
      </NeoModal>

      {/* QR Code Modal */}
      <NeoModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        title="Ticket QR Code"
        footer={
          <NeoButton variant="muted" onClick={() => setIsQRModalOpen(false)}>
            Close
          </NeoButton>
        }
      >
        {selectedAttendee && (
          <div className="text-center py-4">
            <div className="bg-white border-4 border-black p-6 inline-block shadow-[8px_8px_0px_#000] mb-4">
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 bg-[#FFFDF5] border-4 border-black flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1 p-4">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-6 h-6',
                        Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="font-bold text-lg">{selectedAttendee.name}</p>
            <p className="text-black/60">{getEventName(selectedAttendee.eventId)}</p>
            <p className="font-mono text-sm mt-2">{selectedAttendee.ticketId}</p>
            <NeoBadge
              variant={selectedAttendee.checkInStatus ? 'secondary' : 'muted'}
              className="mt-4"
            >
              {selectedAttendee.checkInStatus ? 'Checked In' : 'Not Checked In'}
            </NeoBadge>
          </div>
        )}
      </NeoModal>
    </div>
  );
};