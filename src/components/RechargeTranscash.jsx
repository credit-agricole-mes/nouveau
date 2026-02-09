import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";

export default function RechargeTranscash() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Veuillez entrer un code Transcash");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implémenter l'API de recharge Transcash
      console.log("Recharge Transcash avec code:", code);
      
      // Simulation d'un délai
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Rediriger vers la page de succès ou le dashboard
      // navigate('/recharge/success');
      
    } catch (err) {
      setError("Erreur lors de la recharge. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header 
        showBackButton={true}
        title="Recharge Transcash"
      />

      {/* Banner */}
      <div className="bg-purple-600 to-blue-600 py-8 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-wide">RECHARGE TRANSCASH</h1>
      </div>

      {/* Formulaire */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Info */}
          <div className="bg-gray-800 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-3">Comment ça marche ?</h2>
            <ol className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-3">
                <span className="font-bold text-purple-400">1.</span>
                <span>Achetez un code Transcash dans un point de vente agréé</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-400">2.</span>
                <span>Grattez pour révéler votre code à 16 chiffres</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-400">3.</span>
                <span>Entrez le code ci-dessous pour recharger votre carte</span>
              </li>
            </ol>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Code Transcash (16 chiffres)
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\s/g, ''))}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={16}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-4 text-white text-center text-lg tracking-widest focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-xl p-4">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full bg-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl py-4 font-bold text-lg transition-all active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement en cours...
                </span>
              ) : (
                "Valider la recharge"
              )}
            </button>
          </form>

          {/* Avertissement */}
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-400 text-xs text-center">
              ⚠️ Vérifiez bien votre code avant validation. Les codes invalides ne peuvent pas être remboursés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}