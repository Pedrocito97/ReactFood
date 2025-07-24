import { useEffect, useRef } from 'react';

export default function Cart({ cartItems, updateQuantity, onClose, onGoToCheckout }) {
    const dialogRef = useRef();

    useEffect(() => {
        // Ouvrir le modal automatiquement quand le composant se monte
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

    // Fermer le modal si on clique sur le backdrop
    function handleBackdropClick(e) {
        if (e.target === dialogRef.current) {
            handleClose();
        }
    }

    function handleGoToCheckout() {
        handleClose(); // Fermer le cart
        onGoToCheckout(); // Ouvrir le checkout
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
                <div className="cart">
                    <h2>Your Cart</h2>
                    <p>Your cart is empty.</p>
                    <div className="modal-actions">
                        <button className="text-button" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        );
    }

    // Calcul du total général
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.quantity);
    }, 0);

    return (
        <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
            <div className="cart">
                <h2>Your Cart</h2>
                <ul>
                    {cartItems.map((item) => {
                        const itemTotal = parseFloat(item.price) * item.quantity;
                        return (
                            <li key={item.id} className="cart-item">
                                <p>{item.name} - ${item.price} each</p>
                                <div className="cart-item-actions">
                                    <button onClick={() => updateQuantity && updateQuantity(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity && updateQuantity(item.id, 1)}>+</button>
                                    <span>${itemTotal.toFixed(2)}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className="cart-total">
                    <strong>Total: ${totalPrice.toFixed(2)}</strong>
                </div>
                <div className="modal-actions">
                    <button className="text-button" onClick={handleClose}>
                        Close
                    </button>
                    <button className="button" onClick={handleGoToCheckout}>
                        Go to Checkout
                    </button>
                </div>
            </div>
        </dialog>
    );
}