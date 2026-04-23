import { TrendingUp, DollarSign, Users, Ticket, Calendar, Star, Zap, Target } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { getAnalytics, getEvents, getTickets, formatCurrency } from '@/lib/data';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { SimpleLineChart } from '@/components/charts/SimpleLineChart';
import { PieChart } from '@/components/charts/PieChart';
import { StatCard } from '@/components/StatCard';

export const Analytics: React.FC = () => {
  const analytics = getAnalytics();
  const events = getEvents();
  const tickets = getTickets();

  const totalRevenue = tickets.reduce((sum, t) => sum + t.price, 0);
  const totalTickets = tickets.length;
  const usedTickets = tickets.filter(t => t.status === 'used').length;
  const attendanceRate = Math.round((usedTickets / totalTickets) * 100);

  const revenueData = analytics.map(a => ({ label: a.month, value: a.revenue }));
  const ticketsData = analytics.map(a => ({ label: a.month, value: a.ticketsSold }));
  
  const categoryData = [
    { label: 'Technology', value: 3, color: '#FF6B6B' },
    { label: 'Music', value: 2, color: '#FFD93D' },
    { label: 'Business', value: 1, color: '#C4B5FD' },
    { label: 'Art', value: 1, color: '#FF6B6B' },
    { label: 'Food', value: 1, color: '#FFD93D' },
    { label: 'Wellness', value: 1, color: '#C4B5FD' },
    { label: 'Film', value: 1, color: '#FF6B6B' },
    { label: 'Gaming', value: 1, color: '#FFD93D' },
    { label: 'Fashion', value: 1, color: '#C4B5FD' },
    { label: 'Entertainment', value: 1, color: '#FF6B6B' },
  ];

  const ticketTypeData = [
    { label: 'General Admission', value: 25, color: '#FF6B6B' },
    { label: 'VIP', value: 10, color: '#FFD93D' },
    { label: 'Early Bird', value: 5, color: '#C4B5FD' },
    { label: 'Workshop Pass', value: 4, color: '#FF6B6B' },
    { label: 'Other', value: 6, color: '#FFD93D' },
  ];

  return (
    <div className="neo-page p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 relative">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
            Analytics
          </h1>
          <NeoBadge variant="primary" rotation={-2}>
            <Zap className="w-4 h-4 mr-1" />
            Live
          </NeoBadge>
        </div>
        <p className="text-lg font-medium text-black/60">
          Track your event performance and insights.
        </p>
        <Star className="absolute top-0 right-4 w-8 h-8 text-[#FFD93D] rotate-12 hidden lg:block" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          trend="up"
          trendValue="+23%"
          color="primary"
        />
        <StatCard
          title="Tickets Sold"
          value={totalTickets}
          icon={Ticket}
          trend="up"
          trendValue="+15%"
          color="secondary"
        />
        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          icon={Users}
          trend="up"
          trendValue="+5%"
          color="muted"
        />
        <StatCard
          title="Total Events"
          value={events.length}
          icon={Calendar}
          trend="neutral"
          trendValue="0%"
          color="primary"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <NeoCard>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              Revenue Trend
            </h2>
            <NeoBadge variant="secondary" rotation={2}>Monthly</NeoBadge>
          </div>
          <SimpleLineChart 
            data={revenueData} 
            color="#FF6B6B" 
            fillColor="rgba(255, 107, 107, 0.2)"
            height={250}
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-[#FFFDF5] border-4 border-black">
              <p className="text-xs uppercase font-bold text-black/60">Avg/Month</p>
              <p className="font-black text-lg">{formatCurrency(revenueData.reduce((a, b) => a + b.value, 0) / revenueData.length)}</p>
            </div>
            <div className="text-center p-3 bg-[#FFFDF5] border-4 border-black">
              <p className="text-xs uppercase font-bold text-black/60">Highest</p>
              <p className="font-black text-lg">{formatCurrency(Math.max(...revenueData.map(d => d.value)))}</p>
            </div>
            <div className="text-center p-3 bg-[#FFFDF5] border-4 border-black">
              <p className="text-xs uppercase font-bold text-black/60">Growth</p>
              <p className="font-black text-lg text-green-600">+28%</p>
            </div>
          </div>
        </NeoCard>

        {/* Tickets Sold Chart */}
        <NeoCard>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase flex items-center gap-2">
              <Ticket className="w-6 h-6" />
              Tickets Sold
            </h2>
            <NeoBadge variant="muted" rotation={-2}>Monthly</NeoBadge>
          </div>
          <SimpleLineChart 
            data={ticketsData} 
            color="#FFD93D" 
            fillColor="rgba(255, 217, 61, 0.2)"
            height={250}
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-[#FFFDF5] border-4 border-black">
              <p className="text-xs uppercase font-bold text-black/60">Avg/Month</p>
              <p className="font-black text-lg">{Math.round(ticketsData.reduce((a, b) => a + b.value, 0) / ticketsData.length)}</p>
            </div>
            <div className="text-center p-3 bg-[#FFFDF5] border-4 border-black">
              <p className="text-xs uppercase font-bold text-black/60">Highest</p>
              <p className="font-black text-lg">{Math.max(...ticketsData.map(d => d.value))}</p>
            </div>
            <div className="text-center p-3 bg-[#FFFDF5] border-4 border-black">
              <p className="text-xs uppercase font-bold text-black/60">Growth</p>
              <p className="font-black text-lg text-green-600">+35%</p>
            </div>
          </div>
        </NeoCard>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <NeoCard rotation={1}>
          <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Event Categories
          </h2>
          <SimpleBarChart data={categoryData} showValues />
        </NeoCard>

        {/* Ticket Types */}
        <NeoCard>
          <h2 className="text-xl font-black uppercase mb-4">Ticket Types</h2>
          <PieChart data={ticketTypeData} size={180} />
        </NeoCard>

        {/* Performance Metrics */}
        <NeoCard rotation={-1}>
          <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Key Metrics
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-[#FFFDF5] border-4 border-black">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold uppercase text-sm">Conversion Rate</span>
                <NeoBadge variant="secondary">+12%</NeoBadge>
              </div>
              <div className="h-4 bg-white border-2 border-black">
                <div className="h-full bg-[#FFD93D] border-r-2 border-black" style={{ width: '78%' }} />
              </div>
              <p className="text-right font-bold mt-1">78%</p>
            </div>
            
            <div className="p-4 bg-[#FFFDF5] border-4 border-black">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold uppercase text-sm">Check-in Rate</span>
                <NeoBadge variant="muted">+5%</NeoBadge>
              </div>
              <div className="h-4 bg-white border-2 border-black">
                <div className="h-full bg-[#C4B5FD] border-r-2 border-black" style={{ width: '92%' }} />
              </div>
              <p className="text-right font-bold mt-1">92%</p>
            </div>
            
            <div className="p-4 bg-[#FFFDF5] border-4 border-black">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold uppercase text-sm">Customer Satisfaction</span>
                <NeoBadge variant="primary">+8%</NeoBadge>
              </div>
              <div className="h-4 bg-white border-2 border-black">
                <div className="h-full bg-[#FF6B6B] border-r-2 border-black" style={{ width: '96%' }} />
              </div>
              <p className="text-right font-bold mt-1">96%</p>
            </div>
            
            <div className="p-4 bg-[#FFD93D] border-4 border-black shadow-[4px_4px_0px_#000]">
              <p className="font-bold uppercase text-sm mb-1">Top Performing Event</p>
              <p className="font-black text-lg">Neon Nights Music Festival</p>
              <p className="text-sm font-medium">2,000 tickets sold</p>
            </div>
          </div>
        </NeoCard>
      </div>
    </div>
  );
};