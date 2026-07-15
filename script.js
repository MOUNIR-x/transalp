// ===== CONFIGURATION =====
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let currentCategory = 'all';
let currentImageIndex = 0;
let currentModalVehicle = null;
let filteredVehicles = [];
let cardSliders = {}; // Stocke l'index courant par carte

// ===== DONNÉES DES VÉHICULES =====
const vehiclesData = [
  {
    id: 1,
    title: "Citroën Jumper II H2 - Fourgon Aménagé",
    type: "fourgon",
    category: "Fourgon tôlé · H2",
    price: 2100, // Était 3000€
    oldPrice: 8500,
    deposit: 500, // Était 500€
    year: 2015,
    km: 185000,
    beds: 2,
    transmission: "Manuelle",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-2001",
    bank: "Crédit Agricole",
    images: ["images/img21.jpg", "images/img22.jpg", "images/img23.jpg", "images/img24.jpg"],
    description: "Fourgon tôlé Citroën Jumper II Phase 2 (post 2014). Hauteur 2,52m avec hauteur utile intérieure de 1,93m. Volume utile entre 11,5 et 13 m³. Moteur Diesel 2.0 ou 2.2 BlueHDi Euro 6, boîte manuelle 6 rapports.",
    specs: ["Euro 6", "H2 2,52m", "11-13 m³", "6 rapports"]
  },
  {
    id: 2,
    title: "Fendt Larimar Bolero - Caravane Double Essieu",
    type: "caravane",
    category: "Caravane · Double essieu Al-Ko",
    price: 12800,
    oldPrice: 18500, // Prix estimé pour montrer la réduction (~30%)
    deposit: 1100,
    year: 2020,
    km: 0,
    beds: 4,
    transmission: "N/A",
    badge: "urgent",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-2030",
    bank: "Crédit Agricole",
    images: ["images/img150.jpg", "images/img151.jpg", "images/img152.jpg", "images/img153.jpg"],
    description: "Caravane Fendt Larimar Bolero offrant une tenue de route premium grâce à son châssis double essieu Al-Ko. Espace de vie XXL avec une largeur de 2,50m pour une liberté de mouvement totale. Confort 4 étoiles : grand salon en U, cuisine équipée (grand frigo slim, tiroirs amortis), chambre avec lit permanent et chauffage centralisé toutes saisons.",
    specs: ["Double essieu Al-Ko", "Largeur 2,50m", "4 couchages", "Chauffage air pulsé"]
  },
  {
    id: 30,
    title: "Fiat Ducato Dethleffs - Profilé Premium",
    type: "profile",
    category: "Profilé · Cellule allemande",
    price: 4900, // Était 7000€
    oldPrice: 22000,
    deposit: 550,
    year: 2018,
    km: 95000,
    beds: 4,
    transmission: "Manuelle",
    badge: "urgent",
    badgeText: "Offre Spéciale",
    bankRef: "SAISIE-2026-2002",
    bank: "BNP Paribas",
    images: ["images/img35.jpg", "images/img36.jpg", "images/img37.jpg", "images/img38.jpg"],
    description: "Profilé Dethleffs sur Fiat Ducato - cellule allemande haut de gamme. Toit panoramique Skyroof. Store extérieur intégré. Pare-chocs peints couleur carrosserie. Sièges cabine pivotants.",
    specs: ["Skyroof", "Store intégré", "Isolation DE", "4 couchages"]
  },
  {
    id: 3,
    title: "Renault Master II L2H2 - Fourgon",
    type: "fourgon",
    category: "Fourgon · 2003-2010",
    price: 3500, // Était 5000€
    oldPrice: 12000,
    deposit: 600,
    year: 2008,
    km: 220000,
    beds: 2,
    transmission: "Manuelle",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-2003",
    bank: "Société Générale",
    images: ["images/img101.jpg", "images/img102.jpg", "images/img103.jpg", "images/img104.jpg"],
    description: "Renault Master II (2003-2010) moteur 2.5 dCi (100/120/150 ch). Boîte manuelle 6 rapports. L2H2 : ~5,40m long, ~2,49m haut. Galerie de toit renforcée avec échelle.",
    specs: ["2.5 dCi", "L2H2", "Galerie toit", "6 rapports"]
  },
  {
    id: 4,
    title: "Ford Transit Custom Sport 2020",
    type: "fourgon",
    category: "Fourgon · Sport",
    price: 2100, // Était 3000€
    oldPrice: 15000,
    deposit: 700,
    year: 2020,
    km: 78000,
    beds: 2,
    transmission: "Manuelle",
    badge: "urgent",
    badgeText: "Prix Cassé",
    bankRef: "SAISIE-2026-2004",
    bank: "Crédit Mutuel",
    images: ["images/img46.jpg", "images/img47.jpg", "images/img48.jpg", "images/img49.jpg"],
    description: "Ford Transit Custom finition Sport. Moteur 2.0 EcoBlue 130/170/185 ch. L1H1 : 4,97m long, 1,97m haut. SYNC 3 avec Apple CarPlay/Android Auto. Jantes alliage 17\".",
    specs: ["EcoBlue", "SYNC 3", "Jantes 17\"", "CarPlay"]
  },
  {
    id: 5,
    title: "Chausson Genesis 30 - Ford Transit",
    type: "fourgon",
    category: "Fourgon Aménagé · Compact",
    price: 4900, // Était 7000€
    oldPrice: 18000,
    deposit: 585,
    year: 2017,
    km: 110000,
    beds: 2,
    transmission: "Manuelle",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-2005",
    bank: "LCL",
    images: ["images/img51.jpg", "images/img52.jpg", "images/img53.jpg", "images/img54.jpg"],
    description: "Chausson Genesis 30 sur Ford Transit 2.2 TDCi. Moins de 6 mètres, permis B. Salon avec sièges pivotants, cuisine équipée, lit à la française. Store Dometic installé.",
    specs: ["< 6m", "Permis B", "Store Dometic", "Lit FR"]
  },
  {
    id: 6,
    title: "Rapido Profilé Série 7",
    type: "profile",
    category: "Profilé · Série 7",
    price: 4200, // Était 6000€
    oldPrice: 19000,
    deposit: 650,
    year: 2010,
    km: 145000,
    beds: 4,
    transmission: "Manuelle",
    badge: "new",
    badgeText: "Nouveau",
    bankRef: "SAISIE-2026-2006",
    bank: "CIC",
    images: ["images/img62.jpg", "images/img63.jpg", "images/img64.jpg", "images/img65.jpg"],
    description: "Rapido Série 7, moteur 2.8L i.d.TD/JTD. 4 places / 4 couchages. Frigo trimixte, plaques 3 feux, salle d'eau avec douche et WC cassette, chauffage Truma. ~100L d'eau.",
    specs: ["2.8L", "Trimixte", "Truma", "100L eau"]
  },
  {
    id: 7,
    title: "Challenger Ford Transit - Skyview",
    type: "profile",
    category: "Profilé · Toit panoramique",
    price: 7000, // Était 10000€
    oldPrice: 28000,
    deposit: 700,
    year: 2016,
    km: 88000,
    beds: 4,
    transmission: "Manuelle",
    badge: "urgent",
    badgeText: "Top Affaire",
    bankRef: "SAISIE-2026-2007",
    bank: "Caisse d'Épargne",
    images: ["images/img70.jpg", "images/img71.jpg", "images/img72.jpg", "images/img73.jpg"],
    description: "Challenger sur Ford Transit 2.2 TDCi ou 2.0 EcoBlue. Structure IRP isolation renforcée. Climatisation, régulateur, sièges pivotants. Chauffage sur carburant utilisable en roulant.",
    specs: ["Skyview", "IRP", "Chauffage diesel", "Clim"]
  },
  {
    id: 8,
    title: "Caravane Rigide Années 90",
    type: "caravane",
    category: "Caravane · Vintage",
    price: 2100, // Était 3000€
    oldPrice: 7000,
    deposit: 800,
    year: 1995,
    km: 0,
    beds: 4,
    transmission: "N/A",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-2008",
    bank: "Banque Populaire",
    images: ["images/img82.jpg", "images/img83.jpg", "images/img84.jpg", "images/img85.jpg"],
    description: "Caravane rigide à simple essieu. Carrosserie alu martelé années 90. Porte style écurie. Bandes décoratives gris/bleu. Idéale restauration ou usage saisonnier.",
    specs: ["Simple essieu", "Alu martelé", "Vintage", "4 couchages"]
  },
  {
    id: 9,
    title: "Pilote Intégral 2005-2009",
    type: "integral",
    category: "Intégral · Gamme Référence",
    price: 10500, // Était 15000€
    oldPrice: 45000,
    deposit: 1050,
    year: 2007,
    km: 125000,
    beds: 4,
    transmission: "Manuelle",
    badge: "urgent",
    badgeText: "Premium",
    bankRef: "SAISIE-2026-2009",
    bank: "Crédit Agricole",
    images: ["images/img91.jpg", "images/img92.jpg", "images/img93.jpg", "images/img94.jpg"],
    description: "Pilote Intégral sur Fiat Ducato châssis AL-KO surbaissé. 2.3 ou 2.8 JTD/MultiJet 130-160ch. Lit pavillon escamotable + lit fixe arrière. Cuisine en L, salle d'eau. Store latéral.",
    specs: ["AL-KO", "MultiJet", "Lit pavillon", "Store"]
  },
  {
    id: 10,
    title: "Citroën Jumper Pössl 2Win Vario",
    type: "van",
    category: "Van Aménagé · Familial",
    price: 6300, // Était 9000€
    oldPrice: 24000,
    deposit: 490,
    year: 2019,
    km: 72000,
    beds: 4,
    transmission: "Manuelle",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-2010",
    bank: "BNP Paribas",
    images: ["images/img17.jpg", "images/img101.jpg", "images/img102.jpg", "images/img103.jpg"],
    description: "Pössl 2Win Vario sur Citroën Jumper. 5,99m long, 4 places. Lit pavillon double + lit transversal arrière. Frigo accessible extérieur. Salle bain Vario paroi pivotante. Store + satellite.",
    specs: ["Vario", "4 couchages", "Salle bain", "Satellite"]
  },
  {
    id: 11,
    title: "Jayco Precept 36A - Intégral US",
    type: "integral",
    category: "Intégral · Modèle US",
    price: 11900, // Était 17000€
    oldPrice: 55000,
    deposit: 700,
    year: 2015,
    km: 65000,
    beds: 6,
    transmission: "Automatique",
    badge: "urgent",
    badgeText: "Exceptionnel",
    bankRef: "SAISIE-2026-2011",
    bank: "Société Générale",
    images: ["images/img110.jpg", "images/img111.jpg", "images/img112.jpg", "images/img113.jpg"],
    description: "Jayco Precept 36A sur Ford F53. ~11,80m avec slide-outs. V8 essence 7,3L ~350ch, boîte auto. JRide® Plus. Double salle de bain. Lit King size. Groupe Onan 5500W. Double clim.",
    specs: ["V8 7,3L", "Slide-outs", "Groupe 5500W", "Double SDB"]
  },
  {
    id: 12,
    title: "Fiat Ducato Phase 1 - Profilé",
    type: "profile",
    category: "Profilé · Phase 1",
    price: 5600, // Était 8000€
    oldPrice: 20000,
    deposit: 560,
    year: 2012,
    km: 135000,
    beds: 4,
    transmission: "Manuelle",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-2012",
    bank: "Crédit Mutuel",
    images: ["images/img122.jpg", "images/img123.jpg", "images/img124.jpg", "images/img125.jpg"],
    description: "Profilé Fiat Ducato Phase 1. Cabine gris métallisé, pare-chocs peints. Grand lanterneau Skyview. Grande soute extérieure. Format compact/intermédiaire maniable.",
    specs: ["Skyview", "Soute", "Pare-chocs peints", "Compact"]
  },
  {
    id: 13,
    title: "CI Riviera 105 P - Profilé Compact",
    type: "profile",
    category: "Profilé · Compact",
    price: 4900, // Était 7000€
    oldPrice: 18000,
    deposit: 500,
    year: 2014,
    km: 98000,
    beds: 2,
    transmission: "Manuelle",
    badge: "new",
    badgeText: "Nouveau",
    bankRef: "SAISIE-2026-2013",
    bank: "LCL",
    images: ["images/img130.jpg", "images/img131.jpg", "images/img132.jpg", "images/img133.jpg"],
    description: "CI Riviera 105 P compact ~6,20m. Fiat Ducato Multijet. Permis B. Lit permanent + dînette. Sièges pivotants. Cuisine équipée. Salle d'eau. Store banne inclus.",
    specs: ["Multijet", "6,20m", "Store banne", "2 pers."]
  },
  {
    id: 14,
    title: "Carthago Chic C-Line - Intégral Luxe",
    type: "integral",
    category: "Intégral · Premium",
    price: 4200, // Était 6000€
    oldPrice: 35000,
    deposit: 550,
    year: 2008,
    km: 165000,
    beds: 4,
    transmission: "Manuelle",
    badge: "urgent",
    badgeText: "Liquidation",
    bankRef: "SAISIE-2026-2014",
    bank: "CIC",
    images: ["images/img140.jpg", "images/img141.jpg", "images/img142.jpg", "images/img143.jpg"],
    description: "Carthago Chic C-Line sur Fiat Ducato châssis AL-KO. MultiJet puissant. 100% sans bois, isolation premium 4 saisons. Double plancher chauffé. Rétroviseurs bus, jantes alu.",
    specs: ["AL-KO", "Sans bois", "Double plancher", "4 saisons"]
  },
  {
    id: 15,
    title: "CHAUSSON 640 Titanium Ultimate",
    type: "profile",
    category: "Profilé Haut de Gamme",
    price: 30030, // Était 42900€ (-30%)
    oldPrice: 74200,
    deposit: 850,
    year: 2022,
    km: 28000,
    beds: 4,
    transmission: "Automatique",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-0847",
    bank: "Crédit Agricole",
    images: ["images/img2.jpg", "images/img4.jpg", "images/img6.jpg", "images/img8.jpg"],
    description: "Ford Transit 2.0 TDCi 170ch auto. Salon face-à-face, lit pavillon électrique, cuisine en L frigo 167L, salle d'eau indépendante. CT OK, carnet complet.",
    specs: ["170ch", "Auto", "Frigo 167L", "CT OK"]
  },
  {
    id: 16,
    title: "BAVARIA I 740 FC Nomade",
    type: "integral",
    category: "Intégral Luxe",
    price: 47950, // Était 68500€
    oldPrice: 112000,
    deposit: 650,
    year: 2021,
    km: 42000,
    beds: 4,
    transmission: "Manuelle",
    badge: "urgent",
    badgeText: "Dernière chance",
    bankRef: "SAISIE-2026-0923",
    bank: "BNP Paribas",
    images: ["images/img10.jpg", "images/img12.jpg", "images/img14.jpg", "images/img16.jpg"],
    description: "Liquidation judiciaire. Fiat Ducato 2.3 Multijet 140ch. Lit central électrique, salon panoramique, double plancher chauffé. Excellent état, dernière révision faite.",
    specs: ["140ch", "Lit central", "Double plancher", "Révisé"]
  },
  {
    id: 17,
    title: "RAPIDO 8064 DF",
    type: "profile",
    category: "Profilé · Défaut de paiement",
    price: 27230, // Était 38900€
    oldPrice: 69500,
    deposit: 535,
    year: 2020,
    km: 55000,
    beds: 4,
    transmission: "Manuelle",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-1012",
    bank: "Crédit Mutuel",
    images: ["images/img18.jpg", "images/img20.jpg", "images/img1.jpg", "images/img3.jpg"],
    description: "Fiat Ducato 2.3L 140ch. Lits jumeaux arrière, salon en L convertible, grand garage. Très bon état, intérieur non-fumeur. Documents de saisie disponibles.",
    specs: ["140ch", "Lits jumeaux", "Garage", "Non-fumeur"]
  },
  {
    id: 18,
    title: "HYMER Free 600 Campus",
    type: "fourgon",
    category: "Fourgon · Retour leasing",
    price: 36750, // Était 52500€
    oldPrice: 87000,
    deposit: 750,
    year: 2023,
    km: 18000,
    beds: 4,
    transmission: "Automatique",
    badge: "urgent",
    badgeText: "Offre éclair",
    bankRef: "SAISIE-2026-1156",
    bank: "Société Générale",
    images: ["images/img5.jpg", "images/img7.jpg", "images/img9.jpg", "images/img11.jpg"],
    description: "Mercedes Sprinter 2.2L 160ch auto 9G-TRONIC. Toit relevable, lit transversal, cuisine complète. Quasi-neuf sous garantie constructeur.",
    specs: ["160ch", "9G-TRONIC", "Toit relevable", "Garantie"]
  },
  {
    id: 19,
    title: "KNAUS Tourer Van 500 MQ",
    type: "van",
    category: "Van · Créance bancaire",
    price: 27650, // Était 39500€
    oldPrice: 63800,
    deposit: 520,
    year: 2021,
    km: 32000,
    beds: 4,
    transmission: "Manuelle",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-1203",
    bank: "Banque Populaire",
    images: ["images/img13.jpg", "images/img15.jpg", "images/img17.jpg", "images/img19.jpg"],
    description: "VW Crafter 2.0 TDI 140ch. Salle de bain modulable, lit arrière confortable, cuisine linéaire. Parfait état mécanique.",
    specs: ["140ch", "SDB modulable", "Cuisine", "Bon état"]
  },
  {
    id: 20,
    title: "CARADO T 447",
    type: "capucine",
    category: "Capucine · Liquidation",
    price: 25130, // Était 35900€
    oldPrice: 58000,
    deposit: 600,
    year: 2019,
    km: 68000,
    beds: 6,
    transmission: "Manuelle",
    badge: "urgent",
    badgeText: "Prix cassé",
    bankRef: "SAISIE-2026-0789",
    bank: "Caisse d'Épargne",
    images: ["images/img2.jpg", "images/img6.jpg", "images/img10.jpg", "images/img14.jpg"],
    description: "Fiat Ducato 2.3L 130ch. Lit pavillon spacieux, dînette convertible, lit arrière transversal. 6 couchages, garage XXL. Idéal famille.",
    specs: ["130ch", "6 couchages", "Garage XXL", "Famille"]
  },
  {
    id: 21,
    title: "BÜRSTNER Lyseo I 736",
    type: "integral",
    category: "Intégral · Saisie société",
    price: 55930, // Était 79900€
    oldPrice: 8000,
    deposit: 450,
    year: 2022,
    km: 22000,
    beds: 4,
    transmission: "Automatique",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-1287",
    bank: "LCL",
    images: ["images/img4.jpg", "images/img8.jpg", "images/img12.jpg", "images/img16.jpg"],
    description: "Mercedes Sprinter 2.2L 170ch auto. Finition Harmony Drive. Lit central, salon panoramique, double plancher. État exceptionnel.",
    specs: ["170ch", "Harmony", "Lit central", "Exceptionnel"]
  },
  {
    id: 22,
    title: "PEUGEOT Jumper L3H2",
    type: "fourgon",
    category: "Fourgon · Saisie particulière",
    price: 9000, // Était 34500€
    oldPrice: 54000,
    deposit: 650,
    year: 2020,
    km: 75000,
    beds: 2,
    transmission: "Manuelle",
    badge: "urgent",
    badgeText: "Petite saisie",
    bankRef: "SAISIE-2026-1342",
    bank: "CIC",
    images: ["images/img18.jpg", "images/img1.jpg", "images/img5.jpg", "images/img9.jpg"],
    description: "Peugeot Jumper 2.2 BlueHDi 140ch. Aménagement sobre : lit arrière, cuisine, salle d'eau. Idéal couple. Très faible consommation.",
    specs: ["140ch", "BlueHDi", "Sobre", "Couple"]
  },
  {
    id: 23,
    title: "CHAUSSON X550 Welcome",
    type: "profile",
    category: "Profilé · Crédit résilié",
    price: 32130, // Était 45900€
    oldPrice: 12000,
    deposit: 1090,
    year: 2021,
    km: 38000,
    beds: 4,
    transmission: "Manuelle",
    badge: "new",
    badgeText: "Nouveau",
    bankRef: "SAISIE-2026-1401",
    bank: "Crédit Agricole",
    images: ["images/img13.jpg", "images/img17.jpg", "images/img3.jpg", "images/img7.jpg"],
    description: "Fiat Ducato 2.3L 140ch. Lit à la française, grand salon en L, cuisine équipée, salle d'eau avec douche séparée. Excellent rapport qualité-prix.",
    specs: ["140ch", "Lit FR", "Salon L", "Rapport Q/P"]
  },
  {
    id: 24,
    title: "RAPIDO 996 DF",
    type: "integral",
    category: "Intégral · Saisie bancaire",
    price: 62930, // Était 89900€
    oldPrice: 15000,
    deposit: 800,
    year: 2023,
    km: 12000,
    beds: 4,
    transmission: "Automatique",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-1456",
    bank: "BNP Paribas",
    images: ["images/img11.jpg", "images/img15.jpg", "images/img19.jpg", "images/img2.jpg"],
    description: "Mercedes Sprinter 3.0L V6 190ch auto. Lit central king size, salon face-à-face, cuisine haut de gamme. Quasi-neuf, garantie constructeur.",
    specs: ["V6 190ch", "King size", "Quasi-neuf", "Garantie"]
  },
  {
    id: 25,
    title: "HYMER B-Class 580",
    type: "integral",
    category: "Intégral Luxe",
    price: 66500, // Était 95000€
    oldPrice: 20000,
    deposit: 1100,
    year: 2022,
    km: 15000,
    beds: 4,
    transmission: "Automatique",
    badge: "urgent",
    badgeText: "Liquidation",
    bankRef: "SAISIE-2026-1502",
    bank: "Société Générale",
    images: ["images/img6.jpg", "images/img10.jpg", "images/img14.jpg", "images/img18.jpg"],
    description: "Fleuron Hymer. Mercedes-Benz 2.2L 170ch. Finition exceptionnelle, matériaux nobles. Tout équipement haut de gamme inclus.",
    specs: ["170ch", "Finition luxe", "Matériaux nobles", "Haut de gamme"]
  },
  {
    id: 26,
    title: "ADRIA Twin 600 SP",
    type: "fourgon",
    category: "Fourgon Premium",
    price: 41230, // Était 58900€
    oldPrice: 15000,
    deposit: 750,
    year: 2022,
    km: 25000,
    beds: 4,
    transmission: "Manuelle",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-1558",
    bank: "Crédit Mutuel",
    images: ["images/img20.jpg", "images/img4.jpg", "images/img8.jpg", "images/img12.jpg"],
    description: "Fiat Ducato 2.3L 140ch. Toit relevable électrique, lit arrière transversal, cuisine complète. Fourgon haut de gamme Adria.",
    specs: ["140ch", "Toit élec.", "Lit transversal", "Cuisine"]
  },
  {
    id: 27,
    title: "BENIMAR Mileo 282",
    type: "profile",
    category: "Profilé Familial",
    price: 29050, // Était 41500€
    oldPrice: 12000,
    deposit: 800,
    year: 2020,
    km: 48000,
    beds: 6,
    transmission: "Manuelle",
    badge: "new",
    badgeText: "Nouveau",
    bankRef: "SAISIE-2026-1603",
    bank: "Caisse d'Épargne",
    images: ["images/img16.jpg", "images/img1.jpg", "images/img5.jpg", "images/img9.jpg"],
    description: "Fiat Ducato 2.3L 130ch. 6 places idéal famille. Lit pavillon, dînette convertible, lit arrière. Grand garage.",
    specs: ["130ch", "6 places", "Famille", "Grand garage"]
  },
  {
    id: 28,
    title: "WESTFALIA Columbus 641",
    type: "van",
    category: "Van Aménagé",
    price: 43750, // Était 62500€
    oldPrice: 20000,
    deposit: 670,
    year: 2023,
    km: 8000,
    beds: 4,
    transmission: "Automatique",
    badge: "urgent",
    badgeText: "Top affaire",
    bankRef: "SAISIE-2026-1657",
    bank: "LCL",
    images: ["images/img13.jpg", "images/img17.jpg", "images/img3.jpg", "images/img7.jpg"],
    description: "Mercedes Sprinter 2.2L 163ch auto 9G. Toit haut, lit transversal, salle de bain complète. Quasi-neuf.",
    specs: ["163ch", "9G", "Quasi-neuf", "SDB complète"]
  },
  {
    id: 29,
    title: "CHAUSSON Flash 01",
    type: "capucine",
    category: "Capucine Compacte",
    price: 23030, // Était 32900€
    oldPrice: 12305,
    deposit: 800,
    year: 2019,
    km: 62000,
    beds: 5,
    transmission: "Manuelle",
    badge: "bank",
    badgeText: "Saisie Bancaire",
    bankRef: "SAISIE-2026-1702",
    bank: "Banque Populaire",
    images: ["images/img11.jpg", "images/img15.jpg", "images/img19.jpg", "images/img2.jpg"],
    description: "Fiat Ducato 2.3L 130ch. Compact et maniable. Lit pavillon, salon convertible, lit arrière. Parfait premier camping-car.",
    specs: ["130ch", "Compact", "5 couchages", "Débutant"]
  }
];

