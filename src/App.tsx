import "./App.css";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="flex h-screen bg-[#141416] flex-col">
      <Router>
        <Routes>  
          <Route path="*" loader={({params}) => {
              throw new Response("Not Found", { status: 404 });
          }} element={<NotFound />}/>
          <Route path="/" element={<Home />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
