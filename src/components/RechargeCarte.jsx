import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";

export default function RechargeCarte() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    amount: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predefinedAmounts = [50, 100, 200, 500];

  const handleAmountSelect = (amount) => {
    setFormData({ ...formData, amount: amount.toString() });
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = formatCardNumber(value.replace(/\s/g, '').slice(0, 16));
      setFormData({ ...formData, [name]: formatted });
    } else if (name === 'expiryDate') {
      const formatted = formatExpiryDate(value);
      setFormData({ ...formData, [name]: formatted });
    } else if (name === 'cvv') {
      setFormData({ ...formData, [name]: value.slice(0, 3) });
    } else if (name === 'amount') {
      // Permettre uniquement les chiffres
      const numericValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.amount || parseFloat(formData.amount) < 10) {
      setError("Le montant minimum est de 10€");
      return;
    }

    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      setError("Numéro de carte invalide");
      return;
    }

    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      setError("Date d'expiration invalide");
      return;
    }

    if (formData.cvv.length !== 3) {
      setError("CVV invalide");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implémenter l'API de paiement
      console.log("Recharge par carte:", formData);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // navigate('/recharge/success');
      
    } catch (err) {
      setError("Erreur lors du paiement. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header 
        showBackButton={true}
        title="Carte Bancaire"
      />

      {/* Banner */}
      <div className="bg-blue-600 to-cyan-600 py-8 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-wide">CARTE BANCAIRE</h1>
      </div>

      {/* Formulaire */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Montant */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Montant à recharger
              </label>
              
              {/* Montants prédéfinis */}
              <div className="grid grid-cols-4 gap-3 mb-3">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 rounded-lg font-bold transition-all ${
                      formData.amount === amount.toString()
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {amount}€
                  </button>
                ))}
              </div>

              {/* Montant personnalisé */}
              <div className="relative">
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Ou montant personnalisé"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
              </div>
            </div>

            {/* Informations carte */}
            <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold mb-4">Informations de paiement</h3>
              
              {/* Numéro de carte */}
              <div>
                <label className="block text-xs text-gray-400 mb-2">Numéro de carte</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white tracking-wider focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Nom sur la carte */}
              <div>
                <label className="block text-xs text-gray-400 mb-2">Nom sur la carte</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="JEAN DUPONT"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white uppercase focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Date expiration & CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Date d'expiration</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-xl p-4">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Sécurité */}
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-green-400 text-xs">
                Paiement 100% sécurisé et crypté
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl py-4 font-bold text-lg transition-all active:scale-95"
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
                `Payer ${formData.amount || '0'}€`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}