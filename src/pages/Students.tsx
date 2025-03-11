
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/ui/DataTable';
import { EntityForm } from '@/components/ui/EntityForm';
import { students } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Student } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

const Students = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [studentsList, setStudentsList] = useState<Student[]>([...students]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    dateOfBirth: '',
  });

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

  const handleAdd = () => {
    setCurrentStudent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      studentId: '',
      dateOfBirth: '',
    });
    setIsFormOpen(true);
  };

  const handleEdit = (student: Student) => {
    setCurrentStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone || '',
      studentId: student.studentId,
      dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : '',
    });
    setIsFormOpen(true);
  };

  const handleDelete = (student: Student) => {
    setStudentsList(studentsList.filter(s => s.id !== student.id));
    toast({
      title: 'Student deleted',
      description: `${student.name} has been removed`,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.studentId) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    if (currentStudent) {
      // Update existing student - convert dateOfBirth from string to Date
      const updatedStudents = studentsList.map(s => 
        s.id === currentStudent.id 
          ? { 
              ...s, 
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              studentId: formData.studentId,
              dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
              updatedAt: new Date()
            } 
          : s
      );
      setStudentsList(updatedStudents);
      toast({
        title: 'Student updated',
        description: `${formData.name} has been updated`,
      });
    } else {
      // Create new student - convert dateOfBirth from string to Date
      const newStudent: Student = {
        id: Math.random().toString(36).substring(2, 11),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        studentId: formData.studentId,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setStudentsList([...studentsList, newStudent]);
      toast({
        title: 'Student created',
        description: `${formData.name} has been added`,
      });
    }
    
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage student records and information.
          </p>
        </div>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <DataTable 
        data={studentsList}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        title="Students"
      />

      <Dialog open={isFormOpen} onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setIsFormOpen(false);
          }, 100);
        }
      }}>
        <DialogContent className="sm:max-w-[550px] p-0">
          <DialogTitle className="px-4 pt-4">
            {currentStudent ? 'Edit Student' : 'Add Student'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {currentStudent ? 'Edit student information' : 'Enter new student information'}
          </DialogDescription>
          <EntityForm
            title="Student"
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
            isEdit={!!currentStudent}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID *</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="e.g. S12345"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(123) 456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
            </div>
          </EntityForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
