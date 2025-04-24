import React from 'react';
import { FaChartLine, FaDownload, FaUsers } from 'react-icons/fa';
import { MdBarChart, MdArrowUpward } from 'react-icons/md';

export default function Report() {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen space-y-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FaChartLine className="text-4xl text-blue-600" />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Report Overview</h1>
            <p className="text-base text-gray-600">Analyze your reports effectively with real-time data.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md">
          <FaDownload className="text-lg" /> Export Report
        </button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-100 to-green-50 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Total Users</p>
            <FaUsers className="text-3xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">1,245</h2>
          <span className="text-sm text-gray-600">+10% from last month</span>
        </div>

        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Sales Revenue</p>
            <MdArrowUpward className="text-3xl text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">$15,000</h2>
          <span className="text-sm text-gray-600">+25% from last quarter</span>
        </div>

        <div className="bg-gradient-to-br from-red-100 to-red-50 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Cancelled Orders</p>
            <MdBarChart className="text-3xl text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">32</h2>
          <span className="text-sm text-gray-600">-5% from last month</span>
        </div>
      </div>

      {/* Charts Section (Placeholder for charts like Bar, Pie) */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex items-center gap-2">
          <MdBarChart className="text-2xl text-indigo-500" />
          <h2 className="text-xl font-semibold text-gray-700">Monthly Sales Analysis</h2>
        </div>
        <div className="w-full h-60 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-md flex items-center justify-center text-gray-500">
          Chart Placeholder (Integrate with Chart.js or Recharts)
        </div>
      </div>

      {/* Report Table */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-700 bg-gradient-to-r from-pink-100 to-purple-100 border-b">
            <tr>
              <th className="py-3 px-4">Report ID</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Example rows */}
            <tr className="border-b hover:bg-blue-50">
              <td className="py-3 px-4 font-medium text-gray-800">REP001</td>
              <td className="py-3 px-4 text-gray-700">Sales Report</td>
              <td className="py-3 px-4 text-gray-700">$5,000</td>
              <td className="py-3 px-4 text-gray-500">Apr 10, 2025</td>
              <td className="py-3 px-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="border-b hover:bg-blue-50">
              <td className="py-3 px-4 font-medium text-gray-800">REP002</td>
              <td className="py-3 px-4 text-gray-700">Inventory Report</td>
              <td className="py-3 px-4 text-gray-700">$2,000</td>
              <td className="py-3 px-4 text-gray-500">Apr 12, 2025</td>
              <td className="py-3 px-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
