const bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

function BloodGroupInput({ value, onChange, error, ...props }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const dropdownRef = React.useRef(null);

    const handleKeyPress = (e) => {
        const key = e.key.toLowerCase();
        if (key.length === 1 && /[a-z+-]/i.test(key)) {
            setSearchTerm(prev => prev + key);
        }
    };

    const filteredGroups = bloodGroups.filter(group =>
        group.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    return (
        <div className="mb-4" data-name="blood-group-input-container">
            <label className="block text-sm font-medium text-white mb-1">
                Blood Group
            </label>
            <div className="relative" data-name="blood-group-select-wrapper">
                <button
                    type="button"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={handleKeyPress}
                    data-name="blood-group-select-button"
                >
                    <span>{value || 'Select Blood Group'}</span>
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} float-right mt-1`}></i>
                </button>
                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
                        data-name="blood-group-dropdown"
                    >
                        {filteredGroups.map((group) => (
                            <button
                                key={group}
                                type="button"
                                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => {
                                    onChange({
                                        target: {
                                            name: 'bloodGroup',
                                            value: group
                                        }
                                    });
                                    setIsOpen(false);
                                    setSearchTerm('');
                                }}
                                data-name="blood-group-option"
                            >
                                {group}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600" data-name="blood-group-input-error">
                    {error}
                </p>
            )}
        </div>
    );
}
