// Advanced Website Script
document.addEventListener('DOMContentLoaded', function() {
    // Rotating loading text
    const loadingTexts = [
        "Transform Your Business with AI-Powered Websites",
        "Building the Future of Your Business",
        "Launching Your AI-Powered Success",
        "Future-Proof Your Business",
        "Get Ready for Your AI-Powered Business Website"
    ];
    
    let currentTextIndex = 0;
    const loadingTextElement = document.querySelector('.loading-text');
    
    // Rotate text every 400ms
    const textRotationInterval = setInterval(() => {
        if (loadingTextElement) {
            loadingTextElement.textContent = loadingTexts[currentTextIndex];
            currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
        }
    }, 400);
    
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            clearInterval(textRotationInterval); // Stop text rotation
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }
    }, 1200);

    // Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
    } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form handling with Formspree and site notification
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Set reply-to field to user's email
            const emailField = contactForm.querySelector('input[name="email"]');
            const replyToField = contactForm.querySelector('input[name="_replyto"]');
            if (emailField && replyToField) {
                replyToField.value = emailField.value;
            }
            
            try {
                // Submit to Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success - show site notification
                    showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                } else {
                    // Error - show error notification
                    const data = await response.json();
                    if (data.errors) {
                        showNotification('There was an error sending your message. Please try again.', 'error');
                    } else {
                        showNotification('Thank you! Your message has been sent successfully.', 'success');
                        contactForm.reset();
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('There was an error sending your message. Please try again or contact us directly.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Pricing card animations
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const price = card.querySelector('.pricing-price');
            if (price) {
                price.style.transform = 'scale(1.1)';
                price.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const price = card.querySelector('.pricing-price');
            if (price) {
                price.style.transform = 'scale(1)';
        }
    });
});

    // Parallax effects - removed floating elements

    // AI Chat Widget
    createAIChatWidget();
    
});

async function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Use the email service to send the email
        const result = await emailService.sendEmail(data);
        
        if (result.success) {
            showNotification(result.message, 'success');
            form.reset();
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('An error occurred. Please try again or contact us directly.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function formatEmailData(data) {
    const timestamp = new Date().toLocaleString();
    
    return {
        to_email: 'zanelafaverr@gmail.com',
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        service: data.service || 'Not specified',
        budget: data.budget || 'Not specified',
        message: data.message || 'No additional details provided',
        timestamp: timestamp,
        subject: `New Webly Industries Contact: ${data.service || 'General Inquiry'} - ${data.name}`,
        formatted_message: `
NEW CLIENT INQUIRY - WEBLY INDUSTRIES
=====================================

Contact Information:
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone || 'Not provided'}

Service Details:
• Service Interest: ${data.service || 'Not specified'}
• Budget Range: ${data.budget || 'Not specified'}

Project Details:
${data.message || 'No additional details provided'}

Submission Details:
• Submitted: ${timestamp}
• Source: Webly Industries Website Contact Form
• IP Address: ${getClientIP()}

---
This message was automatically generated from the Webly Industries contact form.
        `.trim()
    };
}

function sendEmail(emailData, submitBtn, originalText, form) {
    // Using EmailJS for reliable email delivery
    const serviceId = 'service_webly_industries';
    const templateId = 'template_contact_form';
    const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // You'll need to get this from EmailJS
    
    // For now, we'll use a fallback method that works without EmailJS
    sendEmailFallback(emailData, submitBtn, originalText, form);
}

function sendEmailFallback(emailData, submitBtn, originalText, form) {
    // Create mailto link as fallback
    const mailtoLink = `mailto:${emailData.to_email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.formatted_message)}`;
    
    // Try to open email client
    try {
        window.location.href = mailtoLink;
        showNotification('Email client opened! Please send the pre-filled email.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    } catch (error) {
        // Fallback: Copy to clipboard
        copyToClipboard(emailData.formatted_message);
        showNotification('Email content copied to clipboard! Please paste it into your email client.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function getClientIP() {
    // This is a simplified version - in production you'd get this from your server
    return 'Client IP not available (requires server-side implementation)';
}

function createAIChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.id = 'aiChatWidget';
    chatWidget.innerHTML = `
        <div class="chat-toggle" onclick="toggleAIChat()">
            <span>🤖</span>
        </div>
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <h4>AI Assistant</h4>
                <button onclick="toggleAIChat()">×</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="ai-message">
                    Hi! I'm your AI assistant. How can I help you today?
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="chatInput" placeholder="Ask me anything...">
                <button onclick="sendAIMessage()">Send</button>
            </div>
        </div>
    `;
    
    chatWidget.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
    `;
    
    document.body.appendChild(chatWidget);
    addChatStyles();
}

function addChatStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .chat-toggle {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
            transition: all 0.3s ease;
        }
        
        .chat-toggle:hover {
            transform: scale(1.1);
        }
        
        .chat-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            display: none;
            flex-direction: column;
        }
        
        .chat-header {
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
        }
        
        .chat-messages {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
        }
        
        .ai-message, .user-message {
            margin-bottom: 1rem;
            padding: 0.8rem;
            border-radius: 10px;
            max-width: 80%;
            color: white;
        }
        
        .ai-message {
            background: rgba(99, 102, 241, 0.2);
            margin-right: auto;
        }
        
        .user-message {
            background: rgba(236, 72, 153, 0.2);
            margin-left: auto;
        }
        
        .chat-input {
            padding: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            gap: 0.5rem;
        }
        
        .chat-input input {
            flex: 1;
            padding: 0.8rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            color: white;
        }
        
        .chat-input button {
            padding: 0.8rem 1.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 10px;
            color: white;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

function toggleAIChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    }
}

function sendAIMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    
    if (input.value.trim()) {
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.textContent = input.value;
        messages.appendChild(userMessage);
        
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'ai-message';
            aiMessage.textContent = generateAIResponse(input.value);
            messages.appendChild(aiMessage);
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
        
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }
}

function generateAIResponse(userInput) {
    const responses = [
        "That's a great question! Let me help you with that.",
        "I understand you're interested in our services. What specific features are you looking for?",
        "Based on your inquiry, I'd recommend our Professional package. Would you like to know more?",
        "I can help you choose the perfect plan for your business. What's your budget range?",
        "Our team specializes in exactly what you're looking for. Let's schedule a consultation!",
        "That's an interesting project! I'd love to discuss the details with you."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