// ===== AVIS =====
const reviewsData = [
  { name: "Jean-Marc D.", initials: "JM", date: "il y a 2 semaines", text: "Transaction limpide. Dossier juridique complet, véhicule conforme. J'ai économisé plus de 25 000 € !" },
  { name: "Sylvie F.", initials: "SF", date: "il y a 1 mois", text: "Carnet d'entretien, historique, mainlevée... Rien à redire. Mon Hymer est parfait !" },
  { name: "Philippe L.", initials: "PL", date: "il y a 3 semaines", text: "Troisième achat chez Transalp Camp. Prix imbattables et suivi irréprochable." },
  { name: "Marie & Pierre T.", initials: "MP", date: "il y a 2 mois", text: "Processus d'achat simple et rapide. Équipe professionnelle et à l'écoute." }
];

// ===== ÉLÉMENTS DOM =====
const listingsGrid = document.getElementById('listingsGrid');
const resultsCount = document.getElementById('resultsCount');
const showingCount = document.getElementById('showingCount');
const noResults = document.getElementById('noResults');
const paginationContainer = document.getElementById('pagination');
const reviewsCarousel = document.getElementById('reviewsCarousel');
const carouselDots = document.getElementById('carouselDots');
const modal = document.getElementById('detailsModal');

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚐 Transalp Camp - Initialisation...');
  console.log(' Véhicules chargés :', vehiclesData.length);
  applyFilters();
  renderReviews();
  setupEventListeners();
  animateStats();
  setupScrollAnimations();
});

