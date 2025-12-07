import { FaPlane, FaTrain, FaBus, FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-20">

      {/* HERO SECTION */}
      <section className="relative text-white py-39 px-6 text-center homePage">
        <h1 className="text-4xl font-bold mb-4">
          Your Journey Starts With <span className="text-yellow-300">TripNest</span>
        </h1>
        <p className="text-lg opacity-90 mb-6">
          Book flights, trains, buses, and hotels at the best prices.
        </p>

        {/* SEARCH BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            to="/flights"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-200"
          >
            Search Flights
          </Link>

          <Link
            to="/trains"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-200"
          >
            Search Trains
          </Link>

          <Link
            to="/buses"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-200"
          >
            Search Buses
          </Link>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
            <FaPlane className="text-blue-600 text-4xl mb-4" />
            <h3 className="font-semibold mb-2">Flights</h3>
            <p className="text-sm text-gray-600">
              Book domestic and international flights instantly.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
            <FaTrain className="text-blue-600 text-4xl mb-4" />
            <h3 className="font-semibold mb-2">Trains</h3>
            <p className="text-sm text-gray-600">
              Fast and easy railway seat reservations.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
            <FaBus className="text-blue-600 text-4xl mb-4" />
            <h3 className="font-semibold mb-2">Buses</h3>
            <p className="text-sm text-gray-600">
              Comfortable and affordable bus tickets.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
            <FaHotel className="text-blue-600 text-4xl mb-4" />
            <h3 className="font-semibold mb-2">Hotels</h3>
            <p className="text-sm text-gray-600">
              Find the best hotels at unbeatable prices.
            </p>
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Popular Routes</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Mumbai → Goa",
              "Pune → Bangalore",
              "Delhi → Jaipur",
              "Hyderabad → Chennai",
              "Surat → Ahmedabad",
              "Nagpur → Mumbai",
            ].map((route, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md cursor-pointer"
              >
                <p className="font-semibold text-lg">{route}</p>
                <p className="text-sm text-gray-600 mt-1">Best price guaranteed</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* 
      FOOTER
      <footer className="bg-black text-gray-300 py-6 text-center text-sm">
        © {new Date().getFullYear()} TripUp. All rights reserved.
      </footer> */}
    </div>
  );
};

export default Home;
