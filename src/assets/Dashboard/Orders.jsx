import React, { useState } from 'react';
import { LiaJediOrder } from 'react-icons/lia';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

export default function Orders() {
  const [filterStatus, setFilterStatus] = useState('All');

  const orders = [...Array(6)].map((_, idx) => ({
    id: idx + 1,
    customer: `Customer #${idx + 1}`,
    date: 'Apr 23, 2025',
    total: (Math.random() * 200).toFixed(2),
    status: idx % 3 === 0 ? 'Delivered' : idx % 3 === 1 ? 'Pending' : 'Cancelled',
  }));

  const filteredOrders = filterStatus === 'All' ? orders : orders.filter(o => o.status === filterStatus);

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-red-50 min-h-screen space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <LiaJediOrder className="text-4xl text-orange-600" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Order Management</h1>
          <p className="text-base text-gray-600">Track and manage your recent orders.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shadow-lg p-4 rounded-xl">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value="All">All</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className="w-full md:w-auto px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md shadow-md transition-all duration-200">
          Export Orders
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-700 bg-gradient-to-r from-orange-100 to-red-100 border-b">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-pink-50">
                <td className="py-3 px-4 font-medium text-gray-800">#{order.id}</td>
                <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                <td className="py-3 px-4 text-gray-600">{order.date}</td>
                <td className="py-3 px-4 text-gray-900 font-semibold">${order.total}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {order.status === 'Delivered' && <FaCheckCircle />}
                    {order.status === 'Pending' && <FaHourglassHalf />}
                    {order.status === 'Cancelled' && <FaTimesCircle />}
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
