function Register({ onSwitchToLogin }) {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
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

                const validationErrors = validateRegisterForm(formData);
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    return;
                }

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log('Registration submitted:', formData);

            } catch (error) {
                console.error('Registration error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <AuthLayout 
            title="Create Account" 
            subtitle="Join us in saving lives through blood donation"
            >
            <form onSubmit={handleSubmit} data-name="register-form">
                <Input
                type="text"
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Enter your full name"
                />
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
                placeholder="Create a password"
                />
                <Input
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                />
                <Input
                type="date"
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                error={errors.dob}
                placeholder="Select your date of birth"
                />
                <Input
                type="text"
                label="Donor ID (Optional)"
                name="donorId"
                value={formData.donorId}
                onChange={handleChange}
                error={errors.donorId}
                placeholder="Enter your donor ID (if any)"
                />
                <Input
                type="tel"
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                error={errors.mobile}
                placeholder="Enter your mobile number"
                />
                <Input
                type="text"
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                placeholder="Enter your location"
                />

                <div className="flex flex-col gap-4 mt-6" data-name="form-actions">
                <Button type="submit" isLoading={isLoading}>
                    Create Account
                </Button>
                <p className="text-center text-gray-600" data-name="login-prompt">
                    Already have an account?{' '}
                    <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-red-600 hover:text-red-800"
                    data-name="login-link"
                    >
                    Login
                    </button>
                </p>
                </div>
            </form>
            </AuthLayout>
        );
    } catch (error) {
        console.error('Register page error:', error);
        reportError(error);
        return null;
    }
}
