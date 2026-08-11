'use client';

import React, { useEffect, useState } from "react";
import { Eye, Trash2, X, Search, ArrowUpRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface TransactionItem {
  id: string;
  recipient?: string;
  account?: string;
  amount?: string | number;
  status?: string;
  date?: string;
  [key: string]: any;
}

export default function Transaction() {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTxn, setSelectedTxn] = useState<TransactionItem | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("transactionData");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          // Array ba single object - duitai handle kora hocche
          const list: TransactionItem[] = Array.isArray(parsed)
            ? parsed
            : [{ id: `TXN${Date.now()}`, ...parsed }];
          
          setTransactions(list);
        } catch (error) {
          console.error("Failed to parse transaction data:", error);
        }
      }
      setLoading(false);
    }
  }, []);

  // Delete Transaction Handler
  const handleDelete = (id: string) => {
    const updated = transactions.filter((item) => item.id !== id);
    setTransactions(updated);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("transactionData", JSON.stringify(updated));
    }
  };

  // Search Filter
  const filteredTransactions = transactions.filter((txn) => {
    const query = searchTerm.toLowerCase();
    return (
      txn.id?.toLowerCase().includes(query) ||
      (txn.recipient && String(txn.recipient).toLowerCase().includes(query)) ||
      (txn.amount && String(txn.amount).toLowerCase().includes(query)) ||
      (txn.status && String(txn.status).toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500 font-medium">
        Loading transaction history...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <ArrowUpRight size={24} />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">No Transactions Found</h3>
        <p className="text-sm text-slate-500">There are no active transaction records in sessionStorage.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-6 p-6 bg-white shadow-sm border border-slate-200/80 rounded-2xl">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Transaction History</h2>
          <p className="text-sm text-slate-500">Manage and view all your recent money transfers</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search transaction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* DataTable */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Recipient / Account</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTransactions.map((txn, index) => {
              const status = txn.status?.toLowerCase() || 'completed';
              return (
                <tr key={txn.id || index} className="hover:bg-slate-50/80 transition-colors">
                  {/* Transaction ID */}
                  <td className="p-4 font-mono font-medium text-blue-600">
                    {txn.id}
                  </td>

                  {/* Recipient */}
                  <td className="p-4 font-medium text-slate-800">
                    {txn.recipient || txn.name || txn.account || "N/A"}
                  </td>

                  {/* Amount */}
                  <td className="p-4 font-semibold text-slate-900">
                    {txn.amount ? `$${txn.amount}` : "N/A"}
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      status === 'completed' || status === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {status === 'completed' || status === 'success' ? <CheckCircle2 size={13} /> : null}
                      {status === 'pending' ? <Clock size={13} /> : null}
                      {status === 'failed' ? <AlertCircle size={13} /> : null}
                      {txn.status || 'Completed'}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      {/* View Button */}
                      <button
                        onClick={() => setSelectedTxn(txn)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(txn.id)}
                        className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Transaction"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-lg">Transaction Details</h3>
              <button
                onClick={() => setSelectedTxn(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
              {Object.entries(selectedTxn).map(([key, value]) => {
                if (typeof value === "object" && value !== null) {
                  return Object.entries(value).map(([subKey, subValue]) => (
                    <div key={`${key}-${subKey}`} className="flex justify-between items-center py-2 border-b border-slate-100 text-sm">
                      <span className="text-slate-500 capitalize font-medium">{key} ({subKey})</span>
                      <span className="text-slate-900 font-semibold">{String(subValue)}</span>
                    </div>
                  ));
                }
                return (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100 text-sm">
                    <span className="text-slate-500 capitalize font-medium">{key}</span>
                    <span className="text-slate-900 font-semibold">{String(value)}</span>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 text-right">
              <button
                onClick={() => setSelectedTxn(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}