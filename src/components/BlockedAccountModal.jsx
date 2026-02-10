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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 z-50">
      <div className="bg-gray-900 rounded-lg max-w-xs w-full shadow-2xl border border-gray-700">
        {/* En-tête */}
        <div className="p-3 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-white" size={16} />
              </div>
              <h2 className="text-base font-bold text-white">Compte bloqué</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-3">
          <div className="mb-3">
            <p className="text-xs text-gray-300 mb-2">
              Bonjour <span className="font-semibold text-white">{user.nom}</span>,
            </p>
            <p className="text-xs text-gray-400">
              Votre compte est actuellement bloqué.
            </p>
          </div>

          {/* Raison du blocage */}
          {user.blockReason && (
            <div className="bg-gray-800 border border-gray-700 rounded-md p-2 mb-3">
              <div className="flex gap-2">
                <Info className="text-red-500 mt-0.5 flex-shrink-0" size={14} />
                <div>
                  <p className="text-xs font-medium text-white mb-0.5">Raison du blocage :</p>
                  <p className="text-xs text-gray-300">{user.blockReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Frais de déblocage */}
          <div className="bg-gray-800 border border-gray-700 rounded-md p-2 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300 font-medium">Frais de déblocage :</span>
              <span className="text-lg font-bold text-white">
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
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xs">Traitement en cours...</span>
              </>
            ) : (
              'Compris'
            )}
          </button>

          {/* Note informative */}
          <p className="text-xs text-gray-500 text-center mt-2">
            Une fois débloqué, vous pourrez accéder à toutes les fonctionnalités.
          </p>
        </div>
      </div>
    </div>
  );
}