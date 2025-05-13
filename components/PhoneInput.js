const countryCodes = [
    { country: 'United States', code: '+1' },
    { country: 'United Kingdom', code: '+44' },
    { country: 'China', code: '+86' },
    { country: 'India', code: '+91' },
    { country: 'Japan', code: '+81' },
    { country: 'Germany', code: '+49' },
    { country: 'France', code: '+33' },
    { country: 'Italy', code: '+39' },
    { country: 'Canada', code: '+1' },
    { country: 'Australia', code: '+61' },
    // Add more country codes as needed
];

function PhoneInput({ value, onChange, error, ...props }) {
    try {
        const [countryCode, setCountryCode] = React.useState('+1');
        const [phoneNumber, setPhoneNumber] = React.useState('');
        const [searchTerm, setSearchTerm] = React.useState('');
        const [isOpen, setIsOpen] = React.useState(false);
        const dropdownRef = React.useRef(null);

        React.useEffect(() => {
            // Only trigger onChange when we have both country code and phone number
            if (phoneNumber) {
                onChange({
                    target: {
                        name: 'phone',
                        value: `${countryCode}${phoneNumber}`
                    }
                });
            }
        }, [countryCode, phoneNumber, onChange]);

        React.useEffect(() => {
            function handleClickOutside(event) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                    setSearchTerm('');
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const handlePhoneChange = (e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 15);
            setPhoneNumber(value);
        };

        const handleKeyPress = (e) => {
            const key = e.key.toLowerCase();
            if (key.length === 1 && /[a-z]/.test(key)) {
                setSearchTerm(prev => prev + key);
            }
        };

        const filteredCountries = countryCodes.filter(country => 
            country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.code.includes(searchTerm)
        );

        return (
            <div className="mb-4" data-name="phone-input-container">
                <label className="block text-sm font-medium text-white mb-1">
                    Mobile Number
                </label>
                <div className="flex gap-2" data-name="phone-input-wrapper">
                    <div className="relative w-48" data-name="country-select-container">
                        <button
                            type="button"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            onClick={() => setIsOpen(!isOpen)}
                            onKeyDown={handleKeyPress}
                            data-name="country-select-button"
                        >
                            <span>{countryCode} {countryCodes.find(c => c.code === countryCode)?.country}</span>
                            <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} float-right mt-1`}></i>
                        </button>
                        {isOpen && (
                            <div 
                                ref={dropdownRef}
                                className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto" 
                                data-name="country-dropdown"
                            >
                                {filteredCountries.map((country) => (
                                    <button
                                        key={`${country.code}-${country.country}`}
                                        type="button"
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                                        onClick={() => {
                                            setCountryCode(country.code);
                                            setIsOpen(false);
                                            setSearchTerm('');
                                        }}
                                        data-name="country-option"
                                    >
                                        <span>{country.country}</span>
                                        <span className="text-gray-500">{country.code}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <input
                        type="tel"
                        className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                        }`}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Enter phone number"
                        maxLength="15"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        {...props}
                        data-name="phone-number-input"
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-600" data-name="phone-input-error">
                        {error}
                    </p>
                )}
            </div>
        );
    } catch (error) {
        console.error('PhoneInput component error:', error);
        reportError(error);
        return null;
    }
}
