import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import ProductBoard from "@/pages/ProductBoard";
import FeatureDetails from "@/pages/FeatureDetails";
import FeatureHistory from "@/pages/FeatureHistory";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:productId" element={<ProductBoard />} />
          <Route path="/feature/:featureId" element={<FeatureDetails />} />
          <Route path="/history" element={<FeatureHistory />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
