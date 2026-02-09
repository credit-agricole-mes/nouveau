import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserService from "../services/UserService";
import BlockedAccountModal from "./BlockedAccountModal";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [showPasswordPage, setShowPasswordPage] = useState(false);
  const [activeTab, setActiveTab] = useState("carte");
  const [memoriserPack, setMemoriserPack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ État pour le modal de compte bloqué
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [blockedUser, setBlockedUser] = useState(null);

  // ✅ Support du clavier numérique physique
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        if (showPasswordPage) {
          handlePasswordKeyPress(e.key);
        } else {
          handleIdentifiantKeyPress(e.key);
        }
      } else if (e.key === 'Backspace') {
        if (showPasswordPage) {
          handlePasswordBackspace();
        } else {
          handleIdentifiantBackspace();
        }
      } else if (e.key === 'Enter') {
        if (showPasswordPage) {
          if (motDePasse.length === 6 && !isLoading) {
            handlePasswordSubmit();
          }
        } else {
          if (identifiant.length === 8 && !isLoading) {
            handleIdentifiantSubmit();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [identifiant, motDePasse, showPasswordPage, isLoading]);

  const handleIdentifiantSubmit = async () => {
    setError("");
    setIsLoading(true);
    
    if (!identifiant) {
      setError("Veuillez saisir votre identifiant");
      setIsLoading(false);
      return;
    }

    if (identifiant.length !== 8) {
      setError("L'identifiant doit contenir 8 chiffres");
      setIsLoading(false);
      return;
    }

    const result = UserService.loginUser(identifiant);
    
    if (!result.success) {
      setError("Identifiant incorrect");
      setIsLoading(false);
      return;
    }

    console.log('✅ Identifiant validé:', identifiant);
    setShowPasswordPage(true);
    setIsLoading(false);
  };

  const handlePasswordSubmit = async () => {
    setError("");
    setIsLoading(true);
    
    if (!motDePasse) {
      setError("Veuillez saisir votre code");
      setIsLoading(false);
      return;
    }

    if (motDePasse.length !== 6) {
      setError("Le code doit contenir exactement 6 chiffres");
      setIsLoading(false);
      return;
    }

    console.log('🔐 Tentative de connexion...');
    console.log('📝 Identifiant:', identifiant);
    console.log('🔑 Code:', motDePasse);

    const result = UserService.verifyLogin(identifiant, motDePasse);
    
    if (!result.success) {
      console.log('❌ Échec de connexion:', result.message);
      setError(result.message || "Erreur de connexion");
      setIsLoading(false);
      return;
    }

    const userData = result.user;
    console.log('✅ Connexion réussie pour:', userData.nom);
    console.log('💰 Solde:', userData.solde, userData.symboleDevise);
    
    login(userData);
    setIsLoading(false);
    
    // ✅ Vérifier si le compte est bloqué
    if (userData.isBlocked) {
      console.log('⚠️ Compte bloqué - Affichage du modal');
      setBlockedUser(userData);
      setShowBlockedModal(true);
    } else {
      console.log("✅ Redirection vers la page d'accueil");
      navigate('/');
    }
  };

  const handleUnlockAccount = async () => {
    // ✅ Pour l'instant, on ferme juste le modal
    // Plus tard, vous pourrez ajouter la logique de paiement
    console.log('💳 Demande de déblocage pour:', blockedUser?.nom);
    setShowBlockedModal(false);
    navigate('/');
  };

  const handleBackToIdentifiant = () => {
    setShowPasswordPage(false);
    setMotDePasse("");
    setError("");
  };

  const handleIdentifiantKeyPress = (num) => {
    if (identifiant.length < 8) {
      setIdentifiant(prev => prev + num);
      setError("");
    }
  };

  const handleIdentifiantBackspace = () => {
    setIdentifiant(prev => prev.slice(0, -1));
    setError("");
  };

  const handlePasswordKeyPress = (num) => {
    if (motDePasse.length < 6) {
      setMotDePasse(prev => prev + num);
      setError("");
    }
  };

  const handlePasswordBackspace = () => {
    setMotDePasse(prev => prev.slice(0, -1));
    setError("");
  };

  const NumericKeyboard = ({ onKeyPress, onBackspace }) => {
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
                      onBackspace();
                    } else {
                      onKeyPress(key);
                    }
                  }}
                  disabled={isLoading}
                  className="h-16 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold text-3xl text-white active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
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

  const InputBoxes = ({ value, maxLength = 8, showAsPassword = false }) => {
    const boxes = Array(maxLength).fill(null);
    
    return (
      <div className="flex justify-center gap-2 flex-wrap">
        {boxes.map((_, index) => {
          const isNewGroup = index % 4 === 0 && index !== 0;
          
          return (
            <React.Fragment key={index}>
              {isNewGroup && <div className="w-2"></div>}
              <div
                className={`
                  w-12 h-14 bg-gray-700 border-2 rounded flex items-center justify-center text-xl font-bold
                  ${value.length > index 
                    ? 'border-white text-white' 
                    : 'border-gray-600 text-gray-600'}
                  transition-all duration-200
                `}
              >
                {value[index] ? (showAsPassword ? '●' : value[index]) : '#'}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  // ✅ PAGE MOT DE PASSE
  if (showPasswordPage) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex flex-col">
          <div className="py-6 px-4 flex items-center">
            <button
              onClick={handleBackToIdentifiant}
              disabled={isLoading}
              className="text-white mr-4 disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex-1 flex justify-center">
              <img 
                src="/images/logo.jpeg" 
                alt="TransCash" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex-1 px-6 py-8">
            <div className="max-w-md mx-auto">
              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => setActiveTab("carte")}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition ${
                    activeTab === "carte"
                      ? "bg-white text-black"
                      : "bg-gray-800 text-gray-300"
                  }`}
                >
                  Se connecter avec<br/>Numéro de carte
                </button>
                <button
                  onClick={() => setActiveTab("pack")}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition ${
                    activeTab === "pack"
                      ? "bg-white text-black"
                      : "bg-gray-800 text-gray-300"
                  }`}
                >
                  Se connecter avec<br/>Numéro de pack
                </button>
              </div>

              {error && (
                <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-6 text-sm">
                  ⚠️ {error}
                </div>
              )}

              <div className="mb-6">
                <p className="text-center text-gray-400 mb-4 text-sm">
                  Saisissez votre code secret (6 chiffres)
                </p>
                <InputBoxes value={motDePasse} maxLength={6} showAsPassword={true} />
              </div>

              <div className="flex items-center justify-between mb-8 bg-gray-900 p-4 rounded-lg">
                <span className="text-white font-bold uppercase tracking-wide">Mémoriser le pack</span>
                <button
                  onClick={() => setMemoriserPack(!memoriserPack)}
                  disabled={isLoading}
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition ${
                    memoriserPack
                      ? "border-red-600 bg-red-600"
                      : "border-red-600 bg-transparent"
                  }`}
                >
                  {memoriserPack && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>

              <NumericKeyboard
                onKeyPress={handlePasswordKeyPress}
                onBackspace={handlePasswordBackspace}
              />

              <button
                onClick={handlePasswordSubmit}
                disabled={isLoading || motDePasse.length !== 6}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg mt-8 uppercase tracking-wide transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '⏳ Connexion...' : 'Se connecter'}
              </button>
            </div>
          </div>

          <div className="px-6 pb-8">
            <img 
              src="/images/comment-identifier.png" 
              alt="Comment m'identifier ?" 
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </div>
        </div>

        {/* ✅ Modal de compte bloqué */}
        {showBlockedModal && blockedUser && (
          <BlockedAccountModal
            user={blockedUser}
            onClose={() => navigate('/')}
            onUnlock={handleUnlockAccount}
          />
        )}
      </>
    );
  }

  // ✅ PAGE IDENTIFIANT
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="py-6 px-4 text-center">
        <img 
          src="/images/logo.jpeg" 
          alt="TransCash" 
          className="h-12 w-auto object-contain mx-auto"
        />
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveTab("carte")}
              disabled={isLoading}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition ${
                activeTab === "carte"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              Se connecter avec<br/>Numéro de carte
            </button>
            <button
              onClick={() => setActiveTab("pack")}
              disabled={isLoading}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition ${
                activeTab === "pack"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              Se connecter avec<br/>Numéro de pack
            </button>
          </div>

          {error && (
            <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-6 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="mb-6">
            <p className="text-center text-gray-400 mb-4 text-sm">
              Saisissez votre identifiant (8 chiffres)
            </p>
            <InputBoxes value={identifiant} maxLength={8} showAsPassword={false} />
          </div>

          <div className="flex items-center justify-between mb-8 bg-gray-900 p-4 rounded-lg">
            <span className="text-white font-bold uppercase tracking-wide">Mémoriser le pack</span>
            <button
              onClick={() => setMemoriserPack(!memoriserPack)}
              disabled={isLoading}
              className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition ${
                memoriserPack
                  ? "border-red-600 bg-red-600"
                  : "border-red-600 bg-transparent"
              }`}
            >
              {memoriserPack && (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>

          <NumericKeyboard
            onKeyPress={handleIdentifiantKeyPress}
            onBackspace={handleIdentifiantBackspace}
          />

          <button
            onClick={handleIdentifiantSubmit}
            disabled={isLoading || identifiant.length !== 8}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg mt-8 uppercase tracking-wide transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '⏳ Vérification...' : 'Suivant'}
          </button>

          <div className="mt-4 text-center text-xs text-gray-600">
            Identifiant de test : 12345678 | Code : 123456
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <img 
          src="/images/p1.jpeg" 
          alt="Comment m'identifier ?" 
          className="w-full max-w-md mx-auto rounded-lg"
        />
      </div>
    </div>
  );
}