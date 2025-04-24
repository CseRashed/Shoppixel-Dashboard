import React, { useState } from 'react';
import { FaRegSun, FaRegMoon, FaCog, FaBell, FaSave, FaUser, FaLock, FaEnvelope, FaCheckCircle, FaLanguage, FaEyeSlash, FaEye } from 'react-icons/fa';
import { FiSearch, FiSettings } from 'react-icons/fi';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(true);
  const [email, setEmail] = useState(true);
  const [language, setLanguage] = useState('English');
  const [profilePublic, setProfilePublic] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotification(!notification);
  const toggleEmail = () => setEmail(!email);
  const toggleProfilePublic = () => setProfilePublic(!profilePublic);
  const toggleDataCollection = () => setDataCollection(!dataCollection);
  const toggleAdvancedModal = () => setShowAdvancedModal(!showAdvancedModal);
  const toggleAppsModal = () => setShowAppsModal(!showAppsModal);

  const connectedApps = [
    { name: 'Google', connected: true },
    { name: 'GitHub', connected: false }
  ];

  return (
    <div className={`p-6 min-h-screen space-y-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FaCog className="text-4xl text-indigo-500 animate-pulse" />
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Settings
            </h1>
            <p className="text-gray-600">Configure your account preferences and settings.</p>
          </div>
        </div>
        <button
          onClick={() => alert('Settings saved!')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-lg transition transform hover:scale-105"
        >
          <FaSave /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-lg shadow-xl space-y-4 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaRegSun className="text-yellow-500" /> Theme
          </h2>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            {darkMode ? <FaRegSun /> : <FaRegMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="bg-gradient-to-br from-red-100 to-red-50 p-6 rounded-lg shadow-xl space-y-4 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaBell className="text-red-500" /> Notifications
          </h2>
          <button
            onClick={toggleNotifications}
            className={`px-4 py-2 rounded-md text-white ${notification ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {notification ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-lg shadow-xl space-y-4 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaEnvelope className="text-purple-500" /> Email
          </h2>
          <button
            onClick={toggleEmail}
            className={`px-4 py-2 rounded-md text-white ${email ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {email ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-lg shadow-xl space-y-4 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaLanguage className="text-blue-600" /> Language
          </h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-6 rounded-lg shadow-xl space-y-4 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaEyeSlash className="text-yellow-600" /> Privacy
          </h2>
          <div className="flex justify-between items-center">
            <p>Public Profile</p>
            <button
              onClick={toggleProfilePublic}
              className={`px-4 py-2 rounded-md text-white ${profilePublic ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {profilePublic ? 'Visible' : 'Hidden'}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>Data Collection</p>
            <button
              onClick={toggleDataCollection}
              className={`px-4 py-2 rounded-md text-white ${dataCollection ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {dataCollection ? 'Allowed' : 'Blocked'}
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-6 rounded-lg shadow-xl space-y-4 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaLock className="text-teal-600" /> Connected Apps
          </h2>
          <button
            onClick={toggleAppsModal}
            className="px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 transition"
          >
            Manage Apps
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl space-y-4 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaUser className="text-indigo-600" /> Account
          </h2>
          <div className="flex gap-4 items-center">
            <FaUser />
            <input type="text" placeholder="Username" className="p-2 w-full rounded-md border" />
          </div>
          <div className="flex gap-4 items-center">
            <FaLock />
            <input type="password" placeholder="Password" className="p-2 w-full rounded-md border" />
          </div>
        </div>

        {/* Logout */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-6 rounded-lg shadow-xl space-y-4 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-red-600">
            <FaLock /> Logout
          </h2>
          <p className="text-sm text-gray-500">Sign out of your account safely and securely.</p>
          <button
            onClick={() => alert('Logged out!')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {showAdvancedModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-2xl font-semibold">Advanced Settings</h3>
            <div className="space-y-3">
              <button className="w-full flex justify-between items-center px-4 py-2 border rounded-md hover:bg-gray-100">
                <FaCheckCircle /> Enable Auto Backups
              </button>
              <button className="w-full flex justify-between items-center px-4 py-2 border rounded-md hover:bg-gray-100">
                <FaCheckCircle /> Enable Two-Factor Auth
              </button>
            </div>
            <div className="flex justify-end">
              <button onClick={toggleAdvancedModal} className="px-4 py-2 bg-red-600 text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAppsModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <h3 className="text-2xl font-semibold">Connected Apps</h3>
            {connectedApps.map((app, idx) => (
              <div key={idx} className="flex justify-between items-center px-4 py-2 border rounded-md">
                <p>{app.name}</p>
                <button
                  className={`px-3 py-1 rounded-md text-white ${app.connected ? 'bg-red-500' : 'bg-green-500'}`}
                >
                  {app.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <button onClick={toggleAppsModal} className="px-4 py-2 bg-red-600 text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-10">
        <p className="text-sm text-gray-500">Settings Panel © 2025</p>
      </div>
    </div>
  );
}
