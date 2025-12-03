import { Users, Building2, Key, FileText, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const stats = [
    { 
      title: 'Total Leads', 
      value: '248', 
      change: '+12%', 
      trend: 'up',
      icon: Users,
      color: 'from-blue-400 to-blue-600'
    },
    { 
      title: 'Projects', 
      value: '12', 
      change: '+2', 
      trend: 'up',
      icon: Building2,
      color: 'from-violet to-violet-dark'
    },
    { 
      title: 'Available Units', 
      value: '156', 
      change: '-8', 
      trend: 'down',
      icon: Key,
      color: 'from-mint to-mint-dark'
    },
    { 
      title: 'Bookings', 
      value: '34', 
      change: '+5', 
      trend: 'up',
      icon: FileText,
      color: 'from-amber-400 to-amber-600'
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New lead created', user: 'John Doe', time: '2 min ago', type: 'lead' },
    { id: 2, action: 'Booking confirmed', user: 'Jane Smith', time: '15 min ago', type: 'booking' },
    { id: 3, action: 'Unit status updated', user: 'Mike Wilson', time: '1 hour ago', type: 'unit' },
    { id: 4, action: 'Follow-up scheduled', user: 'Sarah Brown', time: '2 hours ago', type: 'activity' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-glass-text">Dashboard</h1>
          <p className="text-glass-muted mt-1">Welcome to your Real Estate CRM</p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={item}>
              <GlassCard className="p-6" gradient>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-glass-muted text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-glass-text mt-2">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === 'up' ? 'text-mint' : 'text-red-400'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts & Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Performance Chart Placeholder */}
          <motion.div variants={item} className="lg:col-span-2">
            <GlassCard className="p-6 h-full" hover={false}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-glass-text">Lead Performance</h2>
                <div className="flex items-center gap-2 text-mint text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+24% this month</span>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center border border-dashed border-glass-border rounded-xl">
                <p className="text-glass-muted">Chart will be displayed here</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={item}>
            <GlassCard className="p-6 h-full" hover={false}>
              <h2 className="text-lg font-semibold text-glass-text mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-glass-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-mint mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-glass-text">{activity.action}</p>
                      <p className="text-xs text-glass-muted mt-1">by {activity.user} · {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={item}>
          <GlassCard className="p-6" hover={false}>
            <h2 className="text-lg font-semibold text-glass-text mb-4">Getting Started</h2>
            <p className="text-glass-muted text-sm mb-4">
              Your Phase-2 Real Estate CRM frontend is ready! Connect your backend API to start managing:
            </p>
            <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 text-sm text-glass-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                Leads with advanced filtering and CSV import
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                Projects and Units with comprehensive details
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                Bookings with payment plan management
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                Role-based access control
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                Activity timeline and follow-ups
              </li>
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
