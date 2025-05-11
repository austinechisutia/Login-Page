function PhoneInput({ value, onChange, error, ...props }) {
    try {
        const [countryCode, setCountryCode] = React.useState('+1');
        const [phoneNumber, setPhoneNumber] = React.useState('');
        const [searchTerm, setSearchTerm] = React.useState('');
        const [isOpen, setIsOpen] = React.useState(false);
        const dropdownRef = React.useRef(null);

        React.useEffect(() => {
            onChange({
                target: {
                    name: 'phone',
                    value: `${countryCode}${phoneNumber}`
                }
            });
        }, [countryCode, phoneNumber]);

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
            const value = e.target.value.replace(/\D/g, '');
            setPhoneNumber(value);
        };

        const handleKeyPress = (e) => {
            const key = e.key.toLowerCase();
            if (key.length === 1 && /[a-z]/.test(key)) {
                setSearchTerm(key);
            }
        };

        const filteredCountries = countryCodes.filter(country => 
            country.country.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
            country.code.includes(searchTerm)
        );

        return (
            <div className="mb-4" data-name="phone-input-container">
                <label className="form-label" data-name="phone-input-label">
                    Mobile Number
                </label>
                <div className="flex gap-2" data-name="phone-input-wrapper">
                    <div className="relative w-48" data-name="country-select-container">
                        <button
                            type="button"
                            className="form-input w-full text-left flex items-center justify-between"
                            onClick={() => setIsOpen(!isOpen)}
                            onKeyDown={handleKeyPress}
                            data-name="country-select-button"
                        >
                            <span>{countryCode} {countryCodes.find(c => c.code === countryCode)?.country}</span>
                            <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
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
                        className={`form-input flex-1 ${error ? 'border-red-500' : ''}`}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Enter phone number"
                        {...props}
                        data-name="phone-number-input"
                    />
                </div>
                {error && <p className="form-error" data-name="phone-input-error">{error}</p>}
            </div>
        );
    } catch (error) {
        console.error('PhoneInput component error:', error);
        reportError(error);
        return null;
    }
}
