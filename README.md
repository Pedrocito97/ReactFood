# ReactFood Application

Une application React moderne de commande de repas en ligne avec panier d'achat, formulaire de commande et intégration backend.

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture Technique](#architecture-technique)
- [Structure du Projet](#structure-du-projet)
- [Composants Principaux](#composants-principaux)
- [Hooks Personnalisés](#hooks-personnalisés)
- [Flux de Données](#flux-de-données)
- [API Backend](#api-backend)
- [Modaux et UX](#modaux-et-ux)
- [Installation et Usage](#installation-et-usage)
- [Logique Métier](#logique-métier)

## 🎯 Vue d'ensemble

ReactFood est une application de commande de repas qui permet aux utilisateurs de :
- Parcourir un catalogue de repas
- Ajouter des items à leur panier
- Modifier les quantités dans le panier
- Passer commande avec leurs informations personnelles
- Recevoir une confirmation de commande

### Technologies Utilisées

**Frontend:**
- React 18 avec Hooks
- Vite comme bundler
- CSS modules avec design system cohérent
- HTML5 Dialog API pour les modaux

**Backend:**
- Node.js avec Express
- Système de fichiers JSON pour les données
- CORS activé pour les requêtes cross-origin
- Validation des données côté serveur

## 🏗️ Architecture Technique

### Frontend Architecture

```
App.jsx (State Management & Orchestration)
├── Header.jsx (Navigation & Cart Button)
├── Products.jsx (Product Catalog)
├── Cart.jsx (Shopping Cart Modal)
├── Checkout.jsx (Order Form Modal)
└── Success.jsx (Confirmation Modal)
```

### State Management

L'application utilise le state local React avec `useState` pour gérer :
- `cartItems` : Array des produits dans le panier
- `isCartOpen` : Boolean pour l'ouverture du modal Cart
- `isCheckoutOpen` : Boolean pour l'ouverture du modal Checkout  
- `isSuccessOpen` : Boolean pour l'ouverture du modal Success

### Data Flow

```
Backend API → useFetch → Products Display
User Actions → Cart State → Modal Management
Cart State → Checkout → usePostOrder → Backend
```

## 📁 Structure du Projet

```
├── backend/
│   ├── app.js                 # Serveur Express
│   ├── data/
│   │   ├── available-meals.json   # Catalogue des repas
│   │   └── orders.json            # Commandes enregistrées
│   ├── public/images/         # Images des repas
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Header.jsx         # En-tête avec bouton panier
│   │   ├── Products.jsx       # Grille des produits
│   │   ├── Cart.jsx          # Modal panier d'achat
│   │   ├── Checkout.jsx      # Modal formulaire commande
│   │   └── Success.jsx       # Modal confirmation
│   ├── hooks/
│   │   ├── useFetch.js       # Hook fetch données
│   │   └── usePostOrder.js   # Hook envoi commande
│   ├── App.jsx              # Composant principal
│   ├── index.css           # Styles globaux
│   └── main.jsx           # Point d'entrée React
└── README.md
```

## 🧩 Composants Principaux

### App.jsx - Orchestrateur Principal

**Responsabilités:**
- Gestion du state global de l'application
- Orchestration des modaux (ouverture/fermeture)
- Logique métier du panier (ajout, modification, suppression)
- Communication avec les hooks de données

**State Management:**
```javascript
const [cartItems, setCartItems] = useState([]);           // Panier
const [isCartOpen, setIsCartOpen] = useState(false);      // Modal Cart
const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // Modal Checkout
const [isSuccessOpen, setIsSuccessOpen] = useState(false);   // Modal Success
```

**Fonctions Principales:**
- `addToCart(product)` : Ajoute un produit au panier ou incrémente sa quantité
- `updateQuantity(productId, change)` : Modifie la quantité d'un item
- `handleSubmitOrder(orderData)` : Traite la soumission de commande

### Header.jsx - Navigation

**Props:**
- `numberOfItems` : Nombre total d'items dans le panier
- `onCartClick` : Callback pour ouvrir le modal Cart

**Fonctionnalités:**
- Affichage du logo ReactFood
- Bouton panier avec compteur dynamique
- Design responsive

### Products.jsx - Catalogue

**Props:**
- `products` : Array des produits depuis l'API
- `isLoading` : État de chargement
- `error` : Erreurs éventuelles
- `addToCart` : Function pour ajouter au panier

**Logique d'affichage:**
- Grid responsive des produits
- Images servies depuis le backend
- Boutons "Add to Cart" interactifs
- Gestion des états loading/error

### Cart.jsx - Panier Modal

**Props:**
- `cartItems` : Items du panier
- `updateQuantity` : Function modification quantité
- `onClose` : Callback fermeture modal
- `onGoToCheckout` : Callback ouverture checkout

**Fonctionnalités:**
- Affichage liste des items avec quantités
- Boutons +/- pour modifier quantités
- Calcul automatique des sous-totaux et total
- Suppression automatique si quantité = 0
- Transition vers checkout

### Checkout.jsx - Formulaire Commande

**Props:**
- `cartItems` : Items à commander
- `onClose` : Callback fermeture
- `onSubmitOrder` : Callback soumission commande

**Logique du formulaire:**
- State local pour les champs du formulaire
- Validation HTML5 (required, email)
- Construction de l'objet order pour l'API
- Affichage du montant total

### Success.jsx - Confirmation

**Props:**
- `onClose` : Callback fermeture modal

**Fonctionnalités:**
- Message de confirmation élégant
- Information sur l'email de confirmation
- Bouton "Okay" pour fermer

## 🎣 Hooks Personnalisés

### useFetch.js - Récupération de Données

**Usage:** `const {data, isLoading, error} = useFetch(url)`

**Logique:**
1. State initial : `data=null, isLoading=false, error=null`
2. Au mount et changement d'URL : `isLoading=true`
3. Fetch des données avec gestion d'erreur
4. Mise à jour du state selon le résultat

**Gestion d'erreur:**
- Try/catch pour les erreurs réseau
- Vérification `response.ok`
- Error state pour affichage utilisateur

### usePostOrder.js - Envoi Commande

**Usage:** `const {isLoading, error, postOrder} = usePostOrder()`

**Logique:**
1. Function `postOrder(orderData)` asynchrone
2. POST vers `/orders` avec headers JSON
3. Body formaté selon l'API backend
4. Gestion loading/error states
5. Retour des données de réponse

## 🔄 Flux de Données

### 1. Chargement Initial

```
App.jsx → useFetch('http://localhost:3000/meals')
       → Products.jsx (display products)
```

### 2. Ajout au Panier

```
Products.jsx → addToCart(product)
            → App.jsx (update cartItems state)
            → Header.jsx (update counter)
```

### 3. Gestion Panier

```
Header → click "Cart" → openCart()
                     → Cart.jsx modal opens
                     → updateQuantity() → App.jsx state update
```

### 4. Processus Commande

```
Cart → "Go to Checkout" → closeCart() + openCheckout()
                       → Checkout.jsx modal opens
                       → handleSubmit → handleSubmitOrder()
                       → usePostOrder.postOrder()
                       → Backend API call
                       → Success → openSuccess() + reset cart
```

## 🌐 API Backend

### Endpoints

**GET /meals**
- Retourne la liste des repas disponibles
- Format : Array d'objets meal

**POST /orders**
- Accepte une commande complète
- Validation des données client et items
- Sauvegarde dans orders.json

### Structure des Données

**Meal Object:**
```javascript
{
  "id": "m1",
  "name": "Mac & Cheese",
  "price": "8.99",
  "description": "Creamy cheddar cheese...",
  "image": "images/mac-and-cheese.jpg"
}
```

**Order Object:**
```javascript
{
  "order": {
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "street": "123 Main St",
      "postal-code": "12345",
      "city": "New York"
    },
    "items": [
      {
        "id": "m1",
        "name": "Mac & Cheese",
        "price": "8.99",
        "quantity": 2
      }
    ]
  }
}
```

### Validation Backend

- Vérification présence des items
- Validation email (contient @)
- Validation champs requis (nom, adresse, etc.)
- Génération ID unique pour la commande

## 🎭 Modaux et UX

### Système Modal

Tous les modaux utilisent l'HTML5 `<dialog>` element avec :
- `showModal()` pour l'ouverture
- Backdrop cliquable pour fermeture
- Animation CSS `fade-slide-up`
- Classes CSS cohérentes

### Pattern Modal Commun

```javascript
const dialogRef = useRef();

useEffect(() => {
  if (dialogRef.current) {
    dialogRef.current.showModal();
  }
}, []);

function handleClose() {
  if (dialogRef.current) {
    dialogRef.current.close();
  }
  onClose();
}
```

### Design System

**Classes CSS principales:**
- `.modal` : Container modal avec backdrop
- `.center` : Centrage du contenu
- `.modal-actions` : Container des boutons
- `.button` : Bouton principal
- `.text-button` : Bouton secondaire
- `.control` : Container input + label
- `.control-row` : Inputs en ligne

## 🚀 Installation et Usage

### Prérequis

- Node.js 16+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd reactfood-app

# Installer dépendances frontend
npm install

# Installer dépendances backend
cd backend
npm install
cd ..
```

### Lancement

```bash
# Terminal 1 : Backend
cd backend
npm start
# → Serveur sur http://localhost:3000

# Terminal 2 : Frontend
npm run dev
# → App sur http://localhost:5173
```

### Structure npm Scripts

**Frontend (package.json):**
- `npm run dev` : Lancement développement Vite
- `npm run build` : Build production
- `npm run preview` : Preview du build

**Backend (backend/package.json):**
- `npm start` : Lance le serveur Express

## 🧠 Logique Métier

### Gestion du Panier

**Ajout d'item:**
1. Vérifier si l'item existe déjà (`find` par ID)
2. Si existant : incrémenter quantité
3. Si nouveau : ajouter avec quantité = 1

**Modification quantité:**
1. Trouver l'item par ID
2. Appliquer le changement (+1 ou -1)
3. Si quantité ≤ 0 : supprimer l'item
4. Sinon : mettre à jour la quantité

**Calcul des totaux:**
```javascript
// Total items pour compteur
const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

// Total prix pour facturation
const totalPrice = cartItems.reduce((total, item) => {
  return total + (parseFloat(item.price) * item.quantity);
}, 0);
```

### États de l'Application

**Loading States:**
- `isLoadingProducts` : Chargement catalogue
- `isSubmittingOrder` : Envoi commande en cours

**Error Handling:**
- `errorProducts` : Erreur chargement produits
- `orderError` : Erreur envoi commande
- Try/catch dans `handleSubmitOrder`

### Validation et Sécurité

**Frontend:**
- Validation HTML5 (required, type="email")
- State contrôlé pour tous les inputs
- Prévention des soumissions multiples

**Backend:**
- Validation complète des données
- Sanitization des inputs
- Headers CORS appropriés

### Performance

**Optimisations:**
- `useEffect` avec dépendances appropriées
- Event handlers optimisés
- State updates immutables
- Images optimisées et lazy loading

## 🎨 Philosophie Design

**Principes:**
- Design cohérent avec classes CSS réutilisables
- UX fluide avec transitions et animations
- Feedback utilisateur constant (loading, error, success)
- Accessibilité avec labels et semantic HTML

**Responsive Design:**
- Grid CSS pour les produits
- Modaux adaptés mobile/desktop
- Typography scalable avec rem units

---

## 🔧 Maintenance et Évolutions

Pour étendre l'application :

1. **Nouveaux composants** : Suivre le pattern modal existant
2. **Nouveaux hooks** : Respecter les rules of hooks
3. **State management** : Considérer Context API pour état complexe
4. **Styling** : Utiliser les classes CSS existantes

Cette architecture modulaire permet une maintenance facile et des évolutions progressives de l'application. 