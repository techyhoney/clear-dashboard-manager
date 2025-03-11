
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/DataTable';
import { EntityForm } from '@/components/ui/EntityForm';
import { departments, instructors } from '@/lib/data';
import { Department, DepartmentFormData } from '@/lib/interfaces';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const Departments = () => {
  const { toast } = useToast();
  const [departmentsList, setDepartmentsList] = useState<Department[]>([...departments]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: '',
    code: '',
    headInstructorId: '',
    description: '',
  });

  const columns = [
    {
      id: 'name',
      header: 'Department Name',
      cell: (row: Department) => <div className="font-medium">{row.name}</div>,
      sortable: true,
    },
    {
      id: 'code',
      header: 'Code',
      cell: (row: Department) => <div className="font-mono">{row.code}</div>,
      sortable: true,
    },
    {
      id: 'headInstructor',
      header: 'Department Head',
      cell: (row: Department) => {
        const headInstructor = instructors.find(i => i.id === row.headInstructorId);
        return headInstructor ? headInstructor.name : 'Not assigned';
      },
    },
    {
      id: 'description',
      header: 'Description',
      cell: (row: Department) => <div className="truncate max-w-xs">{row.description || 'No description'}</div>,
    },
  ];

  const handleAdd = () => {
    setCurrentDepartment(null);
    setFormData({
      name: '',
      code: '',
      headInstructorId: '',
      description: '',
    });
    setIsFormOpen(true);
  };

  const handleEdit = (department: Department) => {
    setCurrentDepartment(department);
    setFormData({
      name: department.name,
      code: department.code,
      headInstructorId: department.headInstructorId || '',
      description: department.description || '',
    });
    setIsFormOpen(true);
  };

  const handleDelete = (department: Department) => {
    setDepartmentsList(departmentsList.filter(d => d.id !== department.id));
    toast({
      title: 'Department deleted',
      description: `${department.name} has been removed`,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.code) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    if (currentDepartment) {
      // Update existing department
      const updatedDepartments = departmentsList.map(d => 
        d.id === currentDepartment.id 
          ? { 
              ...d, 
              name: formData.name,
              code: formData.code,
              headInstructorId: formData.headInstructorId || undefined,
              description: formData.description || undefined,
              updatedAt: new Date() 
            } 
          : d
      );
      setDepartmentsList(updatedDepartments);
      toast({
        title: 'Department updated',
        description: `${formData.name} has been updated`,
      });
    } else {
      // Create new department
      const newDepartment: Department = {
        id: Math.random().toString(36).substring(2, 11),
        name: formData.name,
        code: formData.code,
        headInstructorId: formData.headInstructorId || undefined,
        description: formData.description || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setDepartmentsList([...departmentsList, newDepartment]);
      toast({
        title: 'Department created',
        description: `${formData.name} has been added`,
      });
    }
    
    closeForm();
  };

  const closeForm = () => {
    // First close the form logically
    setIsFormOpen(false);
    
    // Then reset the form data after a short delay
    setTimeout(() => {
      setCurrentDepartment(null);
      setFormData({
        name: '',
        code: '',
        headInstructorId: '',
        description: '',
      });
    }, 200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">
            Manage your academic departments and their leadership.
          </p>
        </div>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      <DataTable 
        data={departmentsList}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        title="Departments"
      />

      <Dialog 
        open={isFormOpen} 
        onOpenChange={(open) => {
          if (!open) {
            closeForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {currentDepartment ? 'Edit Department' : 'Add Department'}
            </DialogTitle>
            <DialogDescription>
              {currentDepartment ? 'Update department information' : 'Enter new department information'}
            </DialogDescription>
          </DialogHeader>

          <EntityForm
            title="Department"
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            isEdit={!!currentDepartment}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Department Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Computer Science"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Department Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. CS"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headInstructor">Department Head</Label>
                <Select
                  value={formData.headInstructorId}
                  onValueChange={(value) => setFormData({ ...formData, headInstructorId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department head (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter department description"
                  rows={3}
                />
              </div>
            </div>
          </EntityForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Departments;
