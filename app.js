
function App() {
    try {
        const [isLogin, setIsLogin] = React.useState(true);

        const toggleForm = () => {
            setIsLogin(!isLogin);
        };

        return (
            <div className="auth-container flex items-center justify-center p-4" data-name="auth-container">
                <div className="auth-card w-full max-w-md p-8" data-name="auth-card">
                    {isLogin ? (
                        <LoginForm onToggleForm={toggleForm} />
                    ) : (
                        <RegisterForm onToggleForm={toggleForm} />
                    )}
                </div>
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
