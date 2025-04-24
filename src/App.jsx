import { useState, useRef, useEffect } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoAnalytics } from "react-icons/io5";
import { MdProductionQuantityLimits, MdLocalOffer, MdOutlineInventory, MdOutlineReport } from "react-icons/md";
import { LiaJediOrder } from "react-icons/lia";
import { SiSimpleanalytics } from "react-icons/si";
import { FcCustomerSupport } from "react-icons/fc";
import { AiOutlineMessage } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { FiSettings, FiMenu } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

const menuItems = [
  { label: "Dashboard", icon: <RxDashboard />, path: '' },
  { label: "Analytics", icon: <IoAnalytics />, path: 'analytics' },
  { label: "Products", icon: <MdProductionQuantityLimits />, path: 'products' },
  { label: "Offers", icon: <MdLocalOffer />, path: 'offers' },
  { label: "Inventory", icon: <MdOutlineInventory />, path: 'inventory' },
  { label: "Orders", icon: <LiaJediOrder />, path: 'orders' },
  { label: "Sales", icon: <SiSimpleanalytics />, path: 'sales' },
  { label: "Customers", icon: <FcCustomerSupport />, path: 'customers' },
  { label: "Messages", icon: <AiOutlineMessage />, path: 'message' },
  { label: "Reports", icon: <MdOutlineReport />, path: 'reports' },
  { label: "Shipping", icon: <FaShippingFast />, path: 'shipping' },
  { label: "Admins", icon: <RiAdminLine />, path: 'admins' },
  { label: "Settings", icon: <FiSettings />, path: 'settings' },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-[#bbced6] w-64 p-4 space-y-6 absolute md:relative z-20 md:translate-x-0 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h1 className="text-3xl font-bold text-gray-700 mb-4 border-b pb-4">Shoppixel</h1>
        {menuItems.map(({ label, icon, path }, idx) => (
          <NavLink
            to={path}
            key={idx}
            className="flex items-center gap-3 text-lg font-medium py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-2xl">{icon}</span>
            <span className="hidden md:inline">{label}</span>
          </NavLink>
        ))}
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden absolute top-4 left-4 text-3xl z-30"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu />
      </button>

      {/* Main Content */}
      <div className="flex-1 mt-10 p-6 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
