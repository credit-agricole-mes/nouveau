import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // ✅ Import du Header

export default function CartesPage({ user }) {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ✅ Header avec bouton retour */}
      <Header 
        showBackButton={true}
        title="Mes cartes"
      />

      {/* Contenu */}
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Carte principale */}
          <div className="mb-8">
            <div className="relative w-full h-48 bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-700 shadow-2xl p-6">
              {/* Badge ACTIVÉE */}
              <div className="absolute -top-3 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                ACTIVÉE
              </div>

              {/* Puce */}
              <div className="absolute top-12 left-6 w-14 h-11 bg-yellow-500 rounded-md">
                <div className="w-full h-full grid grid-cols-3 gap-px p-1">
                  {Array(9).fill(0).map((_, i) => (
                    <div key={i} className="bg-yellow-600 rounded-sm"></div>
                  ))}
                </div>
              </div>

              {/* Numéro de carte (masqué) */}
              <div className="absolute bottom-16 left-6 right-6">
                <div className="text-xl font-mono tracking-wider text-white">
                  {showDetails ? user?.numeroCompte?.substring(0, 19) : "**** **** **** 9401"}
                </div>
              </div>

              {/* Nom et date */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                <div>
                  <div className="text-xs text-gray-400">TITULAIRE</div>
                  <div className="text-sm font-semibold text-white">{user?.nom}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">EXPIRE FIN</div>
                  <div className="text-sm font-semibold text-white">12/28</div>
                </div>
              </div>

              {/* Logo Mastercard */}
              <div className="absolute bottom-6 right-6 flex gap-1">
                <div className="w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
                <div className="w-8 h-8 bg-orange-400 rounded-full opacity-80 -ml-4"></div>
              </div>

              {/* Texte transcash vertical */}
              <div className="absolute right-3 top-8 text-xs text-gray-500 font-mono transform rotate-90 origin-top-right">
                transcash
              </div>
            </div>

            {/* Bouton afficher/masquer */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              {showDetails ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  Masquer les détails
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Afficher les détails
                </>
              )}
            </button>
          </div>

          {/* Actions sur la carte */}
          <div className="space-y-3">
            <button className="w-full bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Bloquer temporairement</span>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Gérer les plafonds</span>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Historique des opérations</span>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Signaler une carte perdue ou volée
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}