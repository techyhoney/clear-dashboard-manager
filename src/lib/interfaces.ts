
// Base interface for all entities
export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Instructor model
export interface Instructor extends Entity {
  name: string;
  email: string;
  phone?: string;
  departmentId: string;
  title?: string;
}

// Department model
export interface Department extends Entity {
  name: string;
  code: string;
  headInstructorId?: string;
  description?: string;
}

// Course model
export interface Course extends Entity {
  name: string;
  code: string;
  credits: number;
  departmentId: string;
  description?: string;
}

// Section model
export interface Section extends Entity {
  courseId: string;
  instructorId: string;
  roomNumber?: string;
  maxStudents: number;
  semester: string;
  year: number;
  sectionNumber: string;
}

// Student model
export interface Student extends Entity {
  name: string;
  email: string;
  studentId: string;
  dateOfBirth?: Date;
  phone?: string;
  address?: string;
}

// Enrollment model
export interface Enrollment extends Entity {
  studentId: string;
  sectionId: string;
  enrollmentDate: Date;
  grade?: string;
  status: 'active' | 'dropped' | 'completed';
}

// Attendance model
export interface Attendance extends Entity {
  enrollmentId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

// Schedule model
export interface Schedule extends Entity {
  sectionId: string;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  recurrence: 'weekly' | 'biweekly' | 'monthly' | 'once';
  location?: string;
}

// Form data interfaces (used for type safety in forms)

export interface InstructorFormData {
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  title: string;
}

export interface DepartmentFormData {
  name: string;
  code: string;
  headInstructorId: string;
  description: string;
}

export interface CourseFormData {
  code: string;
  name: string;
  credits: string;
  departmentId: string;
  description: string;
}

export interface SectionFormData {
  courseId: string;
  instructorId: string;
  roomNumber: string;
  maxStudents: string;
  semester: string;
  year: string;
  sectionNumber: string;
}

export interface StudentFormData {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  dateOfBirth: string;
  address?: string;
}
