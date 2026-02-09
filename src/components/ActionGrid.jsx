import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // ✅ Import du Header

export default function HomePage({ user, onLogout }) {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Simuler plusieurs cartes (vous pouvez adapter selon vos données)
  const cards = [
    {
      numero: "9402",
      type: "Carte physique",
      solde: user?.solde || 0.59,
      devise: user?.symboleDevise || "€",
      activated: true
    }
  ];

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ✅ Header avec le composant réutilisable */}
      <Header 
        showPowerButton={true}
        onPower={onLogout}
      />

      {/* ✅ Contenu avec padding-top pour compenser le header fixe */}
      <div className="pt-16">
        {/* Carrousel de cartes */}
        <div className="relative py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 px-4">
            {/* Flèche gauche - cachée sur mobile si une seule carte */}
            <button 
              onClick={handlePrevCard}
              className={`text-white ${cards.length <= 1 ? 'hidden' : 'hidden md:block'}`}
              disabled={cards.length <= 1}
            >
              <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* ✅ Container flexible qui s'adapte selon l'écran */}
            <div className="flex flex-col items-center gap-4 w-full md:w-auto md:flex-row">
              {/* Carte */}
              <div className="relative w-full max-w-xs sm:w-56">
                <img 
                  src="/images/p2.jpeg" 
                  alt="Bloquée" 
                  className="w-full h-auto"
                />
                
                {/* Badge BLOQUÉE */}
                <div className="absolute -top-3 left-4 bg-red-600 text-white px-3 md:px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  BLOQUÉE
                </div>     
              </div>

              {/* Info carte - maintenant en colonne sur mobile aussi */}
              <div className="flex flex-col gap-3 w-full max-w-xs sm:w-auto">
                <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 md:px-4 py-2 text-center">
                  <div className="text-xs text-gray-400 mb-1">Carte noire</div>
                  <div className="text-red-500 font-bold text-base md:text-lg">{currentCard.numero}</div>
                  <div className="text-xs text-gray-300">{currentCard.type}</div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 md:px-4 py-2 md:py-3 text-center">
                  <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Solde</div>
                  <div className="text-white font-bold text-xl md:text-2xl">{currentCard.solde}{currentCard.devise}</div>
                </div>
              </div>
            </div>

            {/* Flèche droite - cachée sur mobile si une seule carte */}
            <button 
              onClick={handleNextCard}
              className={`text-white ${cards.length <= 1 ? 'hidden' : 'hidden md:block'}`}
              disabled={cards.length <= 1}
            >
              <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Section Pack et Plafonds */}
        <div className="px-4 py-4 md:py-6 bg-gray-900 mx-4 rounded-xl">
          <div className="flex items-start gap-3 mb-3">
            <svg className="w-5 h-5 text-white mt-1 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm md:text-base mb-1">
                Pack 5059 5941 - Formule MAX{" "}
                <button className="inline-block">
                  <svg className="w-4 h-4 text-gray-400 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              </h3>
              <p className="text-gray-300 text-xs md:text-sm mb-2">
                Vous pouvez encore charger{" "}
                <span className="text-blue-400 font-bold">5000€</span> aujourd'hui{" "}
                <span className="text-gray-400">(10 000€ par mois)</span>.
              </p>

              {/* Barre de progression */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-white rounded-full h-2" style={{width: '50%'}}></div>
              </div>

              <p className="text-xs md:text-sm mb-3">
                <span className="text-blue-400 font-bold">5</span> chargements sur les{" "}
                <span className="text-blue-400 font-bold">5</span> autorisés aujourd'hui.
              </p>

              <button className="bg-red-600 hover:bg-red-700 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition w-full sm:w-auto">
                Détail de mes plafonds
              </button>
            </div>
          </div>
        </div>

        {/* Grille de boutons d'action */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 px-4 py-6 md:py-8 max-w-6xl mx-auto">
          {/* RECHARGER */}
          <button 
            onClick={() => navigate("/recharge")}
            className="bg-red-600 hover:bg-red-700 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 transition active:scale-95"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-600 text-2xl md:text-4xl font-bold">€</span>
            </div>
            <span className="text-white font-bold text-sm md:text-lg uppercase tracking-wide text-center">Recharger</span>
          </button>

          {/* TRANSACTIONS */}
          <button 
            onClick={() => navigate("/transactions")}
            className="bg-red-600 hover:bg-red-700 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 transition active:scale-95"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm md:text-lg uppercase tracking-wide text-center">Transactions</span>
          </button>

          {/* ENVOYER */}
          <button 
            onClick={() => navigate("/envoyer")}
            className="bg-red-600 hover:bg-red-700 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 transition active:scale-95"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm md:text-lg uppercase tracking-wide text-center">Envoyer</span>
          </button>

          {/* MES INFORMATIONS */}
          <button 
            onClick={() => navigate("/profil")}
            className="bg-red-600 hover:bg-red-700 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 transition active:scale-95"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm md:text-lg uppercase tracking-wide text-center">Mes informations</span>
          </button>

          {/* MES CARTES */}
          <button 
            onClick={() => navigate("/cartes")}
            className="bg-red-600 hover:bg-red-700 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 transition active:scale-95"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm md:text-lg uppercase tracking-wide text-center">Mes cartes</span>
          </button>

          {/* NOUS CONTACTER */}
          <button 
            onClick={() => navigate("/contact")}
            className="bg-red-600 hover:bg-red-700 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 transition active:scale-95"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm md:text-lg uppercase tracking-wide text-center">Nous contacter</span>
          </button>
        </div>
      </div>
    </div>
  );
}