import React, { useEffect, useState, useRef } from 'react';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function Products() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState([]);
  const productSectionRef = useRef(null);

  // Base URL for API
  const API_BASE = import.meta.env.VITE_API_BASE;

  // Fetch products based on activeTag and category
  useEffect(() => {
    const fetchProducts = async () => {
      let url = `${API_BASE}/products`; // Default URL for 'All'
      
      // Add category filter if selected
      if (category && category !== 'All') {
        url = `${API_BASE}/products?category=${category}`;
      }
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Fetch Error:', err);
      }
    };

    fetchProducts();
  }, [activeTag, category]); // Re-fetch when activeTag or category changes

  // Handle tab click: set tag + scroll
  const handleTagClick = (tag) => {
    setActiveTag(tag);
    setTimeout(() => {
      productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Add new product
  const handleProductsAdd = (e) => {
    e.preventDefault();
    const { name, category: cat, stock, price, photo } = e.target.elements;
    const productInfo = {
      name: name.value,
      category: cat.value,
      stock: stock.value,
      price: price.value,
      photo: photo.value,
    };

    // Products add section
    fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productInfo),
    })
      .then((res) => res.json())
      .then(() => {
        setShowModal(false);
      })
      .catch((err) => console.error('Add Error:', err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <MdProductionQuantityLimits className="text-3xl text-indigo-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
            <p className="text-sm text-gray-500">Manage your inventory, filter or search products.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <FaPlus /> Add New Product
          </button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex gap-4 flex-wrap">
        {['All', 'Mobile', 'Furniture', 'Electronic'].map((tag, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCategory(tag);
              handleTagClick(tag);
            }}
            className={`px-4 py-1 rounded-full text-sm ${
              activeTag === tag
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Product Table */}
      <div ref={productSectionRef} className="overflow-x-auto bg-white shadow rounded-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, idx) => (
                <tr key={idx} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button className="text-yellow-500 hover:text-yellow-600"><FaEdit /></button>
                    <button className="text-red-500 hover:text-red-600"><FaTrashAlt /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleProductsAdd} className="bg-white w-full max-w-lg p-6 rounded-lg shadow-xl space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="name" placeholder="Product Name" className="px-4 py-2 border rounded" />
              <select name="category" onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 border rounded">
                <option value="">Select Category</option>
                <option value="Mobile">Mobile</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronic">Electronic</option>
              </select>
              <input name="stock" type="number" placeholder="Stock" className="px-4 py-2 border rounded" />
              <input name="price" placeholder="Price" className="px-4 py-2 border rounded" />
              <input name="photo" placeholder="Image URL" onChange={(e) => setImageUrl(e.target.value)} className="px-4 py-2 border rounded col-span-full" />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add Product</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
