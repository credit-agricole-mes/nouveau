import React, { createContext, useContext, useState, useEffect } from 'react';
import UserService from '../services/UserService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier la session au chargement
  useEffect(() => {
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          
          // ✅ Vérifier que l'utilisateur existe toujours et récupérer les données à jour
          const validationResult = UserService.checkCurrentUserValidity();
          
          if (validationResult.valid) {
            console.log('✅ Session valide - Utilisateur connecté:', validationResult.user.nom);
            setUser(validationResult.user);
          } else {
            console.log('❌ Session invalide - Déconnexion');
            localStorage.removeItem('currentUser');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('❌ Erreur lors de la vérification de la session:', error);
        localStorage.removeItem('currentUser');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (userData) => {
    console.log('🔐 Connexion utilisateur:', userData.nom);
    console.log('📊 Solde:', userData.solde, userData.symboleDevise);
    
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    console.log('✅ Utilisateur sauvegardé dans le contexte et localStorage');
  };

  const logout = () => {
    console.log('👋 Déconnexion de:', user?.nom || 'utilisateur inconnu');
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedData) => {
    console.log('🔄 Mise à jour utilisateur:', updatedData);
    
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('currentUser', JSON.stringify(newUserData));
    
    // ✅ Mettre à jour aussi dans bankUsers pour maintenir la cohérence
    const users = JSON.parse(localStorage.getItem('bankUsers') || '[]');
    const userIndex = users.findIndex(u => u.code === newUserData.code);
    
    if (userIndex !== -1) {
      users[userIndex] = newUserData;
      localStorage.setItem('bankUsers', JSON.stringify(users));
      console.log('✅ Données mises à jour dans bankUsers');
    }
  };

  const refreshUser = () => {
    if (!user) return;
    
    // ✅ Récupérer les données fraîches depuis localStorage
    const validationResult = UserService.checkCurrentUserValidity();
    
    if (validationResult.valid) {
      setUser(validationResult.user);
      localStorage.setItem('currentUser', JSON.stringify(validationResult.user));
      console.log('✅ Données utilisateur rafraîchies');
    } else {
      logout();
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    refreshUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider');
  }
  return context;
}

export default AuthContext;