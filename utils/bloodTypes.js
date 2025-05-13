function BloodTypeSelect({ value, onChange }) {
    try {
        const bloodTypes = [
            'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
        ];

        return (
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input-field w-full p-3 rounded-lg"
                required
                data-name="blood-type-select"
            >
                <option value="">Select Blood Type</option>
                {bloodTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        );
    } catch (error) {
        console.error('BloodTypeSelect Error:', error);
        reportError(error);
        return null;
    }
}