// ===== FILTRAGE =====
function applyFilters() {
  const budgetFilter = document.getElementById('f-budget').value;
  const typeFilter = document.getElementById('f-type').value;
  const bedsFilter = document.getElementById('f-beds').value;
  const kmFilter = document.getElementById('f-km').value;
  const sortValue = document.getElementById('sortSelect').value;

  filteredVehicles = vehiclesData.filter(vehicle => {
    if (currentCategory !== 'all' && vehicle.type !== currentCategory) return false;
    if (budgetFilter && vehicle.price > parseInt(budgetFilter)) return false;
    if (typeFilter !== 'any' && vehicle.type !== typeFilter) return false;
    if (bedsFilter !== 'any' && vehicle.beds < parseInt(bedsFilter)) return false;
    if (kmFilter !== 'any' && vehicle.km > parseInt(kmFilter)) return false;
    return true;
  });

  // Tri
  filteredVehicles.sort((a, b) => {
    switch (sortValue) {
      case 'id-asc': return a.id - b.id;  // ✅ Ordre par ID croissant
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'discount': return ((b.oldPrice - b.price) / b.oldPrice) - ((a.oldPrice - a.price) / a.oldPrice);
      case 'km-asc': return a.km - b.km;
      case 'year-desc': return b.year - a.year;
      default: return a.id - b.id;  // ✅ Par défaut : ordre par ID
    }
  });

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = Math.max(1, totalPages);

  renderVehicles();
  renderPagination();
}

