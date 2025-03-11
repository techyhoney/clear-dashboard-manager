
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/DataTable';
import { EntityForm } from '@/components/ui/EntityForm';
import { sections, courses, instructors } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Section } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Sections = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [sectionsList, setSectionsList] = useState<Section[]>([...sections]);

  // Form state
  const [formData, setFormData] = useState({
    courseId: '',
    instructorId: '',
    roomNumber: '',
    maxStudents: '',
    semester: '',
    year: '',
    sectionNumber: '',
  });

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
      id: 'room',
      header: 'Room',
      cell: (row: Section) => row.roomNumber,
    },
    {
      id: 'capacity',
      header: 'Capacity',
      cell: (row: Section) => row.maxStudents,
    },
  ];

  const handleAdd = () => {
    setCurrentSection(null);
    setFormData({
      courseId: '',
      instructorId: '',
      roomNumber: '',
      maxStudents: '30',
      semester: 'Fall',
      year: new Date().getFullYear().toString(),
      sectionNumber: '',
    });
    setIsFormOpen(true);
  };

  const handleEdit = (section: Section) => {
    setCurrentSection(section);
    setFormData({
      courseId: section.courseId,
      instructorId: section.instructorId,
      roomNumber: section.roomNumber,
      maxStudents: section.maxStudents.toString(),
      semester: section.semester,
      year: section.year.toString(),
      sectionNumber: section.sectionNumber,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (section: Section) => {
    setSectionsList(sectionsList.filter(s => s.id !== section.id));
    toast({
      title: 'Section deleted',
      description: `Section ${section.sectionNumber} has been removed`,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.courseId || !formData.instructorId || !formData.sectionNumber) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    // Process form data
    const processedFormData = {
      ...formData,
      maxStudents: parseInt(formData.maxStudents, 10),
      year: parseInt(formData.year, 10),
    };
    
    if (currentSection) {
      // Update existing section
      const updatedSections = sectionsList.map(s => 
        s.id === currentSection.id 
          ? { 
              ...s, 
              ...processedFormData, 
              updatedAt: new Date() 
            } 
          : s
      );
      setSectionsList(updatedSections);
      toast({
        title: 'Section updated',
        description: `Section ${formData.sectionNumber} has been updated`,
      });
    } else {
      // Create new section
      const newSection: Section = {
        id: Math.random().toString(36).substring(2, 11),
        ...processedFormData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setSectionsList([...sectionsList, newSection]);
      toast({
        title: 'Section created',
        description: `Section ${formData.sectionNumber} has been added`,
      });
    }
    
    closeForm();
  };

  const closeForm = () => {
    // First close the form logically
    setIsFormOpen(false);
    
    // Then reset the form data after a short delay
    setTimeout(() => {
      setCurrentSection(null);
      setFormData({
        courseId: '',
        instructorId: '',
        roomNumber: '',
        maxStudents: '',
        semester: '',
        year: '',
        sectionNumber: '',
      });
    }, 200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sections</h1>
          <p className="text-muted-foreground">
            Manage course sections and instructor assignments.
          </p>
        </div>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Section
        </Button>
      </div>

      <DataTable 
        data={sectionsList}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        title="Course Sections"
      />

      <Dialog open={isFormOpen} onOpenChange={(open) => {
        if (!open) closeForm();
      }}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {currentSection ? 'Edit Section' : 'Add Section'}
            </DialogTitle>
            <DialogDescription>
              {currentSection ? 'Update section information' : 'Enter new section information'}
            </DialogDescription>
          </DialogHeader>

          <EntityForm
            title="Section"
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            isEdit={!!currentSection}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course *</Label>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code}: {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor *</Label>
                <Select
                  value={formData.instructorId}
                  onValueChange={(value) => setFormData({ ...formData, instructorId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an instructor" />
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sectionNumber">Section Number *</Label>
                  <Input
                    id="sectionNumber"
                    value={formData.sectionNumber}
                    onChange={(e) => setFormData({ ...formData, sectionNumber: e.target.value })}
                    placeholder="e.g. 001"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number *</Label>
                  <Input
                    id="roomNumber"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    placeholder="e.g. CS-101"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester *</Label>
                  <Select
                    value={formData.semester}
                    onValueChange={(value) => setFormData({ ...formData, semester: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fall">Fall</SelectItem>
                      <SelectItem value="Spring">Spring</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                      <SelectItem value="Winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder={new Date().getFullYear().toString()}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Max Students *</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
                    placeholder="30"
                    required
                  />
                </div>
              </div>
            </div>
          </EntityForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sections;
