import React, { useState } from 'react';
import { FaUserPlus, FaEdit, FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

// Static admin data
const admins = [
  { id: 1, name: 'John Doe', role: 'Super Admin', status: 'Active', img: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Jane Smith', role: 'Admin', status: 'Inactive', img: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Tom Hanks', role: 'Moderator', status: 'Active', img: 'https://via.placeholder.com/50' },
];

export default function Admins() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Filter admins based on search and status
  const filteredAdmins = admins.filter(admin => {
    return (
      (admin.name.toLowerCase().includes(search.toLowerCase()) || admin.role.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus === 'All' || admin.status === filterStatus)
    );
  });

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 min-h-screen space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">Admins</h1>
          <p className="text-base text-gray-600">Manage your platform admins effectively.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition ease-in-out duration-300 transform hover:scale-105">
          <FaUserPlus className="text-lg" /> Add Admin
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2 border p-2 rounded-md w-full max-w-md">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search Admins"
            className="outline-none w-full text-gray-700"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Filter by Status
            {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {dropdownOpen && (
            <div className="absolute bg-white shadow-lg rounded-md mt-2 w-40 z-10">
              <button
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setFilterStatus('All')}
              >
                All
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setFilterStatus('Active')}
              >
                Active
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setFilterStatus('Inactive')}
              >
                Inactive
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admins Table */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl mt-6">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-700 bg-gradient-to-r from-blue-100 to-teal-100 border-b">
            <tr>
              <th className="py-3 px-4">Profile</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin, idx) => (
              <tr key={idx} className="border-b hover:bg-blue-50 transition ease-in-out duration-300 transform hover:scale-105">
                <td className="py-3 px-4">
                  <img src={admin.img} alt="Profile" className="w-12 h-12 rounded-full" />
                </td>
                <td className="py-3 px-4 text-gray-800">{admin.name}</td>
                <td className="py-3 px-4 text-gray-700">{admin.role}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      admin.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="text-blue-500 hover:text-blue-600 transition duration-200">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-600 transition duration-200">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-center mt-10">
        <p className="text-gray-500 text-sm">Admin Management System © 2025</p>
      </div>
    </div>
  );
}
