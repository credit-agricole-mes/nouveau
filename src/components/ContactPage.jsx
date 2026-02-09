import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactPage({ user }) {
  const navigate = useNavigate();
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!sujet || !message) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Simuler l'envoi du message
    setSuccess(true);
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Message envoyé !</h2>
          <p className="text-gray-400">Notre équipe vous répondra dans les plus brefs délais</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 py-4 px-4 flex items-center border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-white mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white flex-1 text-center">Nous contacter</h1>
        <div className="w-6"></div>
      </div>

      {/* Contenu */}
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Informations de contact */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Besoin d'aide ?</h2>
            <p className="text-gray-400 mb-6">
              Notre équipe est disponible 24h/24 et 7j/7 pour répondre à vos questions.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center ">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Téléphone</div>
                  <div className="text-white font-semibold">+33 7 74 43 80 78</div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center ">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white font-semibold">support@transcash.fr</div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center ">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Chat en direct</div>
                  <div className="text-white font-semibold">Disponible 24/7</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Envoyer un message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Sujet
                </label>
                <select
                  value={sujet}
                  onChange={(e) => setSujet(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="compte">Problème de compte</option>
                  <option value="transaction">Question sur une transaction</option>
                  <option value="carte">Problème de carte</option>
                  <option value="technique">Problème technique</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Décrivez votre problème ou votre question..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          {/* FAQ rapide */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Questions fréquentes</h3>
            
            <div className="space-y-2">
              <button className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 text-left p-4 rounded-xl transition">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Comment recharger mon compte ?</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 text-left p-4 rounded-xl transition">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Quels sont les frais de transaction ?</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 text-left p-4 rounded-xl transition">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Comment sécuriser mon compte ?</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}