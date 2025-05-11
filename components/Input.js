function Input({ type, label, value, onChange, error, placeholder, ...props }) {
    try {
        return (
            <div className="mb-4" data-name="input-container">
                <label className="form-label" data-name="input-label">
                    {label}
                </label>
                <input
                    type={type}
                    className={`form-input ${error ? 'border-red-500' : ''}`}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    {...props}
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
