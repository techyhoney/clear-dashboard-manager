
import { useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { sections, courses, instructors } from '@/lib/data';
import { Section } from '@/lib/types';

const Sections = () => {
  const [sectionsList] = useState([...sections]);

  const columns = [
    {
      id: 'course',
      header: 'Course',
      cell: (row: Section) => {
        const course = courses.find(c => c.id === row.courseId);
        return course ? `${course.code}: ${course.name}` : 'Unknown Course';
      },
      sortable: true,
    },
    {
      id: 'section',
      header: 'Section',
      cell: (row: Section) => row.sectionNumber,
      sortable: true,
    },
    {
      id: 'instructor',
      header: 'Instructor',
      cell: (row: Section) => {
        const instructor = instructors.find(i => i.id === row.instructorId);
        return instructor ? instructor.name : 'Unassigned';
      },
      sortable: true,
    },
    {
      id: 'semester',
      header: 'Semester',
      cell: (row: Section) => `${row.semester} ${row.year}`,
      sortable: true,
    },
    {
      id: 'capacity',
      header: 'Capacity',
      cell: (row: Section) => row.maxStudents,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sections</h1>
        <p className="text-muted-foreground">
          Manage course sections and instructor assignments.
        </p>
      </div>

      <DataTable 
        data={sectionsList}
        columns={columns}
        onEdit={() => {}}
        onDelete={() => {}}
        onAdd={() => {}}
        title="Course Sections"
      />
    </div>
  );
};

export default Sections;
