import React from 'react'

import { FaChartLine, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
export default function Analytics() {
    const metrics = [
        { icon: <FaDollarSign />, label: 'Revenue', value: '$120,300', color: 'green' },
        { icon: <FaUsers />, label: 'New Users', value: '1,540', color: 'blue' },
        { icon: <FaShoppingCart />, label: 'Orders', value: '3,240', color: 'purple' },
        { icon: <FaChartLine />, label: 'Conversion Rate', value: '8.2%', color: 'orange' }
      ];
    
  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
    {/* Header */}
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Analytics Dashboard</h1>
      <p className="text-sm text-gray-500">Track key performance metrics and growth trends.</p>
    </div>

    {/* Metric Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className={`bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl transition-shadow duration-200`}
        >
          <div className={`text-4xl text-${m.color}-500`}>{m.icon}</div>
          <div>
            <h3 className="text-sm text-gray-500">{m.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{m.value}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Line Chart Placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Over Time</h2>
        <div className="h-64 flex items-center justify-center text-gray-300 border-2 border-dashed rounded-lg">
          [Line Chart Here]
        </div>
      </div>

      {/* Bar Chart Placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
        <div className="h-64 flex items-center justify-center text-gray-300 border-2 border-dashed rounded-lg">
          [Bar Chart Here]
        </div>
      </div>
    </div>
  </div>
  )
}
