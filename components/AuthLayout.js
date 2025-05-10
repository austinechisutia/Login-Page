function AuthLayout({ children, title, subtitle }) {
    try {
        return (
            <div className="auth-container flex items-center justify-center p-4" data-name="auth-layout">
                <div className="auth-card w-full max-w-md p-8 z-10" data-name="auth-card">
                    <div className="text-center mb-8" data-name="auth-header">
                        <div className="flex items-center justify-center mb-4" data-name="auth-logo">
                            <i className="fas fa-heart text-red-600 text-4xl mr-2"></i>
                            <span className="logo-text">Donais Hospital</span>
                        </div>
                        <h2 className="auth-title mb-2" data-name="auth-title">{title}</h2>
                        <p className="auth-subtitle" data-name="auth-subtitle">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AuthLayout component error:', error);
        reportError(error);
        return null;
    }
}
