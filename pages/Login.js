function Login({ onSwitchToRegister }) {
    try {
        const [formData, setFormData] = React.useState({
            email: '',
            password: ''
        });
        const [errors, setErrors] = React.useState({});
        const [isLoading, setIsLoading] = React.useState(false);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        };

        const handleSubmit = async (e) => {
            try {
                e.preventDefault();
                setIsLoading(true);
                
                const validationErrors = validateLoginForm(formData);
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    return;
                }

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log('Login submitted:', formData);
                
            } catch (error) {
                console.error('Login error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <AuthLayout 
                title="Welcome Back" 
                subtitle="Login to continue saving lives"
            >
                <form onSubmit={handleSubmit} data-name="login-form">
                    <Input
                        type="email"
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="Enter your email"
                    />
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Enter your password"
                    />
                    
                    <div className="flex items-center justify-between mb-6" data-name="form-options">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                id="remember"
                                data-name="remember-checkbox"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm text-red-600 hover:text-red-800" data-name="forgot-password">
                            Forgot Password?
                        </a>
                    </div>

                    <div className="flex flex-col gap-4" data-name="form-actions">
                        <Button type="submit" isLoading={isLoading}>
                            Login
                        </Button>
                        <p className="text-center text-gray-600" data-name="register-prompt">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                className="text-red-600 hover:text-red-800"
                                data-name="register-link"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </form>
            </AuthLayout>
        );
    } catch (error) {
        console.error('Login page error:', error);
        reportError(error);
        return null;
    }
}
