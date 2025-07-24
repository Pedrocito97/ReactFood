import { useEffect, useRef, useState } from 'react';

export default function Checkout({ cartItems, onClose, onSubmitOrder }) {
    const dialogRef = useRef();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        street: '',
        postalCode: '',
        city: ''
    });

    useEffect(() => {
        // Ouvrir le modal automatiquement
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

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        // Créer l'objet de commande
        const orderData = {
            customer: {
                name: formData.fullName,
                email: formData.email,
                street: formData.street,
                'postal-code': formData.postalCode,
                city: formData.city
            },
            items: cartItems
        };

        onSubmitOrder(orderData);
    }

    // Calcul du total
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.quantity);
    }, 0);

    return (
        <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                
                <div className="cart-total">
                    <p>Total Amount: ${totalPrice.toFixed(2)}</p>
                </div>

                <div className="control">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="control">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="control">
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="control-row">
                    <div className="control">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="control">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="modal-actions">
                    <button type="button" className="text-button" onClick={handleClose}>
                        Close
                    </button>
                    <button type="submit" className="button">
                        Submit Order
                    </button>
                </div>
            </form>
        </dialog>
    );
} 