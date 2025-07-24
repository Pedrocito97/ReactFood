import { useEffect, useRef } from 'react';

export default function Success({ onClose }) {
    const dialogRef = useRef();

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

    return (
        <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
            <div className="center">
                <h2>Success!</h2>
                <p>Your order was submitted successfully!</p>
                <p>We sent you an email with your order details and expected delivery time.</p>
                <div className="modal-actions">
                    <button className="button" onClick={handleClose}>
                        Okay
                    </button>
                </div>
            </div>
        </dialog>
    );
} 