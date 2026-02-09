import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlockedAccountModal from './BlockedAccountModal';

export default function BlockedAccountWrapper({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalClosed, setIsModalClosed] = useState(false);

  // ✅ Si le compte est bloqué, rediriger vers la page d'accueil
  useEffect(() => {
    console.log('📍 Navigation vers:', location.pathname);
    
    if (user?.isBlocked && location.pathname !== '/') {
      console.log('⚠️ Compte bloqué - Redirection vers /');
      navigate('/', { replace: true });
    }
    
    if (user?.isBlocked) {
      console.log('⚠️ Compte bloqué - Réaffichage du modal');
      setIsModalClosed(false); // ✅ Réafficher le modal
    }
  }, [location.pathname, user?.isBlocked, navigate]);

  const handleUnlock = async () => {
    console.log('👆 Clic sur "Compris" - Fermeture du modal sans déblocage');
    
    // ✅ Juste fermer le modal, NE PAS débloquer le compte
    setIsModalClosed(true);
  };

  const handleClose = () => {
    console.log('🚪 Fermeture temporaire du modal via X');
    setIsModalClosed(true); // ✅ Masquer le modal temporairement
  };

  // ✅ Afficher le modal seulement si le compte est bloqué ET qu'il n'a pas été fermé manuellement
  const shouldShowModal = user?.isBlocked && !isModalClosed;

  console.log('🎭 État du modal:', {
    isBlocked: user?.isBlocked,
    isModalClosed,
    shouldShowModal,
    currentPath: location.pathname
  });

  return (
    <>
      {children}
      
      {shouldShowModal && (
        <BlockedAccountModal
          user={user}
          onClose={handleClose}
          onUnlock={handleUnlock}
        />
      )}
    </>
  );
}