// ===== RENDU AVEC SLIDER =====
// ===== RENDU DES VÉHICULES AVEC STYLES COMPLETS =====
function renderVehicles() {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageVehicles = filteredVehicles.slice(start, end);

  if (filteredVehicles.length === 0) {
    listingsGrid.innerHTML = '';
    noResults.style.display = 'block';
    resultsCount.textContent = '0';
    showingCount.textContent = '';
    paginationContainer.innerHTML = '';
    return;
  }

  noResults.style.display = 'none';
  resultsCount.textContent = filteredVehicles.length;
  showingCount.textContent = `(Page ${currentPage} sur ${Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE)})`;

  listingsGrid.innerHTML = pageVehicles.map((vehicle, index) => `
    <article class="listing-card" 
             style="animation: fadeInUp 0.5s ease-out ${index * 0.05}s both"
             onclick="openModal(${vehicle.id})">
      
      <div class="listing-image">
        <!-- BADGE TYPE DE SAISIE -->
        <span class="listing-badge badge-${vehicle.badge}">
          <i class="fas ${getBadgeIcon(vehicle.badge)}"></i>
          ${vehicle.badgeText}
        </span>
        
        <!-- BOUTON FAVORI -->
        <button class="listing-fav" onclick="event.stopPropagation(); toggleFav(this)" title="Ajouter aux favoris">
          <i class="far fa-heart"></i>
        </button>
        
        <!-- SLIDER IMAGES -->
        <div class="image-slider" id="slider-${vehicle.id}">
          ${vehicle.images.map((img, i) => `
            <img src="${img}" 
                 alt="${vehicle.title} - Vue ${i + 1}" 
                 class="${i === 0 ? 'active' : ''}"
                 loading="lazy"
                 onerror="this.style.display='none'; this.parentElement.querySelector('.image-fallback').style.display='flex';">
          `).join('')}
          <div class="image-fallback" style="display:none;">
            <i class="fas fa-caravan"></i>
            <span>${vehicle.title.split(' ')[0]}</span>
          </div>
        </div>
        
        <!-- BOUTONS SLIDER -->
        ${vehicle.images.length > 1 ? `
          <button class="slider-btn prev" onclick="event.stopPropagation(); slideImage(${vehicle.id}, -1)">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="slider-btn next" onclick="event.stopPropagation(); slideImage(${vehicle.id}, 1)">
            <i class="fas fa-chevron-right"></i>
          </button>
          
          <!-- DOTS NAVIGATION -->
          <div class="slider-dots">
            ${vehicle.images.map((_, i) => `
              <div class="slider-dot ${i === 0 ? 'active' : ''}" 
                   onclick="event.stopPropagation(); goToSlide(${vehicle.id}, ${i})"></div>
            `).join('')}
          </div>
        ` : ''}
      </div>
      
      <div class="listing-body">
        <!-- CATÉGORIE -->
        <div class="listing-type">${vehicle.category}</div>
        
        <!-- TITRE -->
        <h3 class="listing-title">${vehicle.title}</h3>
        
        <!-- SPÉCIFICATIONS -->
        <div class="listing-specs">
          ${vehicle.specs.map(s => `<span class="spec-tag">${s}</span>`).join('')}
          <span class="spec-tag"><i class="fas fa-calendar"></i> ${vehicle.year}</span>
          <span class="spec-tag"><i class="fas fa-tachometer-alt"></i> ${vehicle.km.toLocaleString('fr-FR')} km</span>
        </div>
        
        <!-- DESCRIPTION COURTE -->
        <p class="listing-desc">${vehicle.description}</p>
        
        <!-- PIED DE CARTE -->
        <div class="listing-footer">
          <div class="listing-price-block">
            <span class="price-old">${vehicle.oldPrice.toLocaleString('fr-FR')} €</span>
            <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
              <span class="price-new">${vehicle.price.toLocaleString('fr-FR')} €</span>
              <span class="price-discount">-${Math.round((1 - vehicle.price / vehicle.oldPrice) * 100)}%</span>
            </div>
            <div class="deposit-info">
              <i class="fas fa-hand-holding-usd"></i> Acompte : ${vehicle.deposit.toLocaleString('fr-FR')} €
            </div>
          </div>
          
          <!-- BOUTONS ACTION -->
          <div class="listing-actions">
            <button class="btn-icon btn-whatsapp-icon" 
                    onclick="event.stopPropagation(); contactWhatsApp('${vehicle.title}')"
                    title="Contacter sur WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </button>
            <button class="btn-icon btn-email-icon" 
                    onclick="event.stopPropagation(); contactEmail('${vehicle.title}')"
                    title="Envoyer un email">
              <i class="fas fa-envelope"></i>
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// ===== FONCTIONS SLIDER =====
function slideImage(vehicleId, direction) {
  const slider = document.getElementById(`slider-${vehicleId}`);
  if (!slider) return;

  const images = slider.querySelectorAll('img');
  const dots = slider.parentElement.querySelectorAll('.slider-dot');

  let currentIndex = 0;
  images.forEach((img, i) => {
    if (img.classList.contains('active')) currentIndex = i;
  });

  const newIndex = (currentIndex + direction + images.length) % images.length;

  images.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  images[newIndex].classList.add('active');
  if (dots[newIndex]) dots[newIndex].classList.add('active');
}

function goToSlide(vehicleId, index) {
  const slider = document.getElementById(`slider-${vehicleId}`);
  if (!slider) return;

  const images = slider.querySelectorAll('img');
  const dots = slider.parentElement.querySelectorAll('.slider-dot');

  images.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  images[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');
}

// ===== PAGINATION =====
function renderPagination() {
  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);

  if (!paginationContainer) {
    console.error('Container pagination introuvable');
    return;
  }

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let html = '';

  // Bouton Précédent
  html += `<button class="pagination-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
    <i class="fas fa-chevron-left"></i> Précédent
  </button>`;

  // Pages numériques
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  if (startPage > 1) {
    html += `<button class="pagination-btn" onclick="goToPage(1)">1</button>`;
    if (startPage > 2) html += `<span class="pagination-info">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span class="pagination-info">...</span>`;
    html += `<button class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
  }

  // Bouton Suivant
  html += `<button class="pagination-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
    Suivant <i class="fas fa-chevron-right"></i>
  </button>`;

  paginationContainer.innerHTML = html;
}

