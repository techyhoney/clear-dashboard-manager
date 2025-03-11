
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DataTable } from '@/components/ui/DataTable';
import { EntityForm } from '@/components/ui/EntityForm';
import { courses, departments } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Course, CourseFormData } from '@/lib/interfaces';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Courses = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [coursesList, setCoursesList] = useState<Course[]>([...courses]);

  // Form state
  const [formData, setFormData] = useState<CourseFormData>({
    code: '',
    name: '',
    credits: '3',
    departmentId: '',
    description: '',
  });

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

  const handleAdd = () => {
    setCurrentCourse(null);
    setFormData({
      code: '',
      name: '',
      credits: '3',
      departmentId: '',
      description: '',
    });
    setIsFormOpen(true);
  };

  const handleEdit = (course: Course) => {
    setCurrentCourse(course);
    setFormData({
      code: course.code,
      name: course.name,
      credits: course.credits.toString(),
      departmentId: course.departmentId,
      description: course.description || '',
    });
    setIsFormOpen(true);
  };

  const handleDelete = (course: Course) => {
    setCoursesList(coursesList.filter(c => c.id !== course.id));
    toast({
      title: 'Course deleted',
      description: `${course.code}: ${course.name} has been removed`,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.code || !formData.name || !formData.credits || !formData.departmentId) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    const credits = parseInt(formData.credits, 10);
    
    if (currentCourse) {
      // Update existing course
      const updatedCourses = coursesList.map(c => 
        c.id === currentCourse.id 
          ? { 
              ...c, 
              code: formData.code,
              name: formData.name,
              credits: credits,
              departmentId: formData.departmentId,
              description: formData.description || undefined,
              updatedAt: new Date() 
            } 
          : c
      );
      setCoursesList(updatedCourses);
      toast({
        title: 'Course updated',
        description: `${formData.code}: ${formData.name} has been updated`,
      });
    } else {
      // Create new course
      const newCourse: Course = {
        id: Math.random().toString(36).substring(2, 11),
        code: formData.code,
        name: formData.name,
        credits: credits,
        departmentId: formData.departmentId,
        description: formData.description || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCoursesList([...coursesList, newCourse]);
      toast({
        title: 'Course created',
        description: `${formData.code}: ${formData.name} has been added`,
      });
    }
    
    closeForm();
  };

  const closeForm = () => {
    // First close the form logically
    setIsFormOpen(false);
    
    // Then reset the form data after a short delay
    setTimeout(() => {
      setCurrentCourse(null);
      setFormData({
        code: '',
        name: '',
        credits: '3',
        departmentId: '',
        description: '',
      });
    }, 200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            View and manage the courses offered by departments.
          </p>
        </div>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <DataTable 
        data={coursesList}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        title="Courses"
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
              {currentCourse ? 'Edit Course' : 'Add Course'}
            </DialogTitle>
            <DialogDescription>
              {currentCourse ? 'Update course information' : 'Enter new course information'}
            </DialogDescription>
          </DialogHeader>
          
          <EntityForm
            title="Course"
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            isEdit={!!currentCourse}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. CS101"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits *</Label>
                  <Input
                    id="credits"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Course Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Introduction to Computer Science"
                  required
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

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Course description..."
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

export default Courses;
