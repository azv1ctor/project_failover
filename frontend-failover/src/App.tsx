import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import ServerConfigForm from './components/ServerConfigForm';
import ServerStatusDashboard from './components/ServerStatusDashboard';
import { FiSettings, FiBarChart2 } from 'react-icons/fi';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div>
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div>
                  <NavLink to="/" className="flex items-center py-4 px-2">
                    <span className="text-xl font-bold text-blue-600">MinhaAplicação</span>
                  </NavLink>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? 'py-4 px-2 text-blue-600 border-b-4 border-blue-600 font-semibold'
                        : 'py-4 px-2 text-gray-600 font-semibold hover:text-blue-600 transition duration-300'
                    }
                  >
                    <FiSettings className="inline-block mr-1 mb-1" />
                    Configuração
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? 'py-4 px-2 text-blue-600 border-b-4 border-blue-600 font-semibold'
                        : 'py-4 px-2 text-gray-600 font-semibold hover:text-blue-600 transition duration-300'
                    }
                  >
                    <FiBarChart2 className="inline-block mr-1 mb-1" />
                    Dashboard
                  </NavLink>
                </div>
              </div>
              <div className="md:hidden flex items-center">
                <button
                  className="outline-none mobile-menu-button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    x-show="!isMobileMenuOpen"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <ul className="">
                <li>
                  <NavLink
                    to="/"
                    className="block text-sm px-2 py-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Configuração
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="block text-sm px-2 py-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<ServerConfigForm />} />
          <Route path="/dashboard" element={<ServerStatusDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
