import React, { useState } from 'react';
import { FcCustomerSupport } from 'react-icons/fc';
import { FaUserPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

export default function Customers() {
  // Sample data
  const initialCustomers = [...Array(23)].map((_, idx) => ({
    id: idx + 1,
    name: `Customer ${idx + 1}`,
    email: `customer${idx + 1}@example.com`,
    joined: ['Jan', 'Feb', 'Mar', 'Apr'][idx % 4] + ` ${2023 + Math.floor(idx / 4)}`,
    status: idx % 2 === 0 ? 'Active' : 'Inactive',
  }));

  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', status: 'Active' });

  // Filtering and search
  const filtered = customers.filter(c =>
    (filter === 'All' || c.status === filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  function handleAdd() {
    const newCust = { ...form, id: customers.length + 1, joined: new Date().toLocaleString('default', { month: 'short', year: 'numeric' }) };
    setCustomers([newCust, ...customers]);
    setShowModal(false);
    setForm({ name: '', email: '', status: 'Active' });
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 space-y-8">
      {/* Header & Add Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FcCustomerSupport className="text-4xl" />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Customer Management</h1>
            <p className="text-gray-600">Manage and track your customer base effectively.</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition"
        >
          <FaUserPlus /> Add Customer
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white shadow-lg p-4 rounded-lg">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search name or email..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-2">
          {['All', 'Active', 'Inactive'].map(status => (
            <button
              key={status}
              onClick={() => { setFilter(status); setPage(1); }}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Joined</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {current.map(c => (
              <tr key={c.id} className="border-b hover:bg-indigo-50 transition">
                <td className="py-3 px-4 font-medium">#{c.id}</td>
                <td className="py-3 px-4">{c.name}</td>
                <td className="py-3 px-4">{c.email}</td>
                <td className="py-3 px-4">{c.joined}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 transition"><FaEdit /></button>
                  <button className="text-red-600 hover:text-red-800 transition"><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >Prev</button>
        <span className="px-3 py-1">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >Next</button>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl space-y-4">
            <h2 className="text-xl font-semibold">Add New Customer</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
              <select className="w-full px-4 py-2 border rounded">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}