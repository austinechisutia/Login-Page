function LoginForm({ onToggleForm }) {
    try {
        const [formData, setFormData] = React.useState({
            email: '',
            password: ''
        });
        const [errors, setErrors] = React.useState({});
        const [loading, setLoading] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setErrors({});
            
            try {
                setLoading(true);
                const validationErrors = validateLoginForm(formData);
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    return;
                }

                const result = await loginUser(formData);
                if (result.success) {
                    console.log('Login successful');
                } else {
                    setErrors({ form: result.message });
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrors({ form: 'An error occurred during login' });
            } finally {
                setLoading(false);
            }
        };

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        return (
            <div data-name="login-form">
                <div className="text-center mb-8" data-name="hospital-header">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png" 
                            alt="Donais Hospital Logo" 
                            className="hospital-logo"
                            data-name="hospital-logo"
                        />
                        <i className="fas fa-heart text-red-500 text-3xl"></i>
                    </div>
                    <h1 className="auth-title">Donais Hospital</h1>
                    <p className="auth-subtitle">Welcome to Blood Donation System</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8" data-name="login-form-container">
                    <Input
                        type="email"
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="Enter your email"
                        data-name="login-email-input"
                    />

                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Enter your password"
                        data-name="login-password-input"
                    />

                    {errors.form && (
                        <p className="form-error mb-4" data-name="login-form-error">{errors.form}</p>
                    )}

                    <Button type="submit" loading={loading} data-name="login-submit-button">
                        Login
                    </Button>

                    <p className="mt-4 text-center text-gray-600" data-name="login-register-prompt">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={onToggleForm}
                            className="text-blue-600 hover:underline"
                            data-name="login-register-link"
                        >
                            Register here
                        </button>
                    </p>
                </form>
            </div>
        );
    } catch (error) {
        console.error('LoginForm component error:', error);
        reportError(error);
        return null;
    }
}
