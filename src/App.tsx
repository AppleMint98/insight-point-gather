
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SurveyList from "./pages/SurveyList";
import SurveyDetail from "./pages/SurveyDetail";
import SurveyResponse from "./pages/SurveyResponse";
import MyLibrary from "./pages/MyLibrary";
import Dashboard from "./pages/Dashboard";
import CreateSurvey from "./pages/CreateSurvey";
import Profile from "./pages/Profile";
import MyRewards from "./pages/MyRewards";
import NonResponders from "./pages/NonResponders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/survey/:id" element={<SurveyDetail />} />
          <Route path="/survey/:id/response" element={<SurveyResponse />} />
          <Route path="/library" element={<MyLibrary />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/non-responders/:id" element={<NonResponders />} />
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/rewards" element={<MyRewards />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
