import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import Ecosystem from "./pages/Ecosystem";
import Sustainability from "./pages/Sustainability";
import Investments from "./pages/Investments";
import Press from "./pages/Press";
import Contacts from "./pages/Contacts";
import History from "./pages/Company/History";
import Governance from "./pages/Company/Governance";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ecosystem" element={<Ecosystem />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/press" element={<Press />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/company/history" element={<History />} />
              <Route path="/company/governance" element={<Governance />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
