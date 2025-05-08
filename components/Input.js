function Input({ type, label, value, onChange, error, placeholder, name }) {
    try {
        return (
            <div className="mb-4" data-name="input-container">
                <label className="block text-gray-700 text-sm font-bold mb-2" data-name="input-label">
                    {label}
                </label>
                <input
                    type={type}
                    name={name}
                    className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    data-name="input-field"
                />
                {error && <p className="form-error" data-name="input-error">{error}</p>}
            </div>
        );
    } catch (error) {
        console.error('Input component error:', error);
        reportError(error);
        return null;
    }
}
