import { useState, useEffect } from 'react';
import { useMatchCodeStore } from '../store';
import { motion } from 'framer-motion';
import { 
  Database, 
  Copy, 
  CheckCircle, 
  Clock, 
  Sparkles,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const AnimatedCounter = ({ value }: { value: number }) => {
  const [, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString().substring(0, 3));
    if (start === end) return;
    
    let totalMilSecDur = 1000;
    let incrementTime = (totalMilSecDur / end) * 2;
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value]);

  // Just an approximation for the demo to show large numbers rolling up
  const displayValue = value > 1000 ? `${(value/1000).toFixed(1)}k` : value;

  return <span>{displayValue}</span>;
};

export default function Dashboard() {
  const { user } = useMatchCodeStore();
  const navigate = useNavigate();

  const kpis = [
    { title: 'Total Materials', value: 125480, icon: Database, color: 'text-primary', bg: 'bg-primary/10' },
    { title: 'Potential Duplicates', value: 18742, icon: Copy, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { title: 'Standardized', value: 9381, icon: CheckCircle, color: 'text-accent-success', bg: 'bg-accent-success/10' },
    { title: 'Pending Reviews', value: 2146, icon: Clock, color: 'text-secondary', bg: 'bg-secondary/10' },
  ];

  const activityData = [
    { name: 'Mon', identified: 400, approved: 240, rejected: 20 },
    { name: 'Tue', identified: 300, approved: 139, rejected: 10 },
    { name: 'Wed', identified: 200, approved: 980, rejected: 30 },
    { name: 'Thu', identified: 278, approved: 390, rejected: 40 },
    { name: 'Fri', identified: 189, approved: 480, rejected: 10 },
    { name: 'Sat', identified: 239, approved: 380, rejected: 5 },
    { name: 'Sun', identified: 349, approved: 430, rejected: 25 },
  ];

  const categoryData = [
    { name: 'Mechanical', value: 4500 },
    { name: 'Electrical', value: 3200 },
    { name: 'Piping', value: 2800 },
    { name: 'Chemicals', value: 1200 },
    { name: 'Safety', value: 900 },
    { name: 'Other', value: 400 },
  ];
  const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#94a3b8'];

  const recentRecommendations = [
    { name: 'Ball Valve 50mm', confidence: 96.8, records: 3, status: 'Pending Review' },
    { name: 'Copper Cable 2.5 sq.mm', confidence: 98.2, records: 4, status: 'Approved' },
    { name: 'Industrial Bearing 6204', confidence: 91.4, records: 2, status: 'Pending Review' },
    { name: 'M10 SS Hex Bolt', confidence: 99.1, records: 5, status: 'Approved' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Good morning, {user?.name?.split(' ')[0] || 'Administrator'}</h1>
          <p className="text-text-muted">Material Intelligence Overview</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3 text-sm">
          <span className="flex items-center text-accent-success bg-accent-success/10 px-3 py-1 rounded-full border border-accent-success/20">
            <span className="w-2 h-2 rounded-full bg-accent-success mr-2 animate-pulse"></span>
            System Online
          </span>
          <span className="text-text-muted">Last sync: 2 mins ago</span>
        </div>
      </div>

      {/* AI Insight */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 flex items-start gap-4 border-primary/30 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 relative z-10">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div className="relative z-10">
          <h3 className="text-primary font-semibold text-sm mb-1 uppercase tracking-wider">AI Insight</h3>
          <p className="text-white text-sm md:text-base">
            <span className="font-bold">2,184</span> potentially duplicate records were identified this week across <span className="font-bold">6</span> material categories. Standardizing these could unlock an estimated 14% in procurement efficiency.
          </p>
        </div>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-muted" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter value={kpi.value} />
              {kpi.value > 1000 ? '' : ''}
            </div>
            <div className="text-sm text-text-muted">{kpi.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Matching Activity</h2>
            <select className="bg-dark-bg border border-dark-border text-sm rounded-md px-2 py-1 outline-none text-text-muted">
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222228" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#121216', borderColor: '#222228', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Bar dataKey="identified" stackId="a" fill="#06b6d4" radius={[0, 0, 4, 4]} name="Identified" />
                <Bar dataKey="approved" stackId="a" fill="#10b981" name="Approved" />
                <Bar dataKey="rejected" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Category Distribution</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#121216', borderColor: '#222228', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.slice(0,4).map((cat, idx) => (
              <div key={idx} className="flex items-center text-xs text-text-muted">
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[idx] }}></span>
                {cat.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel overflow-hidden"
      >
        <div className="p-6 border-b border-dark-border flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Recent AI Recommendations</h2>
          <button onClick={() => navigate('/review')} className="text-sm text-primary hover:text-primary-hover flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-bg/50 text-text-muted text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Potential Match</th>
                <th className="p-4 font-medium text-center">Confidence</th>
                <th className="p-4 font-medium text-center">Source Records</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {recentRecommendations.map((rec, i) => (
                <tr key={i} className="hover:bg-dark-hover/50 transition-colors">
                  <td className="p-4 text-sm text-white font-medium">{rec.name}</td>
                  <td className="p-4 text-center">
                    <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                      {rec.confidence}%
                    </span>
                  </td>
                  <td className="p-4 text-center text-sm text-text-muted">
                    {rec.records} records
                  </td>
                  <td className="p-4">
                    <span className={`badge ${rec.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-sm text-text-muted hover:text-white transition-colors">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
