function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validatePhone(phone) {
    return phone.length >= 10;
}

function validateDateOfBirth(dateOfBirth) {
    const date = new Date(dateOfBirth);
    const today = new Date();
    const minAge = 18;
    const maxAge = 65;
    
    const age = today.getFullYear() - date.getFullYear();
    return age >= minAge && age <= maxAge;
}

function validateLoginForm(data) {
    const errors = {};

    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!validateEmail(data.email)) {
        errors.email = 'Invalid email format';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    }

    return errors;
}

function validateRegistrationForm(data) {
    const errors = {};

    if (!data.name) {
        errors.name = 'Name is required';
    }

    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!validateEmail(data.email)) {
        errors.email = 'Invalid email format';
    }

    if (!data.phone) {
        errors.phone = 'Phone number is required';
    } else if (!validatePhone(data.phone)) {
        errors.phone = 'Invalid phone number';
    }

    if (!data.location) {
        errors.location = 'Location is required';
    }

    if (!data.dateOfBirth) {
        errors.dateOfBirth = 'Date of birth is required';
    } else if (!validateDateOfBirth(data.dateOfBirth)) {
        errors.dateOfBirth = 'You must be between 18 and 65 years old to donate blood';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    } else if (!validatePassword(data.password)) {
        errors.password = 'Password must be at least 8 characters long';
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}
