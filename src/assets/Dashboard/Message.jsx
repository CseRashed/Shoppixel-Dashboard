import React, { useState } from 'react';
import { FaPaperPlane, FaSearch, FaStar, FaRegStar, FaTrashAlt } from 'react-icons/fa';

export default function Messages() {
  // initial dummy data
  const initial = [
    { id: 1, from: 'John Doe', subject: 'Order Update', body: 'Your order #1234 is shipped.', date: 'Apr 22, 2025', unread: true, starred: true },
    { id: 2, from: 'Jane Smith', subject: 'Promo Offer', body: 'Get 20% off on your next purchase.', date: 'Apr 20, 2025', unread: false, starred: false },
    { id: 3, from: 'Support', subject: 'Account Info', body: 'Your account details updated.', date: 'Apr 18, 2025', unread: true, starred: false },
  ];

  const [messages, setMessages] = useState(initial);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ to: '', subject: '', body: '' });

  // derived counts
  const unreadCount = messages.filter(m => m.unread).length;
  const starredCount = messages.filter(m => m.starred).length;
  const totalCount = messages.length;

  // handle search and filter
  const visible = messages.filter(m => {
    if (filter === 'Unread' && !m.unread) return false;
    if (filter === 'Starred' && !m.starred) return false;
    const term = search.toLowerCase();
    return m.from.toLowerCase().includes(term) || m.subject.toLowerCase().includes(term);
  });

  const handleSend = () => {
    const next = { id: Date.now(), from: form.to, subject: form.subject, body: form.body, date: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }), unread: false, starred: false };
    setMessages([next, ...messages]);
    setShowModal(false);
    setForm({ to: '', subject: '', body: '' });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 space-y-8">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Messages</h1>
        <div className="flex space-x-4">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <span className="text-xl font-bold text-gray-700">{unreadCount}</span>
            <span className="text-gray-500 text-sm">Unread</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <span className="text-xl font-bold text-gray-700">{starredCount}</span>
            <span className="text-gray-500 text-sm">Starred</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <span className="text-xl font-bold text-gray-700">{totalCount}</span>
            <span className="text-gray-500 text-sm">Total</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          {['All','Unread','Starred'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter===f? 'bg-indigo-600 text-white':'bg-gray-200 text-gray-700 hover:bg-indigo-100'}`}
            >{f}</button>
          ))}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
        >
          <FaPaperPlane /> New Message
        </button>
      </div>

      {/* Messages Table */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">From</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Star</th>
              <th className="py-3 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(m => (
              <tr key={m.id} className="border-b hover:bg-indigo-50">
                <td className="py-3 px-4 font-medium text-gray-800">{m.from}</td>
                <td className="py-3 px-4 text-gray-700">{m.subject}</td>
                <td className="py-3 px-4 text-gray-500">{m.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${m.unread? 'bg-red-100 text-red-700':'bg-green-100 text-green-700'}`}>{m.unread? 'Unread':'Read'}</span>
                </td>
                <td className="py-3 px-4">
                  <button onClick={()=>{ /* toggle logic */ }}>
                    {m.starred? <FaStar className="text-yellow-500"/>:<FaRegStar className="text-gray-400"/>}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button onClick={()=> setMessages(msgs=>msgs.filter(x=>x.id!==m.id))} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Compose Message */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-xl space-y-4">
            <h2 className="text-xl font-semibold">Compose Message</h2>
            <input
              type="text"
              placeholder="To"
              value={form.to}
              onChange={e=>setForm({...form,to:e.target.value})}
              className="w-full px-4 py-2 border rounded"/>
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={e=>setForm({...form,subject:e.target.value})}
              className="w-full px-4 py-2 border rounded"/>
            <textarea
              placeholder="Message body"
              value={form.body}
              onChange={e=>setForm({...form,body:e.target.value})}
              className="w-full px-4 py-2 border rounded h-32"/>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button onClick={handleSend} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
