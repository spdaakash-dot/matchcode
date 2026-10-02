import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackageSearch, 
  UploadCloud, 
  BrainCircuit, 
  CheckSquare, 
  Database, 
  BarChart3, 
  FileClock, 
  Settings,
  Menu,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { useMatchCodeStore } from '../store';

const NAV_LINKS = [
  { group: 'Workspace', items: [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Materials', path: '/materials', icon: PackageSearch },
    { name: 'Upload Data', path: '/upload', icon: UploadCloud },
    { name: 'AI Matching', path: '/matching', icon: BrainCircuit },
    { name: 'Review Queue', path: '/review', icon: CheckSquare },
    { name: 'Standard Master', path: '/standard-master', icon: Database },
  ]},
  { group: 'Intelligence', items: [
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Audit Trail', path: '/audit-log', icon: FileClock },
  ]},
  { group: 'System', items: [
    { name: 'Settings', path: '/settings', icon: Settings },
  ]}
];

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useMatchCodeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-dark-bg text-text-main overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out border-r border-dark-border bg-dark-panel flex flex-col z-20 shrink-0 relative`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-dark-border">
          {!collapsed && (
            <div className="flex items-center space-x-2 overflow-hidden">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50">
                <BrainCircuit className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                MATCHCODE
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <BrainCircuit className="w-6 h-6 text-primary" />
            </div>
          )}
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-dark-border transition-colors text-text-muted"
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          {NAV_LINKS.map((group, idx) => (
            <div key={idx} className="mb-6">
              {!collapsed && (
                <div className="px-6 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {group.group}
                </div>
              )}
              <ul>
                {group.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `flex items-center px-4 py-2 mx-2 rounded-lg transition-colors group ${
                          isActive 
                            ? 'bg-primary/10 text-primary border border-primary/30 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]' 
                            : 'text-text-muted hover:bg-dark-hover hover:text-text-main'
                        }`
                      }
                      title={collapsed ? item.name : undefined}
                    >
                      <item.icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
                      {!collapsed && <span>{item.name}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-dark-border p-4 bg-dark-bg/50">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center min-w-0">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/50 flex-shrink-0">
                  <span className="text-secondary font-medium text-sm">AD</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent-success rounded-full border border-dark-panel"></div>
              </div>
              {!collapsed && (
                <div className="ml-3 truncate">
                  <p className="text-sm font-medium truncate">{user?.name || 'Demo Administrator'}</p>
                  <p className="text-xs text-text-muted truncate">Administrator</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button 
                onClick={handleLogout}
                className="p-1.5 text-text-muted hover:text-accent-danger rounded hover:bg-dark-hover transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-dark-bg relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
