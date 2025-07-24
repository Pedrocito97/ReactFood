export default function Products({ products, isLoading, error, addToCart }) {
    const BACKEND_URL = 'http://localhost:3000';
    
    if (isLoading) {
        return <p className="center">Loading...</p>;
    }
    
    if (error) {
        return <p className="center error">Error: {error.message}</p>;
    }
    
    return (
        <ul id="meals">
            {products && products.map((product) => (
                <li key={product.id} className="meal-item">
                    <article>
                        <img src={`${BACKEND_URL}/${product.image}`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p className="meal-item-description">{product.description}</p>
                        <p className="meal-item-price">${product.price}</p>
                        <div className="meal-item-actions">
                            <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    </article>
                </li>
            ))}
        </ul>
    );
}