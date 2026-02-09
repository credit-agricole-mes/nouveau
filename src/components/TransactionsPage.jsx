import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // ✅ Import du Header

export default function TransactionsPage({ user }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all', 'debit', 'credit'

  const transactions = user?.transactions || [];

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'debit') return t.debit && t.debit !== '';
    if (filter === 'credit') return t.credit && t.credit !== '';
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ✅ Header avec bouton retour */}
      <Header 
        showBackButton={true}
        title="Transactions"
      />

      {/* Filtres */}
      <div className="px-4 py-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            filter === 'all'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter('debit')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            filter === 'debit'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
        >
          Débits
        </button>
        <button
          onClick={() => setFilter('credit')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            filter === 'credit'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
        >
          Crédits
        </button>
      </div>

      {/* Liste des transactions */}
      <div className="px-4 pb-8">
        {filteredTransactions.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            <p>Aucune transaction</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-4 border border-gray-800"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-white font-medium">{transaction.libelle}</p>
                    <p className="text-gray-400 text-sm mt-1">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    {transaction.debit && transaction.debit !== '' ? (
                      <p className="text-red-500 font-bold text-lg">
                        - {transaction.debit} {user?.symboleDevise || '€'}
                      </p>
                    ) : (
                      <p className="text-green-500 font-bold text-lg">
                        + {transaction.credit} {user?.symboleDevise || '€'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}