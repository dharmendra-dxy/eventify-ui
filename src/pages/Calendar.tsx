import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Star, Plus } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoModal } from '@/components/ui/NeoModal';
import { getEvents, formatDate, formatCurrency, type Event } from '@/lib/data';
import { cn } from '@/lib/utils';

export const Calendar: React.FC = () => {
  const events = getEvents();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // June 2026
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days
  const calendarDays = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="neo-page p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 relative">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
            Calendar
          </h1>
          <NeoBadge variant="secondary" rotation={2}>
            <CalendarIcon className="w-4 h-4 mr-1" />
            {events.length} Events
          </NeoBadge>
        </div>
        <p className="text-lg font-medium text-black/60">
          View and manage your event schedule.
        </p>
        <Star className="absolute top-0 right-4 w-8 h-8 text-[#FFD93D] -rotate-12 hidden lg:block" />
      </div>

      {/* Calendar Container */}
      <NeoCard>
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-3 bg-white border-4 border-black hover:shadow-[4px_4px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-black uppercase">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-3 bg-white border-4 border-black hover:shadow-[4px_4px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <NeoButton size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </NeoButton>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 bg-[#FF6B6B] border-4 border-black text-center font-black uppercase text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const dayEvents = day ? getEventsForDate(day) : [];
            const hasEvents = dayEvents.length > 0;

            return (
              <div
                key={index}
                className={cn(
                  'min-h-[100px] lg:min-h-[120px] border-4 border-black p-2',
                  day ? 'bg-white' : 'bg-[#FFFDF5]',
                  hasEvents && 'bg-[#FFFDF5]'
                )}
              >
                {day && (
                  <>
                    <div className={cn(
                      'w-8 h-8 flex items-center justify-center font-bold mb-2',
                      hasEvents ? 'bg-[#FFD93D] border-4 border-black' : ''
                    )}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event, i) => (
                        <button
                          key={event._id}
                          onClick={() => openEventModal(event)}
                          className={cn(
                            'w-full text-left text-xs font-bold px-2 py-1 border-2 border-black truncate hover:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all',
                            i % 3 === 0 ? 'bg-[#FF6B6B]' : i % 3 === 1 ? 'bg-[#FFD93D]' : 'bg-[#C4B5FD]'
                          )}
                        >
                          {event.title}
                        </button>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs font-bold text-center text-black/60">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </NeoCard>

      {/* Upcoming Events List */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NeoCard rotation={-1}>
          <h2 className="text-xl font-black uppercase mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {events
              .filter(e => e.status === 'upcoming')
              .slice(0, 5)
              .map((event, index) => (
                <div
                  key={event._id}
                  className="flex items-center gap-3 p-3 bg-white border-4 border-black hover:shadow-[4px_4px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-pointer"
                  onClick={() => openEventModal(event)}
                >
                  <div className={cn(
                    'w-12 h-12 border-4 border-black flex items-center justify-center font-black flex-shrink-0',
                    index % 3 === 0 ? 'bg-[#FF6B6B]' : index % 3 === 1 ? 'bg-[#FFD93D]' : 'bg-[#C4B5FD]'
                  )}>
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{event.title}</p>
                    <p className="text-xs text-black/60">{formatDate(event.date)}</p>
                  </div>
                  <NeoBadge variant="secondary">{event.category}</NeoBadge>
                </div>
              ))}
          </div>
        </NeoCard>

        <NeoCard rotation={1}>
          <h2 className="text-xl font-black uppercase mb-4">Event Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#FF6B6B] border-4 border-black text-center shadow-[4px_4px_0px_#000]">
              <p className="text-3xl font-black">{events.filter(e => e.status === 'upcoming').length}</p>
              <p className="font-bold uppercase text-sm">Upcoming</p>
            </div>
            <div className="p-4 bg-[#C4B5FD] border-4 border-black text-center shadow-[4px_4px_0px_#000]">
              <p className="text-3xl font-black">{events.filter(e => e.status === 'completed').length}</p>
              <p className="font-bold uppercase text-sm">Completed</p>
            </div>
            <div className="p-4 bg-[#FFD93D] border-4 border-black text-center shadow-[4px_4px_0px_#000]">
              <p className="text-3xl font-black">{events.length}</p>
              <p className="font-bold uppercase text-sm">Total</p>
            </div>
            <div className="p-4 bg-white border-4 border-black text-center shadow-[4px_4px_0px_#000]">
              <p className="text-3xl font-black">{new Set(events.map(e => e.category)).size}</p>
              <p className="font-bold uppercase text-sm">Categories</p>
            </div>
          </div>
        </NeoCard>
      </div>

      {/* Event Detail Modal */}
      <NeoModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title="Event Details"
        footer={
          <NeoButton variant="muted" onClick={() => setIsEventModalOpen(false)}>
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
              <NeoBadge variant="outline" rotation={-2}>{selectedEvent.category}</NeoBadge>
            </div>
            <h3 className="text-2xl font-black uppercase">{selectedEvent.title}</h3>
            <p className="text-black/60">{selectedEvent.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span className="font-bold">{formatDate(selectedEvent.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-bold">{selectedEvent.venue}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-3 bg-[#FFFDF5] border-4 border-black text-center">
                <p className="text-xs uppercase font-bold text-black/60">Capacity</p>
                <p className="font-black text-xl">{selectedEvent.capacity}</p>
              </div>
              <div className="p-3 bg-[#FFFDF5] border-4 border-black text-center">
                <p className="text-xs uppercase font-bold text-black/60">Price</p>
                <p className="font-black text-xl">{formatCurrency(selectedEvent.ticketPrice)}</p>
              </div>
            </div>
          </div>
        )}
      </NeoModal>
    </div>
  );
};