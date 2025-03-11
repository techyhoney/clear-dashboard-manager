
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "@/pages/Index";
import Instructors from "@/pages/Instructors";
import Departments from "@/pages/Departments";
import Courses from "@/pages/Courses";
import Sections from "@/pages/Sections";
import Students from "@/pages/Students";
import Enrollments from "@/pages/Enrollments";
import Attendance from "@/pages/Attendance";
import Schedules from "@/pages/Schedules";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/students" element={<Students />} />
            <Route path="/enrollments" element={<Enrollments />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/schedules" element={<Schedules />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
