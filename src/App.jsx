import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import UserService from './services/UserService';
import LoginPage from './components/LoginPage';
import ActionGrid  from './components/ActionGrid';
import TransactionsPage from './components/TransactionsPage';
import RechargePage from './components/RechargePage';
import EnvoyerPage from './components/EnvoyerPage';
import ProfilPage from './components/ProfilPage';
import CartesPage from './components/CartesPage';
import ContactPage from './components/ContactPage';
import BlockedAccountWrapper from './components/BlockedAccountWrapper';

// ✅ Composant de protection des routes
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    console.log('🚀 Initialisation de l\'application...');
    UserService.initializeUsers();
  }, []);

  const handleLogout = () => {
    logout();
    console.log('👋 Déconnexion effectuée');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Route de connexion */}
        <Route 
          path="/login" 
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage />
            )
          } 
        />

        {/* Route d'accueil (page principale après connexion) */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <BlockedAccountWrapper>
                <ActionGrid user={user} onLogout={handleLogout} />
              </BlockedAccountWrapper>
            </ProtectedRoute>
          } 
        />

        {/* ✅ Route RECHARGE - SANS BlockedAccountWrapper */}
        <Route 
          path="/recharge" 
          element={
            <ProtectedRoute>
              <RechargePage user={user} />
            </ProtectedRoute>
          } 
        />
        
        {/* Routes avec blocage */}
        <Route 
          path="/transactions" 
          element={
            <ProtectedRoute>
              <BlockedAccountWrapper>
                <TransactionsPage user={user} />
              </BlockedAccountWrapper>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/envoyer" 
          element={
            <ProtectedRoute>
              <BlockedAccountWrapper>
                <EnvoyerPage user={user} />
              </BlockedAccountWrapper>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profil" 
          element={
            <ProtectedRoute>
              <ProfilPage user={user} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/cartes" 
          element={
            <ProtectedRoute>
              <BlockedAccountWrapper>
                <CartesPage user={user} />
              </BlockedAccountWrapper>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/contact" 
          element={
            <ProtectedRoute>
              <ContactPage user={user} />
            </ProtectedRoute>
          } 
        />

        {/* Route par défaut - redirige vers login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;