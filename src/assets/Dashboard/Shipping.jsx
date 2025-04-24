import React, { useState } from 'react';
import { FaTruck, FaShippingFast, FaBoxOpen, FaUndo } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

export default function Shipping() {
  // Dummy shipment data
  const shipments = [...Array(8)].map((_, idx) => ({
    id: `SHIP${1000 + idx}`,
    customer: `Customer ${idx + 1}`,
    destination: ['New York','Los Angeles','Chicago','Houston'][idx % 4],
    status: ['In Transit','Delivered','Pending','Returned'][idx % 4],
    date: `Apr ${20 + idx}, 2025`
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = shipments.filter(s => {
    const matchText = s.id.toLowerCase().includes(searchTerm.toLowerCase())
      || s.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchText && (filter === 'All' || s.status === filter);
  });

  const counts = {
    total: shipments.length,
    inTransit: shipments.filter(s => s.status === 'In Transit').length,
    delivered: shipments.filter(s => s.status === 'Delivered').length,
    returned: shipments.filter(s => s.status === 'Returned').length
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FaShippingFast className="text-4xl text-indigo-600" />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Shipping Dashboard</h1>
            <p className="text-gray-600">Track and manage all your shipments in one place.</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Total Shipments</p>
            <FaBoxOpen className="text-3xl text-indigo-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{counts.total}</h2>
        </div>
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">In Transit</p>
            <FaTruck className="text-3xl text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{counts.inTransit}</h2>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-50 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Delivered</p>
            <FaUndo className="text-3xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{counts.delivered}</h2>
        </div>
        <div className="bg-gradient-to-br from-red-100 to-red-50 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Returned</p>
            <FaBoxOpen className="text-3xl text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{counts.returned}</h2>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by ID or customer..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          {['All','In Transit','Delivered','Returned'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter===s ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'}`}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Shipments Table */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-indigo-100 to-blue-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">Shipment ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Destination</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, idx) => (
              <tr key={idx} className="border-b hover:bg-indigo-50 transition">
                <td className="py-3 px-4 font-medium text-gray-800">{s.id}</td>
                <td className="py-3 px-4 text-gray-700">{s.customer}</td>
                <td className="py-3 px-4 text-gray-700">{s.destination}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    s.status==='In Transit'?'bg-yellow-100 text-yellow-700':
                    s.status==='Delivered'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}