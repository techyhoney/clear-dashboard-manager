
import { useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { schedules, sections, courses, instructors } from '@/lib/data';
import { Schedule } from '@/lib/types';

const Schedules = () => {
  const [schedulesList] = useState([...schedules]);

  const formatDayOfWeek = (day: Schedule['dayOfWeek']) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const columns = [
    {
      id: 'course',
      header: 'Course',
      cell: (row: Schedule) => {
        const section = sections.find(s => s.id === row.sectionId);
        if (!section) return 'Unknown Course';
        
        const course = courses.find(c => c.id === section.courseId);
        return course ? `${course.code} (Section ${section.sectionNumber})` : 'Unknown Course';
      },
      sortable: true,
    },
    {
      id: 'instructor',
      header: 'Instructor',
      cell: (row: Schedule) => {
        const section = sections.find(s => s.id === row.sectionId);
        if (!section) return 'Unknown Instructor';
        
        const instructor = instructors.find(i => i.id === section.instructorId);
        return instructor ? instructor.name : 'Unassigned';
      },
      sortable: true,
    },
    {
      id: 'day',
      header: 'Day',
      cell: (row: Schedule) => formatDayOfWeek(row.dayOfWeek),
      sortable: true,
    },
    {
      id: 'time',
      header: 'Time',
      cell: (row: Schedule) => `${row.startTime} - ${row.endTime}`,
    },
    {
      id: 'location',
      header: 'Location',
      cell: (row: Schedule) => row.location || 'TBA',
    },
    {
      id: 'recurrence',
      header: 'Recurrence',
      cell: (row: Schedule) => row.recurrence.charAt(0).toUpperCase() + row.recurrence.slice(1),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Schedules</h1>
        <p className="text-muted-foreground">
          Manage and view course section schedules.
        </p>
      </div>

      <DataTable 
        data={schedulesList}
        columns={columns}
        onEdit={() => {}}
        onDelete={() => {}}
        onAdd={() => {}}
        title="Class Schedules"
      />
    </div>
  );
};

export default Schedules;
