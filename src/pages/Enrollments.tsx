
import { useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { enrollments, students, sections, courses } from '@/lib/data';
import { Enrollment } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const Enrollments = () => {
  const [enrollmentsList] = useState([...enrollments]);

  const getStatusBadge = (status: Enrollment['status']) => {
    const styles = {
      active: "bg-green-100 text-green-800 hover:bg-green-100",
      dropped: "bg-red-100 text-red-800 hover:bg-red-100",
      completed: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns = [
    {
      id: 'student',
      header: 'Student',
      cell: (row: Enrollment) => {
        const student = students.find(s => s.id === row.studentId);
        return student ? student.name : 'Unknown Student';
      },
      sortable: true,
    },
    {
      id: 'course',
      header: 'Course',
      cell: (row: Enrollment) => {
        const section = sections.find(s => s.id === row.sectionId);
        if (!section) return 'Unknown Course';
        
        const course = courses.find(c => c.id === section.courseId);
        return course ? `${course.code} (Section ${section.sectionNumber})` : 'Unknown Course';
      },
      sortable: true,
    },
    {
      id: 'enrollmentDate',
      header: 'Enrollment Date',
      cell: (row: Enrollment) => new Date(row.enrollmentDate).toLocaleDateString(),
      sortable: true,
    },
    {
      id: 'grade',
      header: 'Grade',
      cell: (row: Enrollment) => row.grade || 'Not graded',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row: Enrollment) => getStatusBadge(row.status),
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Enrollments</h1>
        <p className="text-muted-foreground">
          Manage student enrollments in course sections.
        </p>
      </div>

      <DataTable 
        data={enrollmentsList}
        columns={columns}
        onEdit={() => {}}
        onDelete={() => {}}
        onAdd={() => {}}
        title="Enrollments"
      />
    </div>
  );
};

export default Enrollments;