function goToPage(page) {
  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderVehicles();
  renderPagination();
  document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getBadgeIcon(badgeType) {
  const icons = { bank: 'fa-university', urgent: 'fa-bolt', new: 'fa-sparkles' };
  return icons[badgeType] || 'fa-tag';
}

// ===== AVIS =====
function renderReviews() {
  reviewsCarousel.innerHTML = reviewsData.map(review => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${review.initials}</div>
        <div class="review-info">
          <h4>${review.name}</h4>
          <span>${review.date} • Acheteur vérifié</span>
        </div>
      </div>
      <p class="review-text">"${review.text}"</p>
    </div>
  `).join('');

  carouselDots.innerHTML = reviewsData.map((_, i) => `
    <div class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToReview(${i})"></div>
  `).join('');

  let currentReview = 0;
  setInterval(() => {
    currentReview = (currentReview + 1) % reviewsData.length;
    goToReview(currentReview);
  }, 5000);
}

function goToReview(index) {
  reviewsCarousel.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// ===== MODALE =====
function openModal(vehicleId) {
  const vehicle = vehiclesData.find(v => v.id === vehicleId);
  if (!vehicle) return;

  currentModalVehicle = vehicle;
  currentImageIndex = 0;

  document.getElementById('modalBankRef').innerHTML = `<i class="fas fa-university"></i> REF: ${vehicle.bankRef} · ${vehicle.bank}`;
  document.getElementById('modalBadge').textContent = vehicle.badgeText;
  document.getElementById('modalTitle').textContent = vehicle.title;
  document.getElementById('modalOldPrice').textContent = `${vehicle.oldPrice.toLocaleString('fr-FR')} €`;
  document.getElementById('modalPrice').textContent = `${vehicle.price.toLocaleString('fr-FR')} €`;
  document.getElementById('modalDiscount').textContent = `-${Math.round((1 - vehicle.price / vehicle.oldPrice) * 100)}%`;
  document.getElementById('modalDesc').textContent = vehicle.description;

  document.getElementById('modalSpecs').innerHTML = `
    ${vehicle.specs.map(s => `<span class="spec-tag">${s}</span>`).join('')}
    <span class="spec-tag"><i class="fas fa-calendar"></i> ${vehicle.year}</span>
    <span class="spec-tag"><i class="fas fa-tachometer-alt"></i> ${vehicle.km.toLocaleString('fr-FR')} km</span>
    <span class="spec-tag"><i class="fas fa-bed"></i> ${vehicle.beds} couchages</span>
    <span class="spec-tag"><i class="fas fa-cog"></i> ${vehicle.transmission}</span>
  `;

  updateModalImages();
  document.getElementById('modalWaLink').href = `https://wa.me/+33746534680?text=Bonjour,%20je%20suis%20intéressé%20par%20le%20véhicule%20saisi%20:%20${encodeURIComponent(vehicle.title)}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateModalImages() {
  if (!currentModalVehicle) return;
  document.getElementById('modalMainImg').src = currentModalVehicle.images[currentImageIndex];
  document.getElementById('modalThumbs').innerHTML = currentModalVehicle.images.map((img, i) => `
    <img src="${img}" alt="Vue ${i + 1}" class="${i === currentImageIndex ? 'active' : ''}" onclick="changeImageTo(${i})">
  `).join('');
}

function changeImage(direction) {
  if (!currentModalVehicle) return;
  currentImageIndex = (currentImageIndex + direction + currentModalVehicle.images.length) % currentModalVehicle.images.length;
  updateModalImages();
}

function changeImageTo(index) {
  currentImageIndex = index;
  updateModalImages();
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== EVENTS =====
function setupEventListeners() {
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentCategory = card.dataset.type;
      currentPage = 1;
      applyFilters();
    });
  });

  ['f-budget', 'f-type', 'f-beds', 'f-km', 'sortSelect'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => { currentPage = 1; applyFilters(); });
    document.getElementById(id).addEventListener('change', () => { currentPage = 1; applyFilters(); });
  });

  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

function toggleFav(btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  icon.classList.toggle('far');
  icon.classList.toggle('fas');
}

function contactWhatsApp(title) {
  window.open(`https://wa.me/+33746534680?text=${encodeURIComponent('Bonjour, intéressé par : ' + title)}`, '_blank');
}

function contactEmail(title) {
  window.location.href = `mailto:transalpcampergmbh@gmail.com?subject=Demande : ${title}`;
}

function resetFilters() {
  document.getElementById('f-budget').value = '';
  document.getElementById('f-type').value = 'any';
  document.getElementById('f-beds').value = 'any';
  document.getElementById('f-km').value = 'any';
  document.getElementById('sortSelect').value = 'id-asc';  // ✅ Changé ici
  currentCategory = 'all';
  currentPage = 1;
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  document.querySelector('.cat-card[data-type="all"]').classList.add('active');
  applyFilters();
}

function animateStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.dataset.target);
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          entry.target.textContent = isDecimal ? (target * ease).toFixed(1) : Math.floor(target * ease);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(s => observer.observe(s));
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.how-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
}

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('modal-backdrop')) closeModal();
});