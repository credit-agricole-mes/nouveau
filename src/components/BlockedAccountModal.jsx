// components/BlockedAccountModal.jsx

import React, { useState } from 'react';
import { AlertTriangle, X, Info } from 'lucide-react';

export default function BlockedAccountModal({ user, onClose, onUnlock }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUnlock = async () => {
    setIsProcessing(true);
    try {
      await onUnlock();
      // ✅ Ne pas appeler onClose() ici, c'est géré dans onUnlock
    } catch (error) {
      console.error('Erreur lors du déblocage:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user || !user.isBlocked) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-md w-full shadow-2xl border border-gray-700">
        {/* En-tête */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Compte bloqué</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-300 mb-4">
              Bonjour <span className="font-semibold text-white">{user.nom}</span>,
            </p>
            <p className="text-gray-400 mb-2">
              Votre compte est actuellement bloqué.
            </p>
          </div>

          {/* Raison du blocage */}
          {user.blockReason && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <Info className="text-red-500 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Raison du blocage :</p>
                  <p className="text-sm text-gray-300">{user.blockReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Frais de déblocage */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium">Frais de déblocage :</span>
              <span className="text-2xl font-bold text-white">
                {user.unlockFee?.toLocaleString('fr-FR', { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2 
                }) || '0.00'}€
              </span>
            </div>
          </div>

          {/* Bouton d'action */}
          <button
            onClick={handleUnlock}
            disabled={isProcessing}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </>
            ) : (
              'Compris'
            )}
          </button>

          {/* Note informative */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Une fois débloqué, vous pourrez accéder à toutes les fonctionnalités de votre compte.
          </p>
        </div>
      </div>
    </div>
  );
}