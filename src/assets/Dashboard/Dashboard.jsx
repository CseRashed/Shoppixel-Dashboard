import React from "react";
import {
  FaUsers,
  FaDollarSign,
  FaBox,
  FaShoppingCart
} from "react-icons/fa";

export default function Dashboard() {
  // Sample data
  const stats = [
    { icon: <FaDollarSign />, label: "Total Sales", value: "$25,400", color: "green" },
    { icon: <FaShoppingCart />, label: "Orders", value: "1,204", color: "blue" },
    { icon: <FaUsers />, label: "Customers", value: "982", color: "purple" },
    { icon: <FaBox />, label: "Products", value: "180", color: "orange" },
  ];

  const orders = [
    { name: "John Doe", product: "iPhone 15", status: "Shipped", date: "Apr 20, 2025", color: "green" },
    { name: "Jane Smith", product: "MacBook Pro", status: "Processing", date: "Apr 19, 2025", color: "yellow" },
    { name: "Alice Brown", product: "AirPods 3", status: "Delivered", date: "Apr 18, 2025", color: "teal" },
    { name: "Bob Martin", product: "Apple Watch SE", status: "Cancelled", date: "Apr 17, 2025", color: "red" },
  ];

  return (
    <div className="p-8  bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome back! Here’s what’s happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-6 flex items-center gap-5 hover:scale-105 transform"
          >
            <div className={`text-5xl text-${s.color}-500`}>{s.icon}</div>
            <div>
              <h3 className="text-sm text-gray-500">{s.label}</h3>
              <p className="text-2xl font-semibold text-gray-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
        <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
          {/* Insert your Chart Component Here */}
          [Insert Chart Component Here]
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-xl rounded-2xl p-6 overflow-x-auto transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b-2">
            <tr>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Product</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-3 px-2">{o.name}</td>
                <td className="py-3 px-2">{o.product}</td>
                <td className="py-3 px-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${o.color}-100 text-${o.color}-700`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-3 px-2">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
