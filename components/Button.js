function Button({ onClick, children, type = 'button', variant = 'primary', isLoading = false }) {
    try {
        const baseStyles = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
        const variants = {
            primary: "bg-red-600 hover:bg-red-700 text-white",
            secondary: "bg-gray-600 hover:bg-gray-700 text-white"
        };

        return (
            <button
                type={type}
                className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={onClick}
                disabled={isLoading}
                data-name="button"
            >
                {isLoading ? (
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
