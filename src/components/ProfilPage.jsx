import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilPage({ user }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 py-4 px-4 flex items-center border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-white mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white flex-1 text-center">Mes informations</h1>
        <div className="w-6"></div>
      </div>

      {/* Contenu */}
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Photo de profil */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-4xl font-bold text-white">
                {user?.nom?.charAt(0) || 'U'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{user?.nom || 'Utilisateur'}</h2>
            <p className="text-gray-400 text-sm">{user?.email || ''}</p>
          </div>

          {/* Informations personnelles */}
          <div className="space-y-3">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Identifiant</div>
              <div className="text-white font-semibold">{user?.code || 'N/A'}</div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Téléphone</div>
              <div className="text-white font-semibold">{user?.telephone || 'Non renseigné'}</div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Email</div>
              <div className="text-white font-semibold">{user?.email || 'Non renseigné'}</div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Adresse</div>
              <div className="text-white font-semibold">{user?.adresse || 'Non renseignée'}</div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">IBAN</div>
              <div className="text-white font-semibold text-sm break-all">{user?.iban || 'N/A'}</div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">BIC</div>
              <div className="text-white font-semibold">{user?.bic || 'N/A'}</div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Agence</div>
              <div className="text-white font-semibold text-sm">{user?.agence || 'N/A'}</div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-gray-400 text-sm mb-1">Date d'ouverture</div>
              <div className="text-white font-semibold">{user?.dateOuverture || 'N/A'}</div>
            </div>

            {user?.statut && (
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="text-gray-400 text-sm mb-1">Statut du compte</div>
                <div className={`font-semibold ${user.statut === 'actif' ? 'text-green-500' : 'text-red-500'}`}>
                  {user.statut === 'actif' ? 'Actif' : 'Bloqué'}
                </div>
              </div>
            )}
          </div>

          {/* Conseiller */}
          {user?.conseiller && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-white mb-4">Votre conseiller</h3>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Nom</span>
                  <span className="text-white font-semibold">{user.conseiller.nom}</span>
                </div>
                {user.conseiller.telephone && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Téléphone</span>
                    <span className="text-white font-semibold">{user.conseiller.telephone}</span>
                  </div>
                )}
                {user.conseiller.email && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="text-white font-semibold text-sm">{user.conseiller.email}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}