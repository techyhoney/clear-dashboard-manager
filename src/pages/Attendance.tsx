
import { useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { attendances, enrollments, students, sections, courses } from '@/lib/data';
import { Attendance } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const AttendancePage = () => {
  const [attendanceList] = useState([...attendances]);

  const getStatusBadge = (status: Attendance['status']) => {
    const styles = {
      present: "bg-green-100 text-green-800 hover:bg-green-100",
      absent: "bg-red-100 text-red-800 hover:bg-red-100",
      late: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      excused: "bg-blue-100 text-blue-800 hover:bg-blue-100",
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
      cell: (row: Attendance) => {
        const enrollment = enrollments.find(e => e.id === row.enrollmentId);
        if (!enrollment) return 'Unknown Student';
        
        const student = students.find(s => s.id === enrollment.studentId);
        return student ? student.name : 'Unknown Student';
      },
      sortable: true,
    },
    {
      id: 'course',
      header: 'Course',
      cell: (row: Attendance) => {
        const enrollment = enrollments.find(e => e.id === row.enrollmentId);
        if (!enrollment) return 'Unknown Course';
        
        const section = sections.find(s => s.id === enrollment.sectionId);
        if (!section) return 'Unknown Course';
        
        const course = courses.find(c => c.id === section.courseId);
        return course ? course.code : 'Unknown Course';
      },
      sortable: true,
    },
    {
      id: 'date',
      header: 'Date',
      cell: (row: Attendance) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row: Attendance) => getStatusBadge(row.status),
      sortable: true,
    },
    {
      id: 'notes',
      header: 'Notes',
      cell: (row: Attendance) => row.notes || '-',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">
          Track student attendance for course sections.
        </p>
      </div>

      <DataTable 
        data={attendanceList}
        columns={columns}
        onEdit={() => {}}
        onDelete={() => {}}
        onAdd={() => {}}
        title="Attendance Records"
      />
    </div>
  );
};

export default AttendancePage;
