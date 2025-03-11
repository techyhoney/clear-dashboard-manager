
import { useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { courses, departments } from '@/lib/data';
import { Course } from '@/lib/types';

const Courses = () => {
  const [coursesList] = useState([...courses]);

  const columns = [
    {
      id: 'code',
      header: 'Course Code',
      cell: (row: Course) => <div className="font-mono">{row.code}</div>,
      sortable: true,
    },
    {
      id: 'name',
      header: 'Course Name',
      cell: (row: Course) => <div className="font-medium">{row.name}</div>,
      sortable: true,
    },
    {
      id: 'credits',
      header: 'Credits',
      cell: (row: Course) => row.credits,
      sortable: true,
    },
    {
      id: 'department',
      header: 'Department',
      cell: (row: Course) => {
        const dept = departments.find(d => d.id === row.departmentId);
        return dept ? dept.name : 'Unknown';
      },
      sortable: true,
    },
    {
      id: 'description',
      header: 'Description',
      cell: (row: Course) => <div className="truncate max-w-xs">{row.description || 'No description'}</div>,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          View and manage the courses offered by departments.
        </p>
      </div>

      <DataTable 
        data={coursesList}
        columns={columns}
        onEdit={() => {}}
        onDelete={() => {}}
        onAdd={() => {}}
        title="Courses"
      />
    </div>
  );
};

export default Courses;
