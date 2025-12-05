import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./General/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <h1>Hello</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ top: "73px", right: "2px" }}
          toastClassName="!rounded-none !bg-gray-800 !text-white"
        />
      </div>
    </>
  );
}

export default App;
