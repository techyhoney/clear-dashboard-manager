
import { 
  Instructor, 
  Department, 
  Course, 
  Section, 
  Student, 
  Enrollment, 
  Attendance, 
  Schedule 
} from './types';

// Generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 11);
};

// Create a timestamp for now
const now = new Date();

// Mock data
export const departments: Department[] = [
  {
    id: 'd1',
    name: 'Computer Science',
    code: 'CS',
    description: 'Department of Computer Science and Engineering',
    createdAt: new Date(2020, 0, 15),
    updatedAt: now,
  },
  {
    id: 'd2',
    name: 'Mathematics',
    code: 'MATH',
    description: 'Department of Mathematics and Statistics',
    createdAt: new Date(2020, 0, 15),
    updatedAt: now,
  },
  {
    id: 'd3',
    name: 'Physics',
    code: 'PHYS',
    description: 'Department of Physics and Astronomy',
    createdAt: new Date(2020, 0, 15),
    updatedAt: now,
  },
];

export const instructors: Instructor[] = [
  {
    id: 'i1',
    name: 'Dr. Alan Turing',
    email: 'turing@university.edu',
    phone: '555-123-4567',
    departmentId: 'd1',
    title: 'Professor',
    createdAt: new Date(2020, 1, 10),
    updatedAt: now,
  },
  {
    id: 'i2',
    name: 'Dr. Grace Hopper',
    email: 'hopper@university.edu',
    phone: '555-765-4321',
    departmentId: 'd1',
    title: 'Associate Professor',
    createdAt: new Date(2020, 2, 15),
    updatedAt: now,
  },
  {
    id: 'i3',
    name: 'Dr. Isaac Newton',
    email: 'newton@university.edu',
    phone: '555-987-6543',
    departmentId: 'd2',
    title: 'Professor',
    createdAt: new Date(2020, 3, 20),
    updatedAt: now,
  },
];

export const courses: Course[] = [
  {
    id: 'c1',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    credits: 3,
    departmentId: 'd1',
    description: 'Fundamentals of computer programming and problem solving',
    createdAt: new Date(2020, 4, 5),
    updatedAt: now,
  },
  {
    id: 'c2',
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    credits: 4,
    departmentId: 'd1',
    description: 'Study of data structures and algorithms for solving computational problems',
    createdAt: new Date(2020, 4, 10),
    updatedAt: now,
  },
  {
    id: 'c3',
    name: 'Calculus I',
    code: 'MATH101',
    credits: 4,
    departmentId: 'd2',
    description: 'Introduction to differential and integral calculus',
    createdAt: new Date(2020, 4, 15),
    updatedAt: now,
  },
];

export const sections: Section[] = [
  {
    id: 's1',
    courseId: 'c1',
    instructorId: 'i1',
    roomNumber: 'CS-101',
    maxStudents: 30,
    semester: 'Fall',
    year: 2023,
    sectionNumber: '001',
    createdAt: new Date(2023, 6, 15),
    updatedAt: now,
  },
  {
    id: 's2',
    courseId: 'c1',
    instructorId: 'i2',
    roomNumber: 'CS-102',
    maxStudents: 25,
    semester: 'Fall',
    year: 2023,
    sectionNumber: '002',
    createdAt: new Date(2023, 6, 20),
    updatedAt: now,
  },
  {
    id: 's3',
    courseId: 'c3',
    instructorId: 'i3',
    roomNumber: 'MATH-201',
    maxStudents: 35,
    semester: 'Fall',
    year: 2023,
    sectionNumber: '001',
    createdAt: new Date(2023, 6, 25),
    updatedAt: now,
  },
];

export const students: Student[] = [
  {
    id: 'st1',
    name: 'John Doe',
    email: 'john@university.edu',
    studentId: '20230001',
    dateOfBirth: new Date(2000, 5, 15),
    phone: '555-111-2222',
    address: '123 Campus Drive',
    createdAt: new Date(2023, 7, 1),
    updatedAt: now,
  },
  {
    id: 'st2',
    name: 'Jane Smith',
    email: 'jane@university.edu',
    studentId: '20230002',
    dateOfBirth: new Date(2001, 2, 22),
    phone: '555-333-4444',
    address: '456 University Ave',
    createdAt: new Date(2023, 7, 2),
    updatedAt: now,
  },
  {
    id: 'st3',
    name: 'Michael Johnson',
    email: 'michael@university.edu',
    studentId: '20230003',
    dateOfBirth: new Date(2000, 11, 7),
    phone: '555-555-6666',
    address: '789 College Blvd',
    createdAt: new Date(2023, 7, 3),
    updatedAt: now,
  },
];

export const enrollments: Enrollment[] = [
  {
    id: 'e1',
    studentId: 'st1',
    sectionId: 's1',
    enrollmentDate: new Date(2023, 7, 10),
    status: 'active',
    createdAt: new Date(2023, 7, 10),
    updatedAt: now,
  },
  {
    id: 'e2',
    studentId: 'st2',
    sectionId: 's1',
    enrollmentDate: new Date(2023, 7, 11),
    status: 'active',
    createdAt: new Date(2023, 7, 11),
    updatedAt: now,
  },
  {
    id: 'e3',
    studentId: 'st3',
    sectionId: 's2',
    enrollmentDate: new Date(2023, 7, 12),
    status: 'active',
    createdAt: new Date(2023, 7, 12),
    updatedAt: now,
  },
];

export const attendances: Attendance[] = [
  {
    id: 'a1',
    enrollmentId: 'e1',
    date: new Date(2023, 8, 5),
    status: 'present',
    createdAt: new Date(2023, 8, 5),
    updatedAt: now,
  },
  {
    id: 'a2',
    enrollmentId: 'e2',
    date: new Date(2023, 8, 5),
    status: 'present',
    createdAt: new Date(2023, 8, 5),
    updatedAt: now,
  },
  {
    id: 'a3',
    enrollmentId: 'e3',
    date: new Date(2023, 8, 6),
    status: 'absent',
    notes: 'Student reported sick',
    createdAt: new Date(2023, 8, 6),
    updatedAt: now,
  },
];

export const schedules: Schedule[] = [
  {
    id: 'sc1',
    sectionId: 's1',
    dayOfWeek: 'monday',
    startTime: '09:00',
    endTime: '10:30',
    recurrence: 'weekly',
    location: 'CS-101',
    createdAt: new Date(2023, 7, 20),
    updatedAt: now,
  },
  {
    id: 'sc2',
    sectionId: 's1',
    dayOfWeek: 'wednesday',
    startTime: '09:00',
    endTime: '10:30',
    recurrence: 'weekly',
    location: 'CS-101',
    createdAt: new Date(2023, 7, 20),
    updatedAt: now,
  },
  {
    id: 'sc3',
    sectionId: 's2',
    dayOfWeek: 'tuesday',
    startTime: '13:00',
    endTime: '14:30',
    recurrence: 'weekly',
    location: 'CS-102',
    createdAt: new Date(2023, 7, 21),
    updatedAt: now,
  },
];

// Helper functions to get related entities
export const getDepartmentById = (id: string) => {
  return departments.find(dept => dept.id === id);
};

export const getInstructorById = (id: string) => {
  return instructors.find(inst => inst.id === id);
};

export const getCourseById = (id: string) => {
  return courses.find(course => course.id === id);
};

export const getSectionById = (id: string) => {
  return sections.find(section => section.id === id);
};

export const getStudentById = (id: string) => {
  return students.find(student => student.id === id);
};

export const getEnrollmentById = (id: string) => {
  return enrollments.find(enrollment => enrollment.id === id);
};
