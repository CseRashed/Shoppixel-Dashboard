import React, { useState, useEffect } from 'react';
import { MdOutlineInventory } from 'react-icons/md';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [products, setProducts] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || product.category === categoryFilter)
  );

  const totalProducts = products.length;
  const outOfStock = products.filter(p => parseInt(p.stock) === 0).length;
  const lowStock = products.filter(p => parseInt(p.stock) > 0 && parseInt(p.stock) < 10).length;
  const newArrivals = products.filter(p => p.createdAt || false).length; // adjust this based on real logic

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <MdOutlineInventory className="text-4xl text-green-700" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Inventory Dashboard</h1>
          <p className="text-base text-gray-600">Visualize and monitor your entire product stock in real-time.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Products', value: totalProducts, icon: <FaArrowUp className="text-green-500" />, color: 'from-green-200 to-green-100' },
          { label: 'Out of Stock', value: outOfStock, icon: <FaArrowDown className="text-red-500" />, color: 'from-red-200 to-red-100' },
          { label: 'Low Stock', value: lowStock, icon: <FaArrowDown className="text-yellow-500" />, color: 'from-yellow-200 to-yellow-100' },
          { label: 'New Arrivals', value: newArrivals, icon: <FaArrowUp className="text-blue-500" />, color: 'from-blue-200 to-blue-100' },
        ].map((item, index) => (
          <div key={index} className={`bg-gradient-to-br ${item.color} p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 space-y-3`}>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-semibold">{item.label}</p>
              {item.icon}
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shadow-lg p-4 rounded-xl">
        <input
          type="text"
          placeholder="Search Product..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <option value="All">All</option>
          <option value="Electronic">Electronic</option>
          <option value="Furniture">Furniture</option>
          <option value="Mobile">Mobile</option>
        </select>
        <button className="w-full md:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition-all duration-200">
          Restock Products
        </button>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-700 bg-gradient-to-r from-indigo-100 to-purple-100 border-b">
            <tr>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, idx) => {
              const stock = parseInt(product.stock);
              const status =
                stock === 0
                  ? { label: 'Out of Stock', color: 'bg-red-100 text-red-600' }
                  : stock < 10
                  ? { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' }
                  : { label: 'In Stock', color: 'bg-green-100 text-green-700' };

              return (
                <tr key={product._id} className="border-b hover:bg-purple-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>
                  <td className="py-3 px-4 text-gray-700">{product.category}</td>
                  <td className="py-3 px-4">{stock}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">Apr 23, 2025</td> {/* You can make this dynamic if needed */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
