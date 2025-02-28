import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AboutUs from "./Base/AboutUs";
import Destinations from "./Base/Destinations";
import Transportation from "./Base/Transportaion";
import Accomadations from "./Base/Accomadations";
import Contact from "./Base/Contact";
import Gallery from "./Base/Gallery";
import Top from "./Components/Top";
import Bottom from "./Components/Bottom";
import QuestionPage from "./Pages/QuestionPage";
import SelectAnswer from "./Pages/SelectAnswer";
import AccomQuection from "./Pages/AccomQuection";
import { useEffect } from "react";
import { login, logout } from "./api/api";



function App() {
 
  return (
    <div className="App">
      <Top />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/destination" element={<Destinations />} />
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/accomadation" element={<Accomadations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/questionPage" element={< QuestionPage/>} />
          <Route path="/selectanswer" element={<SelectAnswer/>} />
          <Route path="/accomdanswer" element={<AccomQuection/>} />
        </Routes>
      </BrowserRouter>
      <Bottom />
    </div>
  );
}

export default App;
