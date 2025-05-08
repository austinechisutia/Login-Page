function App() {
    try {
        const [isLogin, setIsLogin] = React.useState(true);

        const handleSwitchToRegister = () => setIsLogin(false);
        const handleSwitchToLogin = () => setIsLogin(true);

        return (
            <div data-name="app">
                {isLogin ? (
                    <Login onSwitchToRegister={handleSwitchToRegister} />
                ) : (
                    <Register onSwitchToLogin={handleSwitchToLogin} />
                )}
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
