
import { CalendarCheck, GraduationCap, Users, BookOpen, Clock, Building, BookText, Layout, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, linkTo, color }: { 
  title: string; 
  value: number; 
  icon: React.ElementType;
  linkTo: string;
  color: string;
}) => (
  <Link to={linkTo}>
    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`rounded-full p-2 ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  </Link>
);

const Index = () => {
  // Mock data - in a real app, this would come from an API
  const stats = [
    { title: 'Instructors', value: 24, icon: GraduationCap, linkTo: '/instructors', color: 'bg-blue-500' },
    { title: 'Students', value: 346, icon: Users, linkTo: '/students', color: 'bg-green-500' },
    { title: 'Courses', value: 42, icon: BookOpen, linkTo: '/courses', color: 'bg-violet-500' },
    { title: 'Departments', value: 8, icon: Building, linkTo: '/departments', color: 'bg-amber-500' },
    { title: 'Sections', value: 118, icon: BookText, linkTo: '/sections', color: 'bg-indigo-500' },
    { title: 'Schedules', value: 75, icon: Clock, linkTo: '/schedules', color: 'bg-rose-500' },
    { title: 'Enrollments', value: 842, icon: Layout, linkTo: '/enrollments', color: 'bg-emerald-500' },
    { title: 'Attendance', value: 96, icon: UserCheck, linkTo: '/attendance', color: 'bg-sky-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your educational management system.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <div className="rounded-lg bg-muted p-6">
          <h3 className="mb-2 text-lg font-medium">Welcome to the Education Management Dashboard</h3>
          <p className="text-muted-foreground">
            This minimalist dashboard provides tools for managing educational resources.
            Select a category from the sidebar to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
