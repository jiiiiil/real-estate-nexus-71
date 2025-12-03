import { Home, Users, Building2, Key, FileText, Upload, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuthStore } from '@/store/authStore';
import { useLogout } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const adminItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Projects', url: '/projects', icon: Building2 },
    { title: 'Units', url: '/units', icon: Key },
    { title: 'Leads', url: '/leads', icon: Users },
    { title: 'Bookings', url: '/bookings', icon: FileText },
    { title: 'Import Leads', url: '/leads/import', icon: Upload },
  ];

  const managerItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Projects', url: '/projects', icon: Building2 },
    { title: 'Units', url: '/units', icon: Key },
    { title: 'Leads', url: '/leads', icon: Users },
    { title: 'Bookings', url: '/bookings', icon: FileText },
  ];

  const agentItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'My Leads', url: '/leads', icon: Users },
    { title: 'Units', url: '/units', icon: Key },
    { title: 'Bookings', url: '/bookings', icon: FileText },
  ];

  const getMenuItems = () => {
    if (user?.role === 'admin') return adminItems;
    if (user?.role === 'manager') return managerItems;
    return agentItems;
  };

  return (
    <Sidebar className="border-r border-glass-border bg-glass-bg/50 backdrop-blur-xl">
      <SidebarContent>
        {/* Logo */}
        <div className="px-4 py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center shadow-mint">
            <Building2 className="w-5 h-5 text-glass-bg" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-glass-text"
            >
              RE CRM
            </motion.span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-glass-muted text-xs uppercase tracking-wider px-4">
            {!isCollapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-glass-muted hover:text-glass-text hover:bg-white/5"
                      activeClassName="bg-mint/10 text-mint border border-mint/20"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm font-medium"
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-glass-border">
        {/* User Info */}
        <div className="glass-card p-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-violet-dark flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-glass-text truncate">{user?.name}</p>
                <p className="text-xs text-glass-muted capitalize">{user?.role}</p>
              </div>
            )}
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </motion.button>
      </SidebarFooter>
    </Sidebar>
  );
}
