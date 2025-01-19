// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitButton = document.getElementById('contact-submit');

        // Basic validation
        if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
            e.preventDefault();
            showMessage('error', 'Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            e.preventDefault();
            showMessage('error', 'Please enter a valid email address');
            return;
        }

        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    });

    function showMessage(type, message) {
        // Remove any existing message
        const existingError = document.querySelector('.error');
        const existingSuccess = document.querySelector('.success');
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();

        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = type;
        messageElement.textContent = message;

        // Insert message after form
        contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}); 