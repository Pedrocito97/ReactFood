export default function Header({ numberOfItems, onCartClick }) {
    return (
        <header id='main-header'>
            <div id='title'>
                <img src='/logo.jpg' alt='ReactFood logo' />
                <h1>ReactFood</h1>
            </div>
            <button className="text-button" onClick={onCartClick}>
                Cart({numberOfItems})
            </button>
        </header>
    )
}