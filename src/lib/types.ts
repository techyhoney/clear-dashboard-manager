
// Base interface for all entities
export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Instructor extends Entity {
  name: string;
  email: string;
  phone?: string;
  departmentId: string;
  title?: string;
}

export interface Department extends Entity {
  name: string;
  code: string;
  headInstructorId?: string;
  description?: string;
}

export interface Course extends Entity {
  name: string;
  code: string;
  credits: number;
  departmentId: string;
  description?: string;
}

export interface Section extends Entity {
  courseId: string;
  instructorId: string;
  roomNumber?: string;
  maxStudents: number;
  semester: string;
  year: number;
  sectionNumber: string;
}

export interface Student extends Entity {
  name: string;
  email: string;
  studentId: string;
  dateOfBirth?: Date;
  phone?: string;
  address?: string;
}

export interface Enrollment extends Entity {
  studentId: string;
  sectionId: string;
  enrollmentDate: Date;
  grade?: string;
  status: 'active' | 'dropped' | 'completed';
}

export interface Attendance extends Entity {
  enrollmentId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface Schedule extends Entity {
  sectionId: string;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  recurrence: 'weekly' | 'biweekly' | 'monthly' | 'once';
  location?: string;
}
