// ==================== SERVICE DE FORMATAGE DEVISE ====================
export const formatCurrency = (montant, devise = "EUR", symbole = "€") => {
  const formattedNumber = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(montant);
  
  // Position du symbole selon la devise
  if (devise === "USD" || devise === "CAD") {
    return `${symbole}${formattedNumber}`; // $1,234.56
  } else {
    return `${formattedNumber} ${symbole}`; // 1 234,56 €
  }
};

// ==================== SERVICE DE STOCKAGE ====================
const StorageService = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(`Key "${key}" not found`);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('LocalStorage set error:', error);
      return false;
    }
  },

  delete(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('LocalStorage delete error:', error);
      return false;
    }
  }
};

// ==================== DONNÉES INITIALES ====================
const initialUsers = [
  {
    code: "26082005",
    motDePasse: "034567",
    nom: "Anna Fioma",
    email: "annafioma0@gmail.com",
    telephone: "+33 7 56 82 06 24",
    adresse: "Rue Laurent Charles maréchal, 57000 Metz",
    solde: 67000.75,
    devise: "EUR",
    symboleDevise: "€",
    numeroCompte: "FR76 3000 4000 0100 0123 4567 890",
    iban: "FR76 3000 4000 0100 0123 4567 890",
    bic: "BNPAFRPPXXX",
    agence: "Agence Metz Opéra - 29 Boulevard des Capucines, 57000 Metz",
    dateOuverture: "07/02/2026",
    statut: "bloque",
    isBlocked: true, // ✅ Ajout pour BlockedAccountModal
    blockReason: "Votre compte a été temporairement suspendu pour vérification de sécurité.", // ✅ Raison du blocage
    unlockFee: 5300, // ✅ Frais de déblocage
    
    transactions: [
      { date: '25/11/2024', libelle: 'Virement Notaire - Succession', debit: '', credit: '1500000.00' },
      { date: '26/11/2024', libelle: 'Virement entrant', debit: '', credit: '250000.00' },
      { date: '27/11/2024', libelle: 'Frais de gestion compte', debit: '45.00', credit: '' },
      { date: '28/11/2024', libelle: 'Achat Bijouterie Cartier', debit: '8500.00', credit: '' },
      { date: '30/11/2024', libelle: 'Restaurant Le Grand Véfour', debit: '320.75', credit: '' }
    ],
    relevesMensuels: [
      { mois: 'décembre', annee: '2024', dateGeneration: '05/12/2024' },
      { mois: 'novembre', annee: '2024', dateGeneration: '01/12/2024' },
      { mois: 'octobre', annee: '2024', dateGeneration: '01/11/2024' }
    ],
    virements: [
      { date: '20/11/2024', beneficiaire: 'EDF', montant: -85.50, statut: 'Effectué' },
      { date: '18/11/2024', beneficiaire: 'Marie Dubois', montant: -200.00, statut: 'Effectué' },
      { date: '15/11/2024', beneficiaire: 'Loyer', montant: -950.00, statut: 'Effectué' },
    ],
    depots: [
      { type: 'Dépôt de chèque', date: '15/11/2024', montant: 1250.00, icon: '📝' },
      { type: 'Dépôt espèces', date: '10/11/2024', montant: 500.00, icon: '💵' },
    ],
    decouvert: [
      { id: 1, date: '05/12/2024', montant: -250, duree: 3, frais: 7.5 },
      { id: 2, date: '28/11/2024', montant: -180, duree: 5, frais: 9.0 },
      { id: 3, date: '15/11/2024', montant: -320, duree: 2, frais: 6.4 },
      { id: 4, date: '01/11/2024', montant: -150, duree: 4, frais: 6.0 },
      { id: 5, date: '20/10/2024', montant: -280, duree: 6, frais: 16.8 },
      { id: 6, date: '05/10/2024', montant: -200, duree: 3, frais: 6.0 }
    ],

    notaire: {
      nom: "MAÎTRE SOPHIE BERNARD",
      prenom: "Sophie",
      titre: "NOTAIRE",
      adresse: "45 Avenue Montaigne",
      ville: "75008 PARIS",
      telephone: "01 42 89 33 44",
      email: "sophie.bernard@notaire-paris.fr"
    }
  },
];

