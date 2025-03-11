
import { useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { students } from '@/lib/data';
import { Student } from '@/lib/types';

const Students = () => {
  const [studentsList] = useState([...students]);

  const columns = [
    {
      id: 'studentId',
      header: 'Student ID',
      cell: (row: Student) => <div className="font-mono">{row.studentId}</div>,
      sortable: true,
    },
    {
      id: 'name',
      header: 'Name',
      cell: (row: Student) => <div className="font-medium">{row.name}</div>,
      sortable: true,
    },
    {
      id: 'email',
      header: 'Email',
      cell: (row: Student) => row.email,
      sortable: true,
    },
    {
      id: 'phone',
      header: 'Phone',
      cell: (row: Student) => row.phone || 'N/A',
    },
    {
      id: 'dateOfBirth',
      header: 'Date of Birth',
      cell: (row: Student) => 
        row.dateOfBirth ? new Date(row.dateOfBirth).toLocaleDateString() : 'N/A',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">
          Manage student records and information.
        </p>
      </div>

      <DataTable 
        data={studentsList}
        columns={columns}
        onEdit={() => {}}
        onDelete={() => {}}
        onAdd={() => {}}
        title="Students"
      />
    </div>
  );
};

export default Students;
