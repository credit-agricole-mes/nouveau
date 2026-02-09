import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header"; // ✅ Import du Header

export default function EnvoyerPage({ user }) {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [step, setStep] = useState(1); // 1: destinataire, 2: montant, 3: confirmation
  const [destinataire, setDestinataire] = useState("");
  const [montant, setMontant] = useState("");
  const [success, setSuccess] = useState(false);

  const handleKeyPress = (num) => {
    if (step === 1) {
      if (destinataire.length < 16) {
        setDestinataire(prev => prev + num);
      }
    } else if (step === 2) {
      if (montant.length < 8) {
        setMontant(prev => prev + num);
      }
    }
  };

  const handleBackspace = () => {
    if (step === 1) {
      setDestinataire(prev => prev.slice(0, -1));
    } else if (step === 2) {
      setMontant(prev => prev.slice(0, -1));
    }
  };

  const handleNext = () => {
    if (step === 1 && destinataire.length > 0) {
      setStep(2);
    } else if (step === 2 && montant && parseFloat(montant) > 0) {
      setStep(3);
    }
  };

  const handleConfirm = () => {
    const montantEnvoi = parseFloat(montant);
    
    if (montantEnvoi > user.solde) {
      alert("Solde insuffisant");
      return;
    }

    const nouveauSolde = user.solde - montantEnvoi;
    updateUser({ solde: nouveauSolde });

    // Ajouter la transaction
    const nouvelleTransaction = {
      date: new Date().toLocaleDateString('fr-FR'),
      libelle: `Envoi vers ${destinataire}`,
      debit: montant,
      credit: ''
    };

    const nouvellesTransactions = [nouvelleTransaction, ...(user.transactions || [])];
    updateUser({ transactions: nouvellesTransactions });

    setSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep(step - 1);
    }
  };

  const NumericKeyboard = () => {
    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', '⌫']
    ];

    return (
      <div className="mt-6 px-2">
        <div className="grid grid-cols-3 gap-3">
          {keys.map((row, rowIndex) => (
            row.map((key, keyIndex) => {
              if (key === '') {
                return <div key={`${rowIndex}-${keyIndex}`} className="h-16"></div>;
              }
              return (
                <button
                  key={`${rowIndex}-${keyIndex}`}
                  onClick={() => {
                    if (key === '⌫') {
                      handleBackspace();
                    } else {
                      handleKeyPress(key);
                    }
                  }}
                  className="h-16 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold text-3xl text-white active:scale-95 transition-all duration-150"
                >
                  {key}
                </button>
              );
            })
          ))}
        </div>
      </div>
    );
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Envoi effectué !</h2>
          <p className="text-gray-400">{montant} {user?.symboleDevise || '€'} envoyé à {destinataire}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ✅ Header avec bouton retour */}
      <Header 
        showBackButton={true}
        onBack={handleBack}
        title="Envoyer de l'argent"
      />

      {/* Étape 1: Destinataire */}
      {step === 1 && (
        <div className="px-6 py-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Numéro du destinataire</h2>
            
            <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6 text-center mb-6">
              <div className="text-3xl font-bold text-white tracking-wider">
                {destinataire || "_ _ _ _ _ _ _ _ _ _ _ _"}
              </div>
            </div>

            <NumericKeyboard />

            <button
              onClick={handleNext}
              disabled={!destinataire}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg mt-8 uppercase tracking-wide transition"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Étape 2: Montant */}
      {step === 2 && (
        <div className="px-6 py-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Montant à envoyer</h2>
            <p className="text-gray-400 mb-6">Solde disponible: {user?.solde || 0} {user?.symboleDevise || '€'}</p>
            
            <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6 text-center mb-6">
              <div className="text-5xl font-bold text-white mb-2">
                {montant || "0"} {user?.symboleDevise || '€'}
              </div>
            </div>

            <NumericKeyboard />

            <button
              onClick={handleNext}
              disabled={!montant || parseFloat(montant) <= 0}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg mt-8 uppercase tracking-wide transition"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Étape 3: Confirmation */}
      {step === 3 && (
        <div className="px-6 py-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Confirmer l'envoi</h2>
            
            <div className="bg-gray-900 rounded-xl p-6 mb-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Destinataire</span>
                <span className="text-white font-semibold">{destinataire}</span>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex justify-between">
                <span className="text-gray-400">Montant</span>
                <span className="text-white font-semibold">{montant} {user?.symboleDevise || '€'}</span>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nouveau solde</span>
                <span className="text-white font-semibold">
                  {(user.solde - parseFloat(montant)).toFixed(2)} {user?.symboleDevise || '€'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConfirm}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition"
              >
                Confirmer l'envoi
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}