// ==================== USER SERVICE ====================
const DATA_VERSION = 7; // ✅ Incrémenté pour forcer la réinitialisation avec les champs de blocage

const UserService = {
  initializeUsers() {
    const storedVersion = StorageService.get('dataVersion');
    const stored = StorageService.get('bankUsers');
    
    if (storedVersion != DATA_VERSION || !stored) {
      console.log('🔄 Initialisation des données (v' + DATA_VERSION + ')');
      StorageService.set('bankUsers', initialUsers);
      StorageService.set('dataVersion', DATA_VERSION);
      console.log('✅ Données sauvegardées avec localStorage');
      
      StorageService.delete('currentUser');
      console.log('✅ Session effacée - reconnexion requise');
      
      return initialUsers;
    }
    
    return stored;
  },

  verifyLogin(code, motDePasse) {
    const users = StorageService.get('bankUsers');
    
    if (!users) {
      console.error('❌ Aucun utilisateur trouvé dans localStorage');
      return {
        success: false,
        message: "Erreur système - Veuillez rafraîchir la page"
      };
    }
    
    const user = users.find(u => u.code === code);
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé:', code);
      return {
        success: false,
        message: "Identifiant incorrect"
      };
    }
    
    console.log('🔍 Vérification connexion:');
    console.log('Code:', code);
    console.log('Mot de passe stocké:', user.motDePasse, 'Type:', typeof user.motDePasse);
    console.log('Mot de passe saisi:', motDePasse, 'Type:', typeof motDePasse);
    
    if (String(user.motDePasse) !== String(motDePasse)) {
      console.log('❌ Mot de passe incorrect');
      return {
        success: false,
        message: "Mot de passe incorrect"
      };
    }
    
    console.log('✅ Connexion réussie pour:', user.nom);
    return {
      success: true,
      user: { ...user }
    };
  },

  checkCurrentUserValidity() {
    try {
      const currentUser = StorageService.get('currentUser');
      
      if (!currentUser) {
        return { valid: false };
      }

      const users = StorageService.get('bankUsers');
      
      if (!users) {
        StorageService.delete('currentUser');
        return { 
          valid: false, 
          shouldLogout: true,
          message: "Session expirée. Veuillez vous reconnecter."
        };
      }

      const userStillExists = users.find(u => u.code === currentUser.code);

      if (!userStillExists) {
        StorageService.delete('currentUser');
        return { 
          valid: false, 
          shouldLogout: true,
          message: "Votre session a expiré. Veuillez vous reconnecter."
        };
      }

      return { 
        valid: true,
        user: { ...userStillExists }
      };
    } catch (error) {
      console.error('❌ Erreur validation session:', error);
      StorageService.delete('currentUser');
      return { valid: false, shouldLogout: true };
    }
  },

  loginUser(code) {
    const users = StorageService.get('bankUsers');
    
    if (!users) {
      return {
        success: false,
        message: "Erreur système"
      };
    }
    
    const user = users.find(u => u.code === code);
    
    if (user) {
      return {
        success: true,
        user: { ...user }
      };
    }
    
    return {
      success: false,
      message: "Identifiant incorrect"
    };
  },

  getUserByCode(code) {
    const users = StorageService.get('bankUsers');
    return users ? users.find(u => u.code === code) || null : null;
  },

  updateUserBalance(code, newBalance) {
    const users = StorageService.get('bankUsers');
    
    if (!users) return false;
    
    const userIndex = users.findIndex(u => u.code === code);
    
    if (userIndex !== -1) {
      users[userIndex].solde = newBalance;
      StorageService.set('bankUsers', users);
      
      const currentUser = StorageService.get('currentUser');
      if (currentUser && currentUser.code === code) {
        currentUser.solde = newBalance;
        StorageService.set('currentUser', currentUser);
      }
      
      return true;
    }
    
    return false;
  }
};

export default UserService;