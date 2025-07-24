import { useState } from 'react';

export default function usePostOrder() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function postOrder(orderData) {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order: orderData
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to post order');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, error, postOrder };
}