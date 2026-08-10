'use client';

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  CreditCard, 
  Edit3, 
  LogOut, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  // মক ইউজার ডেটা
  const user = {
    name: 'Mohammad Abdullah',
    email: 'abdullah@example.com',
    phone: '+880 1712-345678',
    location: 'Dhaka, Bangladesh',
    joined: 'September 2025',
    accountType: 'Verified Individual',
    totalTransferred: '$12,450.00',
    totalTransactions: 28,
  };

  const recentActivities = [
    { id: 'TXN10928', recipient: 'Anamaul Islam', amount: '$450.00', status: 'Completed', date: '10 Aug, 2026' },
    { id: 'TXN10927', recipient: 'Rana Ahmed', amount: '$1,200.00', status: 'Completed', date: '02 Aug, 2026' },
    { id: 'TXN10925', recipient: 'Sarah Jenkins', amount: '$300.00', status: 'Pending', date: '28 Jul, 2026' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* --- PROFILE HEADER CARD --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

          {/* User Info Section */}
          <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-3 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
              <div className="relative">
                <div className="w-28 h-28 rounded-full border-4 border-white bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-md">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full" title="Active Now"></span>
              </div>
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> {user.accountType}
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-gray-100 bg-gray-50/50 p-4 text-center divide-x divide-gray-200">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Total Transferred</p>
              <p className="text-lg font-bold text-gray-800 mt-1">{user.totalTransferred}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Transactions</p>
              <p className="text-lg font-bold text-gray-800 mt-1">{user.totalTransactions}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Member Since</p>
              <p className="text-lg font-bold text-gray-800 mt-1">{user.joined}</p>
            </div>
          </div>
        </div>

        {/* --- TABS & MAIN CONTENT --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 gap-6 mb-6">
            {['overview', 'activity', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize transition-colors relative ${
                  activeTab === tab
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-sm font-medium text-gray-800">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-sm font-medium text-gray-800">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-800">{user.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Joined Date</p>
                    <p className="text-sm font-medium text-gray-800">{user.joined}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RECENT ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Transfers</h3>
              <div className="divide-y divide-gray-100">
                {recentActivities.map((act) => (
                  <div key={act.id} className="py-3 flex items-center justify-between hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{act.recipient}</p>
                        <p className="text-xs text-gray-400">{act.id} • {act.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-800">{act.amount}</p>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                        act.status === 'Completed' ? 'text-green-600' : 'text-amber-500'
                      }`}>
                        {act.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {act.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
              <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Password</p>
                  <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                </div>
                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50">
                  Change Password
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Two-Factor Authentication (2FA)</p>
                  <p className="text-xs text-gray-500">Secure your account with SMS or Authenticator App</p>
                </div>
                <button className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-medium rounded-lg">
                  Enabled
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- LOGOUT BUTTON --- */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
            <LogOut className="w-4 h-4" /> Log out of Account
          </button>
        </div>

      </div>
    </div>
  );
}