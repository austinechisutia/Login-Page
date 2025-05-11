function Button({ children, onClick, loading, ...props }) {
    try {
        return (
            <button
                onClick={onClick}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400"
                disabled={loading}
                data-name="button"
                {...props}
            >
                {loading ? (
                    <span data-name="button-loading">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Loading...
                    </span>
                ) : children}
            </button>
        );
    } catch (error) {
        console.error('Button component error:', error);
        reportError(error);
        return null;
    }
}
