// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitButton = document.getElementById('contact-submit');

        // Basic validation
        if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
            showMessage('error', 'Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showMessage('error', 'Please enter a valid email address');
            return;
        }

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    _replyto: emailInput.value,
                    _subject: subjectInput.value,
                    message: messageInput.value
                })
            });

            const result = await response.json();

            if (response.ok) {
                showMessage('success', 'Thank you! Your message has been sent successfully.');
                contactForm.reset();
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (error) {
            showMessage('error', 'Sorry, there was an error sending your message. Please try again later.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
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