import { useState, useEffect } from 'react';

import useFetch from './hooks/useFetch';
import usePostOrder from './hooks/usePostOrder';

import Header from './components/Header';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Success from './components/Success';

function App() {
  // State pour gérer le panier
  const [cartItems, setCartItems] = useState([]);
  // State pour gérer l'ouverture du modal Cart
  const [isCartOpen, setIsCartOpen] = useState(false);
  // State pour gérer l'ouverture du modal Checkout
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  // State pour gérer l'ouverture du modal Success
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const {data: fetchedProducts, isLoading: isLoadingProducts, error: errorProducts} = useFetch('http://localhost:3000/meals');
  const { isLoading: isSubmittingOrder, error: orderError, postOrder } = usePostOrder();

  function addToCart(product) {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si l'item existe déjà, on augmente la quantité
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Sinon, on l'ajoute avec quantité 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }

  function updateQuantity(productId, change) {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) {
            // Si la quantité devient 0 ou moins, on supprime l'item
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean); // Enlève les items null
    });
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function openCheckout() {
    setIsCheckoutOpen(true);
  }

  function closeCheckout() {
    setIsCheckoutOpen(false);
  }

  function openSuccess() {
    setIsSuccessOpen(true);
  }

  function closeSuccess() {
    setIsSuccessOpen(false);
  }

  async function handleSubmitOrder(orderData) {
    try {
      const result = await postOrder(orderData);
      if (result) {
        // Commande réussie
        setCartItems([]); // Vider le panier
        closeCheckout(); // Fermer le checkout
        openSuccess(); // Ouvrir le modal de succès
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    }
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Header numberOfItems={totalItems} onCartClick={openCart} />
      <Products products={fetchedProducts} isLoading={isLoadingProducts} error={errorProducts} addToCart={addToCart} />
      
      {isCartOpen && (
        <Cart 
          cartItems={cartItems} 
          updateQuantity={updateQuantity} 
          onClose={closeCart}
          onGoToCheckout={openCheckout}
        />
      )}

      {isCheckoutOpen && (
        <Checkout
          cartItems={cartItems}
          onClose={closeCheckout}
          onSubmitOrder={handleSubmitOrder}
        />
      )}

      {isSuccessOpen && (
        <Success onClose={closeSuccess} />
      )}

      {isSubmittingOrder && <p className="center">Submitting order...</p>}
      {orderError && <p className="error center">Error: {orderError.message}</p>}
    </>
  );
}

export default App;
