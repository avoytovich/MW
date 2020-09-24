const forms = {
  headers: {
    signIn: 'Se connecter',
  },
  text: {
    dontHaveAccount: "Je n'ai pas de compte",
    signInSso: 'Connectez-vous avec SSO',
    loginWithEmailAddress: 'ou connectez-vous avec une adresse e-mail',
    forgotPassword: 'Mot de passe oublié',
  },
  inputs: {
    username: "Nom d'utilisateur",
    password: 'Mot de passe',
    email: 'Adresse e-mail',
    createPassword: 'Mot de passe',
    confirmPassword: 'Confirmez le mot de passe',
    productName: 'Nom du produit',
    publisherRefId: "ID de référence de l'éditeur",
    type: 'Type',
    sellingStores: 'Vente de magasins',
    subscriptionTemplate: "Modèle d'abonnement",
    fulfillmentTemplate: 'Modèle de réalisation',
    productFamily: 'Famille de produits',
    blockedCountries: 'Pays bloqués',
    catalog: 'Catalogue',
    enabled: 'Activé',
    externalContext: 'Contexte externe',
    physical: 'Physique',
    priceFunction: 'Fonction prix',
    name: 'Nom',
    displayName: 'Afficher un nom',
    localizedContent: {
      marketing: 'Nom marketing',
      longDesc: 'Longue description',
      shortDesc: 'Brève description',
      remark: 'Remarque sur la livraison du produit',
      defaultLanguage: 'Langage par défaut',
      deliveryRemark: 'Remarque de livraison',
    },
    allowOrderDetailsOnCheckoutConfirmation:
      'Display product delivery on checkout confirmation',
    allowQuotes: 'Allow quotes',
    createEndUserWithoutSubscription: 'Force End-user creation',
    defaultLocale: 'Default Language',
    eligibleEndUserTypes: {
      buyer: 'Buyer authentication',
      no: 'No authentication',
      reseller: 'Reseller authentication',
    },
    forceGeoipLocalization: 'Use GeoIp to force Enduser country',
    gtmId: 'GTM ID',
    nexwayGtmId: 'GTM ID (owned by Nexway)',
    promoteOneClickPayment: 'Promote one-click payment',
    saleLocales: 'Sale Languages',
    storeWebsite: 'Store website',
    productRecommendationTypes: {
      crossSell: 'Vente croisée',
      upSell: 'Up Sell',
    },
    productRecommendationLevels: {
      product: 'Produit',
      cart: 'Chariot',
      interstitial: 'Interstitiel',
      purchase: 'Achat',
    },
    productRecommendationSources: {
      purchase: 'Achat',
      manualRenewal: 'Renouvellement manuel',
    },
    weight: 'Poids',
    stores: 'Magasins',
    byProducts: 'Par produits',
    byParentProducts: 'Par produits parents',
  },
  buttons: {
    createAccount: 'Créez votre compte',
    signIn: 'Se connecter',
    signOut: 'Déconnexion',
    save: 'Sauver',
    submit: 'Soumettre',
    createPassword: 'Définir le mot de passe',
    reset: 'Remettre',
    apply: 'Apply',
    clear: 'Clear',
    googleLogin: 'CONNEXION AVEC GOOGLE',
  },
  links: {
    signUp: "S'inscrire",
    signIn: 'Se connecter',
    lostPassword: 'Mot de passe oublié',
  },
  messages: {
    welcome: 'Bienvenue',
    welcomeBack: 'Nous saluons le retour',
    createAccount:
      "Besoin d'un compte? Cliquez sur le bouton ci-dessous pour remplir un court formulaire d'inscription:",
    signIn:
      "Grâce à l'interface Nexway Center de Nexway, vous pourrez obtenir une vue à 360 degrés des performances de votre boutique en ligne et accéder à toutes les commandes en temps réel",
    wrongCredentials: "Nom d'utilisateur ou mot de passe incorrect",
    createPasswordTitle: 'Créer un mot de passe',
    createPassword:
      'Suivez les instructions pour créer un nouveau mot de passe',
    createPasswordInvalid:
      "L'URL pour recréer le mot de passe n'est plus valide",
    changedField: 'Vous avez {{count}} changement',
    changedField_plural: 'Vous avez {{count}} changements',
    selectFiles: 'Sélectionnez les fichiers',
    clickOrDrop: 'Cliquez ou déposez des fichiers ici',
  },
  sections: {
    general: 'Général',
    subscription: 'Exécution et abonnement',
    localizedContent: 'Contenu localisé',
    prices: 'Des prix',
    bundledProducts: 'Produits groupés',
    variationParams: 'Paramètres de variation',
    productVariations: 'Variations de produits',
    productFiles: 'Fichiers produits',
    design: 'Désign',
    paymentTabsRanking: 'Classement des onglets de paiement',
    assets: 'Les atouts',
    eligibility: 'Admissibilité',
    recommendations: 'Recommandations',
    cappingLimits: 'Plafonnement et limites',
  },
  labels: {
    product: {
      headerLogo: "Logo d'en-tête",
      boxshot: 'Boxshot',
      icon: 'Icône',
    },
    store: {
      confirmation: 'Bannière de confirmation par e-mail',
      favicon: 'Favicon',
      invoice: 'Bannière de facture',
      logo: 'Logo',
    },
  },
};

export default forms;
