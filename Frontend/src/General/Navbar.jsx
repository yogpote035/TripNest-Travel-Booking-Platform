import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../AllStateAndFeature/Authentication/AuthSlice";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaTicketAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // detect active route (works for nested routes too)
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="logo.jpg"
            alt="TripNest"
            className="h-10 bg-transparent"
          />
        </Link>

        {/* TOP NAV LINKS (Desktop) */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <NavLink to="/flights" active={isActive("/flights")}>
            Flights
          </NavLink>
          <NavLink to="/trains" active={isActive("/trains")}>
            Trains
          </NavLink>
          <NavLink to="/buses" active={isActive("/buses")}>
            Buses
          </NavLink>
          <NavLink to="/hotels" active={isActive("/hotels")}>
            Hotels
          </NavLink>
        </ul>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-white hover:bg-red-500 rounded-md px-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${
                  isActive("/login")
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "hover:text-blue-600"
                }`}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className={`${
                  isActive("/signup")
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "hover:text-blue-600"
                }`}
              >
                SignUp
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
          <FaBars />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-bold text-lg text-blue-600">TripUp</span>
          <button onClick={() => setOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>

        <ul className="px-6 py-6 space-y-6 font-medium text-gray-700">
          <MobileLink
            to="/flights"
            active={isActive("/flights")}
            close={() => setOpen(false)}
          >
            Flights
          </MobileLink>
          <MobileLink
            to="/trains"
            active={isActive("/trains")}
            close={() => setOpen(false)}
          >
            Trains
          </MobileLink>
          <MobileLink
            to="/buses"
            active={isActive("/buses")}
            close={() => setOpen(false)}
          >
            Buses
          </MobileLink>
          <MobileLink
            to="/hotels"
            active={isActive("/hotels")}
            close={() => setOpen(false)}
          >
            Hotels
          </MobileLink>

          {user && (
            <MobileLink
              to="/recent-activity"
              active={isActive("/recent-activity")}
              close={() => setOpen(false)}
            >
              <FaTicketAlt /> Recent Activity
            </MobileLink>
          )}

          <hr />

          {/* auth */}
          {user ? (
            <>
              <MobileLink
                to="/profile"
                active={isActive("/profile")}
                close={() => setOpen(false)}
              >
                <FaUser /> Profile
              </MobileLink>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex items-center gap-2 text-red-600"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <MobileLink
                to="/login"
                active={isActive("/login")}
                close={() => setOpen(false)}
              >
                Login
              </MobileLink>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className={`block text-center px-4 py-2 rounded-md ${
                  isActive("/signup")
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

/* Desktop Nav Link Component */
const NavLink = ({ to, children, active }) => (
  <li>
    <Link
      to={to}
      className={
        active
          ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
          : "hover:text-blue-600"
      }
    >
      {children}
    </Link>
  </li>
);

/* Mobile Link Component */
const MobileLink = ({ to, children, close, active }) => (
  <li>
    <Link
      to={to}
      onClick={close}
      className={
        active
          ? "flex items-center gap-2 text-blue-600 font-semibold"
          : "flex items-center gap-2 hover:text-blue-600"
      }
    >
      {children}
    </Link>
  </li>
);

export default Navbar;
