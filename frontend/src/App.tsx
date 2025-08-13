import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LandingPage } from "@/components/landing/LandingPage";
import { HomePage } from "@/components/home/HomePage";
import FIRComplaintForm from "./components/fir-form/FIRComplaintForm";
import ServicesLandingPage from "./components/Form";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ServicesLandingWrapper = () => {
  const navigate = useNavigate();
  return (
    <ServicesLandingPage onNavigateToForm={() => navigate("/forms/fir")} />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route
              path="/"
              element={
                <>
                  <SignedOut>
                    <LandingPage />
                  </SignedOut>
                  <SignedIn>
                    <HomePage />
                  </SignedIn>
                </>
              }
            />

            {/* Service Landing Page route */}
            <Route
              path="/services"
              element={
                <SignedIn>
                  <ServicesLandingWrapper />
                </SignedIn>
              }
            />

            {/* FIR Complaint Form route */}
            <Route
              path="/forms/fir"
              element={
                <SignedIn>
                  <FIRComplaintForm />
                </SignedIn>
              }
            />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
