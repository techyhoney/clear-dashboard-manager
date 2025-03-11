
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Calendar, GraduationCap, Layout, Menu, Users, X, BookText, Building, Clock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  expanded: boolean;
}

const NavItem = ({ to, icon: Icon, label, expanded }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200',
          expanded ? 'justify-start' : 'justify-center',
          isActive 
            ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
        )
      }
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", expanded ? "" : "mx-auto")} />
      {expanded && <span className="animate-fade-in">{label}</span>}
    </NavLink>
  );
};

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  
  const navItems = [
    { to: '/', icon: Layout, label: 'Dashboard' },
    { to: '/instructors', icon: GraduationCap, label: 'Instructors' },
    { to: '/departments', icon: Building, label: 'Departments' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/sections', icon: BookText, label: 'Sections' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/enrollments', icon: Layout, label: 'Enrollments' },
    { to: '/attendance', icon: UserCheck, label: 'Attendance' },
    { to: '/schedules', icon: Clock, label: 'Schedules' },
  ];

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-sidebar-border bg-sidebar shadow-sm transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {expanded ? (
          <h2 className="text-lg font-semibold text-sidebar-foreground animate-fade-in">
            EDU Dashboard
          </h2>
        ) : (
          <span className="mx-auto text-xl font-bold text-primary animate-fade-in">E</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8 text-sidebar-foreground"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 space-y-1 p-2 pt-4">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            expanded={expanded}
          />
        ))}
      </nav>
      
      <div className="border-t border-sidebar-border p-4">
        <div className={cn(
          "flex items-center gap-3 rounded-md py-2 text-sm text-sidebar-foreground",
          expanded ? "justify-start px-2" : "justify-center"
        )}>
          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">ED</span>
          </div>
          {expanded && (
            <div className="animate-fade-in">
              <p className="font-medium">EDU Admin</p>
              <p className="text-xs opacity-70">Admin Access</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
