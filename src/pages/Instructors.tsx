
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/DataTable';
import { EntityForm } from '@/components/ui/EntityForm';
import { instructors, departments } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Instructor } from '@/lib/types';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const Instructors = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState<Instructor | null>(null);
  const [instructorsList, setInstructorsList] = useState([...instructors]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    departmentId: '',
    title: '',
  });

  const columns = [
    {
      id: 'name',
      header: 'Name',
      cell: (row: Instructor) => <div className="font-medium">{row.name}</div>,
      sortable: true,
    },
    {
      id: 'email',
      header: 'Email',
      cell: (row: Instructor) => row.email,
      sortable: true,
    },
    {
      id: 'phone',
      header: 'Phone',
      cell: (row: Instructor) => row.phone || 'N/A',
    },
    {
      id: 'department',
      header: 'Department',
      cell: (row: Instructor) => {
        const dept = departments.find(d => d.id === row.departmentId);
        return dept ? dept.name : 'Unknown';
      },
      sortable: true,
    },
    {
      id: 'title',
      header: 'Title',
      cell: (row: Instructor) => row.title || 'N/A',
    },
  ];

  const handleAdd = () => {
    setCurrentInstructor(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      departmentId: '',
      title: '',
    });
    setIsFormOpen(true);
  };

  const handleEdit = (instructor: Instructor) => {
    setCurrentInstructor(instructor);
    setFormData({
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone || '',
      departmentId: instructor.departmentId,
      title: instructor.title || '',
    });
    setIsFormOpen(true);
  };

  const handleDelete = (instructor: Instructor) => {
    // In a real application, you would call an API here
    setInstructorsList(instructorsList.filter(i => i.id !== instructor.id));
    toast({
      title: 'Instructor deleted',
      description: `${instructor.name} has been removed`,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.departmentId) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    // In a real application, you would call an API here
    if (currentInstructor) {
      // Update existing instructor
      const updatedInstructors = instructorsList.map(i => 
        i.id === currentInstructor.id 
          ? { 
              ...i, 
              ...formData, 
              updatedAt: new Date() 
            } 
          : i
      );
      setInstructorsList(updatedInstructors);
      toast({
        title: 'Instructor updated',
        description: `${formData.name} has been updated`,
      });
    } else {
      // Create new instructor
      const newInstructor: Instructor = {
        id: Math.random().toString(36).substring(2, 11),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setInstructorsList([...instructorsList, newInstructor]);
      toast({
        title: 'Instructor created',
        description: `${formData.name} has been added`,
      });
    }
    
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instructors</h1>
          <p className="text-muted-foreground">
            Manage your instructors and their department assignments.
          </p>
        </div>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Instructor
        </Button>
      </div>

      <DataTable 
        data={instructorsList}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        title="Instructors"
      />

      <Dialog open={isFormOpen} onOpenChange={(open) => {
        if (!open) {
          // Allow a small delay before closing to prevent click event issues
          setTimeout(() => {
            setIsFormOpen(false);
          }, 100);
        }
      }}>
        <DialogContent className="sm:max-w-[550px] p-0">
          <DialogTitle className="sr-only">
            {currentInstructor ? 'Edit Instructor' : 'Add Instructor'}
          </DialogTitle>
          <EntityForm
            title="Instructor"
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
            isEdit={!!currentInstructor}
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
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Professor, Lecturer"
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
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.departmentId}
                  onValueChange={(value) => setFormData({ ...formData, departmentId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </EntityForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Instructors;
