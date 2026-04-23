import { Link } from 'react-router-dom';
import { Calendar, Users, Ticket, DollarSign, Star, Zap, TrendingUp, Activity } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoButton } from '@/components/ui/NeoButton';
import { ActivityFeed } from '@/components/ActivityFeed';
import { QRScanner } from '@/components/QRScanner';
import { VIPAttendees } from '@/components/VIPAttendees';
import { EventHealthScores } from '@/components/EventHealth';
import { TaskBoard } from '@/components/TaskBoard';
import { UpcomingEventsTimeline } from '@/components/UpcomingEventsTimeline';
import { ExportButton } from '@/components/ExportButton';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { SimpleLineChart } from '@/components/charts/SimpleLineChart';
import { PieChart } from '@/components/charts/PieChart';
import { getDashboardStats, getEvents, getAnalytics, getRevenueByEvent, formatDate, formatCurrency } from '@/lib/data';
import { cn } from '@/lib/utils';

export const Dashboard: React.FC = () => {
  const stats = getDashboardStats();
  const events = getEvents().slice(0, 5);
  const analytics = getAnalytics();
  const revenueByEvent = getRevenueByEvent();

  const categoryData = [
    { label: 'Technology', value: 3, color: '#FF6B6B' },
    { label: 'Music', value: 2, color: '#FFD93D' },
    { label: 'Business', value: 1, color: '#C4B5FD' },
    { label: 'Art', value: 1, color: '#FF6B6B' },
    { label: 'Food', value: 1, color: '#FFD93D' },
  ];

  const ticketsData = analytics.map(a => ({ label: a.month, value: a.ticketsSold }));
  const revenueData = analytics.map(a => ({ label: a.month, value: a.revenue }));

  return (
    <div className="neo-page p-4 sm:p-6 lg:p-8">
      {/* Header with Personal Greeting */}
      <div className="mb-6 lg:mb-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
            Dashboard
          </h1>
          <NeoBadge variant="secondary" rotation={-2} className="w-fit">
            <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Live
          </NeoBadge>
        </div>
        <p className="text-base sm:text-lg font-medium text-black/60">
          Welcome back, <span className="font-black text-black">Shivam Gupta</span>! Here's what's happening with your events.
        </p>

        {/* Floating Decorative Stars */}
        <Star className="absolute top-0 right-4 w-6 h-6 sm:w-8 sm:h-8 text-[#FFD93D] rotate-12 hidden sm:block animate-pulse" />
        <Star className="absolute top-8 right-16 w-4 h-4 text-[#FF6B6B] -rotate-12 hidden lg:block" />
        <div className="absolute -top-2 right-28 w-3 h-3 bg-[#C4B5FD] border-2 border-black rotate-45 hidden lg:block" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 lg:mb-8">
        <StatCard
          title="Total Events"
          value={stats.totalEvents}
          icon={Calendar}
          trend="up"
          trendValue="+12%"
          color="primary"
        />
        <StatCard
          title="Total Attendees"
          value={stats.totalAttendees}
          icon={Users}
          trend="up"
          trendValue="+8%"
          color="secondary"
        />
        <StatCard
          title="Tickets Sold"
          value={stats.ticketsSold}
          icon={Ticket}
          trend="up"
          trendValue="+15%"
          color="muted"
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          trend="up"
          trendValue="+23%"
          color="primary"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">

          {/* Event Performance Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <NeoCard>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-black uppercase flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Tickets Sold
                </h2>
                <NeoBadge variant="secondary" rotation={2}>6M</NeoBadge>
              </div>
              <SimpleLineChart
                data={ticketsData}
                color="#FFD93D"
                fillColor="rgba(255, 217, 61, 0.2)"
                height={180}
              />
            </NeoCard>

            <NeoCard rotation={-1}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-black uppercase flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Revenue
                </h2>
                <NeoBadge variant="primary" rotation={-2}>6M</NeoBadge>
              </div>
              <SimpleLineChart
                data={revenueData}
                color="#FF6B6B"
                fillColor="rgba(255, 107, 107, 0.2)"
                height={180}
              />
            </NeoCard>
          </div>

          {/* Task Board */}
          <TaskBoard />

          {/* Recent Events */}
          <NeoCard>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-black uppercase flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Events
              </h2>
              <Link to="/events">
                <NeoButton variant="secondary" size="sm">
                  View All
                </NeoButton>
              </Link>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {events.map((event, index) => (
                <Link key={event._id} to="/events" className="block">
                  <div
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[#FFFDF5] border-4 border-black hover:shadow-[4px_4px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100 cursor-pointer"
                    style={{ transform: index % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)' }}
                  >
                    <div className={cn(
                      'w-12 h-12 sm:w-14 sm:h-14 border-4 border-black flex items-center justify-center font-black text-base sm:text-lg shadow-[4px_4px_0px_#000] flex-shrink-0',
                      index % 3 === 0 ? 'bg-[#FF6B6B]' : index % 3 === 1 ? 'bg-[#FFD93D]' : 'bg-[#C4B5FD]'
                    )}>
                      {event.date.split('-')[2]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-sm sm:text-lg uppercase truncate">{event.title}</h3>
                      <p className="text-xs sm:text-sm text-black/60 font-medium truncate">
                        {formatDate(event.date)} • {event.venue}
                      </p>
                    </div>
                    <NeoBadge
                      variant={event.status === 'upcoming' ? 'secondary' : 'muted'}
                      rotation={index % 2 === 0 ? 2 : -2}
                      className="hidden sm:flex"
                    >
                      {event.status}
                    </NeoBadge>
                  </div>
                </Link>
              ))}
            </div>
          </NeoCard>

          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <NeoCard rotation={1}>
              <h2 className="text-lg sm:text-xl font-black uppercase mb-4">Revenue Breakdown</h2>
              <PieChart data={revenueByEvent} size={200} />
            </NeoCard>

            <NeoCard>
              <h2 className="text-lg sm:text-xl font-black uppercase mb-4">Categories</h2>
              <SimpleBarChart data={categoryData} showValues />
            </NeoCard>
          </div>

          {/* Top Attendees & Event Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <VIPAttendees />
            <EventHealthScores />
          </div>
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">

          {/* Quick Actions */}
          <NeoCard rotation={1}>
            <h2 className="text-lg sm:text-xl font-black uppercase mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link to="/events" className="block w-full">
                <NeoButton className="w-full justify-center text-sm sm:text-base">Create Event</NeoButton>
              </Link>
              <Link to="/attendees" className="block w-full">
                <NeoButton variant="secondary" className="w-full justify-center text-sm sm:text-base">
                  Add Attendee
                </NeoButton>
              </Link>
              <ExportButton
                filename="dashboard_overview"
                title="Dashboard Overview Report"
                data={[
                  { section: 'Stats', ...stats },
                  ...events.map(e => ({ section: 'Recent Event', ...e })),
                  ...analytics.map(a => ({ section: 'Analytics', ...a }))
                ]}
              />
              <Link to="/analytics" className="block w-full">
                <NeoButton variant="muted" className="w-full justify-center text-sm sm:text-base">
                  View Analytics
                </NeoButton>
              </Link>
            </div>
          </NeoCard>

          {/* Live Activity Feed */}
          <ActivityFeed />

          {/* QR Scanner */}
          <QRScanner />

          {/* Upcoming Events Timeline */}
          <UpcomingEventsTimeline />

          {/* Pro Tip Card */}
          <div className="bg-[#FFD93D] border-4 border-black p-4 shadow-[8px_8px_0px_#000] rotate-1">
            <div className="flex items-start gap-3">
              <Star className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="font-black uppercase mb-1">Pro Tip!</h3>
                <p className="text-sm font-medium">
                  Use the QR scanner for quick check-ins at your event entrance. It validates tickets instantly!
                </p>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="bg-[#C4B5FD] border-4 border-black p-4 shadow-[6px_6px_0px_#000] -rotate-1">
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-1 bg-white border-4 border-black font-mono font-black">?</kbd>
              <p className="text-sm font-bold">
                Press <span className="font-black">?</span> for keyboard shortcuts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed bottom-20 left-4 w-4 h-4 bg-[#FF6B6B] border-2 border-black rotate-45 hidden lg:block" />
      <div className="fixed top-1/3 right-4 w-3 h-3 bg-[#FFD93D] border-2 border-black hidden lg:block" />
      <Star className="fixed bottom-1/3 left-8 w-5 h-5 text-[#C4B5FD] rotate-12 hidden lg:block" />
    </div>
  );
};