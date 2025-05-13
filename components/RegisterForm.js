function RegisterForm({ onToggleForm }) {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            dateOfBirth: '',
            donorId: '',
            phone: '',
            bloodTypes: '',
            location: ''
        });
        const [errors, setErrors] = React.useState({});
        const [loading, setLoading] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setErrors({});
            
            try {
                setLoading(true);
                const validationErrors = validateRegistrationForm(formData);
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    return;
                }

                const result = await registerUser(formData);
                if (result.success) {
                    console.log('Registration successful');
                    onToggleForm();
                } else {
                    setErrors({ form: result.message });
                }
            } catch (error) {
                console.error('Registration error:', error);
                setErrors({ form: 'An error occurred during registration' });
            } finally {
                setLoading(false);
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        return (
            <div data-name="register-form">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png" 
                    alt="Donais Hospital Logo" 
                    className="hospital-logo mx-auto"
                    data-name="hospital-logo"
                />
                <h1 className="auth-title text-center">Donais Hospital</h1>
                <p className="auth-subtitle text-center">Register as a Blood Donor</p>

                <form onSubmit={handleSubmit} className="mt-8" data-name="register-form-container">
                    <Input
                        type="text"
                        label="Nickname"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Enter your full name"
                        data-name="register-name-input"
                    />

                    <Input
                        type="text"
                        label="Donor ID (Optional)"
                        name="donorId"
                        value={formData.donorId}
                        onChange={handleChange}
                        error={errors.donorId}
                        placeholder="Enter your donor ID if you have one"
                        data-name="register-donor-id-input"
                    />

                    <Input
                        type="email"
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="your@email.com"
                        data-name="register-email-input"
                    />

                    <PhoneInput
                        value={formData.phone}
                        onChange={(e) => handleChange({
                            target: {
                                name: 'phone',
                                value: e.target.value
                            }
                        })}
                        error={errors.phone}
                    />

                    <Input
                        type="text"
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        error={errors.location}
                        placeholder="Enter your city and country"
                        data-name="register-location-input"
                    />

                    <Input
                        type="date"
                        label="Date of Birth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        error={errors.dateOfBirth}
                        data-name="register-dob-input"
                    />
                    <BloodGroupInput
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        error={errors.bloodGroup}
                    />


                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Create a password"
                        data-name="register-password-input"
                    />

                    <Input
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        placeholder="Confirm your password"
                        data-name="register-confirm-password-input"
                    />

                    {errors.form && (
                        <p className="form-error mb-4" data-name="register-form-error">{errors.form}</p>
                    )}

                    <Button type="submit" loading={loading} data-name="register-submit-button">
                        Join Esclapian
                    </Button>

                    <p className="mt-4 text-center text-gray-600" data-name="register-login-prompt">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={onToggleForm}
                            className="text-blue-600 hover:underline"
                            data-name="register-login-link"
                        >
                            Sign in here
                        </button>
                    </p>
                </form>
            </div>
        );
    } catch (error) {
        console.error('RegisterForm component error:', error);
        reportError(error);
        return null;
    }
}
