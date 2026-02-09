import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";

export default function RechargeVirement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copiedField, setCopiedField] = useState(null);

  // Informations bancaires pour le virement
  const bankDetails = {
    beneficiaire: "CARTE NOIRE SAS",
    iban: "FR76 1234 5678 9012 3456 7890 123",
    bic: "BNPAFRPPXXX",
    banque: "BNP Paribas",
    reference: user?.id ? `RECHARGE-${user.id}` : "RECHARGE-XXXXXX"
  };

  const handleCopy = (field, value) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const InfoRow = ({ label, value, field }) => (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="text-xs text-gray-400 mb-2">{label}</div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-white font-mono text-sm break-all">{value}</div>
        <button
          onClick={() => handleCopy(field, value)}
          className=" bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition-colors"
        >
          {copiedField === field ? (
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header 
        showBackButton={true}
        title="Virement Bancaire"
      />

      {/* Banner */}
      <div className="bg-green-600 to-emerald-600 py-8 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl font-bold text-green-600">€</span>
        </div>
        <h1 className="text-2xl font-bold tracking-wide">VIREMENT BANCAIRE</h1>
      </div>

      {/* Contenu */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Instructions */}
          <div className="bg-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Comment effectuer un virement ?
            </h2>
            <ol className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-3">
                <span className=" w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Copiez les coordonnées bancaires ci-dessous</span>
              </li>
              <li className="flex gap-3">
                <span className=" w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Effectuez un virement depuis votre banque</span>
              </li>
              <li className="flex gap-3">
                <span className=" w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>N'oubliez pas d'indiquer la référence dans le libellé</span>
              </li>
              <li className="flex gap-3">
                <span className=" w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Votre compte sera crédité sous 1 à 3 jours ouvrés</span>
              </li>
            </ol>
          </div>

          {/* Coordonnées bancaires */}
          <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold mb-4">Coordonnées bancaires</h2>
            
            <InfoRow 
              label="Bénéficiaire"
              value={bankDetails.beneficiaire}
              field="beneficiaire"
            />

            <InfoRow 
              label="IBAN"
              value={bankDetails.iban}
              field="iban"
            />

            <InfoRow 
              label="BIC/SWIFT"
              value={bankDetails.bic}
              field="bic"
            />

            <InfoRow 
              label="Banque"
              value={bankDetails.banque}
              field="banque"
            />

            <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-4">
              <div className="text-xs text-yellow-400 mb-2 font-bold">⚠️ RÉFÉRENCE OBLIGATOIRE</div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-yellow-300 font-mono text-sm font-bold">{bankDetails.reference}</div>
                <button
                  onClick={() => handleCopy('reference', bankDetails.reference)}
                  className=" bg-yellow-600 hover:bg-yellow-700 rounded-lg p-2 transition-colors"
                >
                  {copiedField === 'reference' ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Avertissements */}
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-blue-400  mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-blue-400 text-sm font-bold mb-1">Délai de traitement</p>
                  <p className="text-blue-300 text-xs">Le crédit de votre compte intervient généralement sous 1 à 3 jours ouvrés après réception du virement.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-red-400 text-sm font-bold mb-1">Important</p>
                  <p className="text-red-300 text-xs">Sans la référence correcte, votre virement ne pourra pas être identifié et le traitement sera retardé.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bouton retour */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-800 hover:bg-gray-700 rounded-xl py-4 font-bold transition-all active:scale-95"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  );
}