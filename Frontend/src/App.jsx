import "./App.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./General/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          top: 80,
        }}
      />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <h1>Hello</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
