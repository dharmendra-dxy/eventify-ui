import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Calendar, MapPin, Users, Star } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoModal } from '@/components/ui/NeoModal';
import { NeoSelect } from '@/components/ui/NeoSelect';
import { NeoTextarea } from '@/components/ui/NeoTextarea';
import { ExportButton } from '@/components/ExportButton';
import { getEvents, formatDate, formatCurrency, type Event } from '@/lib/data';
import { cn } from '@/lib/utils';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(getEvents());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    capacity: 0,
    ticketPrice: 0,
    category: 'Technology',
    organizer: '',
    status: 'upcoming',
  });

  const categories = ['all', 'Technology', 'Music', 'Business', 'Art', 'Food', 'Wellness', 'Film', 'Gaming', 'Fashion', 'Entertainment'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    const newEvent: Event = {
      ...formData as Event,
      _id: `evt${String(events.length + 1).padStart(3, '0')}`,
      image: 'default',
    };
    setEvents([...events, newEvent]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedEvent) return;
    setEvents(events.map(e => e._id === selectedEvent._id ? { ...selectedEvent, ...formData } as Event : e));
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedEvent) return;
    setEvents(events.filter(e => e._id !== selectedEvent._id));
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      capacity: 0,
      ticketPrice: 0,
      category: 'Technology',
      organizer: '',
      status: 'upcoming',
    });
  };

  const openEditModal = (event: Event) => {
    setSelectedEvent(event);
    setFormData(event);
    setIsEditModalOpen(true);
  };

  const openViewModal = (event: Event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const categoryOptions = categories.filter(c => c !== 'all').map(c => ({ value: c, label: c }));
  const statusOptions = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="neo-page p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 relative">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
            Events
          </h1>
          <NeoBadge variant="primary" rotation={2}>{events.length}</NeoBadge>
        </div>
        <p className="text-lg font-medium text-black/60">
          Manage all your events in one place.
        </p>
        <Star className="absolute top-0 right-4 w-8 h-8 text-[#FFD93D] -rotate-12 hidden lg:block" />
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 max-w-md">
            <NeoInput
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-48">
            <NeoSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={categories.map(c => ({ value: c, label: c === 'all' ? 'All Categories' : c }))}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <ExportButton
            data={filteredEvents}
            filename="event_list"
            title="Event List Report"
          />
          <NeoButton onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </NeoButton>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <NeoCard
            key={event._id}
            rotation={index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0}
          >
            {/* Event Header */}
            <div className={cn(
              'border-b-4 border-black p-4 -mx-6 -mt-6 mb-4',
              event.status === 'upcoming' ? 'bg-[#FFD93D]' :
                event.status === 'completed' ? 'bg-[#C4B5FD]' : 'bg-[#FF6B6B]'
            )}>
              <div className="flex items-start justify-between">
                <NeoBadge variant="outline" rotation={-2}>{event.category}</NeoBadge>
                <div className="flex gap-1">
                  <button
                    onClick={() => openViewModal(event)}
                    className="p-2 bg-white border-2 border-black hover:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openEditModal(event)}
                    className="p-2 bg-white border-2 border-black hover:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(event)}
                    className="p-2 bg-red-400 border-2 border-black hover:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Event Content */}
            <h3 className="text-xl font-black uppercase mb-2 line-clamp-2">{event.title}</h3>
            <p className="text-sm text-black/60 mb-4 line-clamp-2">{event.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span className="font-medium truncate">{event.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4" />
                <span className="font-medium">Capacity: {event.capacity}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t-4 border-black">
              <span className="font-black text-xl">{formatCurrency(event.ticketPrice)}</span>
              <NeoBadge
                variant={event.status === 'upcoming' ? 'secondary' : event.status === 'completed' ? 'muted' : 'primary'}
              >
                {event.status}
              </NeoBadge>
            </div>
          </NeoCard>
        ))}
      </div>

      {/* Create Modal */}
      <NeoModal
        isOpen={isCreateModalOpen}
        onClose={() => { setIsCreateModalOpen(false); resetForm(); }}
        title="Create New Event"
        footer={
          <>
            <NeoButton variant="muted" onClick={() => { setIsCreateModalOpen(false); resetForm(); }}>
              Cancel
            </NeoButton>
            <NeoButton onClick={handleCreate}>Create Event</NeoButton>
          </>
        }
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <NeoInput
              label="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title"
            />
          </div>
          <div className="md:col-span-2">
            <NeoTextarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter event description"
              rows={3}
            />
          </div>
          <NeoInput
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <NeoInput
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
          <div className="md:col-span-2">
            <NeoInput
              label="Venue"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="Enter venue"
            />
          </div>
          <NeoInput
            label="Capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
          />
          <NeoInput
            label="Ticket Price (₹)"
            type="number"
            value={formData.ticketPrice}
            onChange={(e) => setFormData({ ...formData, ticketPrice: parseInt(e.target.value) || 0 })}
          />
          <NeoSelect
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categoryOptions}
          />
          <NeoSelect
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            options={statusOptions}
          />
          <div className="md:col-span-2">
            <NeoInput
              label="Organizer"
              value={formData.organizer}
              onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              placeholder="Enter organizer name"
            />
          </div>
        </div>
      </NeoModal>

      {/* View Modal */}
      <NeoModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Event Details"
        footer={
          <NeoButton variant="muted" onClick={() => setIsViewModalOpen(false)}>
            Close
          </NeoButton>
        }
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className={cn(
              'p-4 border-4 border-black',
              selectedEvent.status === 'upcoming' ? 'bg-[#FFD93D]' :
                selectedEvent.status === 'completed' ? 'bg-[#C4B5FD]' : 'bg-[#FF6B6B]'
            )}>
              <NeoBadge variant="outline">{selectedEvent.category}</NeoBadge>
            </div>
            <h3 className="text-2xl font-black uppercase">{selectedEvent.title}</h3>
            <p className="text-black/60">{selectedEvent.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#FFFDF5] border-4 border-black">
                <p className="text-xs uppercase font-bold text-black/60">Date</p>
                <p className="font-bold">{formatDate(selectedEvent.date)}</p>
              </div>
              <div className="p-3 bg-[#FFFDF5] border-4 border-black">
                <p className="text-xs uppercase font-bold text-black/60">Time</p>
                <p className="font-bold">{selectedEvent.time}</p>
              </div>
              <div className="p-3 bg-[#FFFDF5] border-4 border-black">
                <p className="text-xs uppercase font-bold text-black/60">Venue</p>
                <p className="font-bold">{selectedEvent.venue}</p>
              </div>
              <div className="p-3 bg-[#FFFDF5] border-4 border-black">
                <p className="text-xs uppercase font-bold text-black/60">Capacity</p>
                <p className="font-bold">{selectedEvent.capacity}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border-4 border-black">
              <span className="font-bold uppercase">Ticket Price</span>
              <span className="font-black text-2xl">{formatCurrency(selectedEvent.ticketPrice)}</span>
            </div>
          </div>
        )}
      </NeoModal>

      {/* Edit Modal */}
      <NeoModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); resetForm(); }}
        title="Edit Event"
        footer={
          <>
            <NeoButton variant="muted" onClick={() => { setIsEditModalOpen(false); resetForm(); }}>
              Cancel
            </NeoButton>
            <NeoButton onClick={handleEdit}>Save Changes</NeoButton>
          </>
        }
        size="lg"
      >
        {selectedEvent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <NeoInput
                label="Event Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <NeoTextarea
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <NeoInput
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <NeoInput
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
            <div className="md:col-span-2">
              <NeoInput
                label="Venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              />
            </div>
            <NeoInput
              label="Capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
            />
            <NeoInput
              label="Ticket Price (₹)"
              type="number"
              value={formData.ticketPrice}
              onChange={(e) => setFormData({ ...formData, ticketPrice: parseInt(e.target.value) || 0 })}
            />
            <NeoSelect
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categoryOptions}
            />
            <NeoSelect
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              options={statusOptions}
            />
          </div>
        )}
      </NeoModal>

      {/* Delete Modal */}
      <NeoModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Event"
        footer={
          <>
            <NeoButton variant="muted" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </NeoButton>
            <NeoButton variant="danger" onClick={handleDelete}>
              Delete
            </NeoButton>
          </>
        }
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-400 border-4 border-black mx-auto mb-4 flex items-center justify-center shadow-[6px_6px_0px_#000]">
            <Trash2 className="w-8 h-8" />
          </div>
          <p className="text-lg font-bold mb-2">Are you sure?</p>
          <p className="text-black/60">
            This will permanently delete <span className="font-bold text-black">{selectedEvent?.title}</span>.
            This action cannot be undone.
          </p>
        </div>
      </NeoModal>
    </div>
  );
};