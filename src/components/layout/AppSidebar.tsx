import { Home, Users, Building2, Key, FileText, Upload, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuthStore } from '@/store/authStore';
import { useLogout } from '@/hooks/useAuth';
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
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

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
    <Sidebar>
      <SidebarContent>
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold text-primary">Real Estate CRM</h2>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="mb-3 px-2">
          <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
