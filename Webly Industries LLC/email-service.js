// Email Service for Webly Industries Contact Form
// This handles automatic email sending to zanelafaverr@gmail.com

class EmailService {
    constructor() {
        this.recipientEmail = 'zanelafaverr@gmail.com';
        this.serviceId = 'service_5mah61p';
        this.templateId = 'template_csb3b07';
        this.publicKey = 'dyre1_fX8qkOs9Zif';
    }

    // Format contact form data into a professional email
    formatContactEmail(formData) {
        const timestamp = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });

        const serviceMap = {
            'starter': 'Starter Package ($300 installment)',
            'professional': 'Professional Package ($7,999)',
            'enterprise': 'Enterprise Package ($19,999)',
            'maintenance': 'Monthly Maintenance Service',
            'consultation': 'Free Consultation'
        };

        const budgetMap = {
            '300-1200': '$300 - $1,200',
            '1200-3000': '$1,200 - $3,000',
            '3000-5000': '$3,000 - $5,000',
            '5000-plus': '$5,000+',
            '15000-plus': '$15,000+'
        };

        return {
            to_email: this.recipientEmail,
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone || 'Not provided',
            service: serviceMap[formData.service] || formData.service || 'Not specified',
            budget: budgetMap[formData.budget] || formData.budget || 'Not specified',
            message: formData.message || 'No additional details provided',
            timestamp: timestamp,
            subject: `🚀 New Webly Industries Lead: ${formData.service || 'General Inquiry'} - ${formData.name}`,
            
            // Formatted email body
            formatted_message: `
🎯 NEW CLIENT INQUIRY - WEBLY INDUSTRIES
========================================

👤 CONTACT INFORMATION
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone || 'Not provided'}

💼 SERVICE DETAILS
• Service Interest: ${serviceMap[formData.service] || formData.service || 'Not specified'}
• Budget Range: ${budgetMap[formData.budget] || formData.budget || 'Not specified'}

📝 PROJECT DETAILS
${formData.message || 'No additional details provided'}

📊 SUBMISSION INFO
• Submitted: ${timestamp}
• Source: Webly Industries Website
• Form: Contact Form
• Priority: ${this.getPriority(formData.service, formData.budget)}

🎯 RECOMMENDED ACTION
${this.getRecommendedAction(formData.service, formData.budget)}

---
This lead was automatically generated from the Webly Industries contact form.
Reply directly to this email to respond to the client.
            `.trim()
        };
    }

    // Determine priority based on service and budget
    getPriority(service, budget) {
        if (service === 'enterprise' || budget === '15000-plus') return 'HIGH PRIORITY';
        if (service === 'professional' || budget === '5000-plus') return 'MEDIUM PRIORITY';
        return 'STANDARD';
    }

    // Get recommended action based on inquiry
    getRecommendedAction(service, budget) {
        if (service === 'consultation') {
            return 'Schedule free consultation call within 24 hours';
        }
        if (service === 'maintenance') {
            return 'Send maintenance service details and pricing';
        }
        if (budget === '15000-plus' || service === 'enterprise') {
            return 'Schedule high-priority discovery call within 4 hours';
        }
        return 'Send detailed proposal and schedule follow-up call';
    }

    // Initialize EmailJS
    initializeEmailJS() {
        if (typeof emailjs !== 'undefined' && this.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
            emailjs.init(this.publicKey);
            return true;
        }
        return false;
    }

    // Send email using EmailJS (recommended method)
    async sendEmailWithEmailJS(formData) {
        try {
            console.log('🔍 Starting EmailJS send process...');
            
            // Check if EmailJS is loaded and initialized
            if (typeof emailjs === 'undefined') {
                console.error('❌ EmailJS not loaded');
                throw new Error('EmailJS not loaded');
            }

            console.log('✅ EmailJS loaded successfully');

            if (!this.initializeEmailJS()) {
                console.error('❌ EmailJS not properly configured');
                throw new Error('EmailJS not properly configured');
            }

            console.log('✅ EmailJS initialized successfully');

            const emailData = this.formatContactEmail(formData);
            console.log('📧 Email data formatted:', emailData);
            
            console.log('🚀 Sending email with EmailJS...');
            const result = await emailjs.send(
                this.serviceId,
                this.templateId,
                {
                    to_email: emailData.to_email,
                    from_name: emailData.from_name,
                    from_email: emailData.from_email,
                    phone: emailData.phone,
                    service: emailData.service,
                    budget: emailData.budget,
                    message: emailData.message,
                    timestamp: emailData.timestamp,
                    subject: emailData.subject,
                    formatted_message: emailData.formatted_message
                }
            );

            console.log('✅ Email sent successfully!', result);
            return { success: true, result };
        } catch (error) {
            console.error('❌ EmailJS error:', error);
            return { success: false, error: error.message };
        }
    }

    // Fallback method using mailto
    sendEmailWithMailto(formData) {
        const emailData = this.formatContactEmail(formData);
        const mailtoLink = `mailto:${emailData.to_email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.formatted_message)}`;
        
        try {
            window.location.href = mailtoLink;
            return { success: true, method: 'mailto' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Copy to clipboard as final fallback
    copyToClipboard(formData) {
        const emailData = this.formatContactEmail(formData);
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(emailData.formatted_message);
            return { success: true, method: 'clipboard' };
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = emailData.formatted_message;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return { success: true, method: 'clipboard_fallback' };
        }
    }

    // Main method to handle email sending with fallbacks
    async sendEmail(formData) {
        console.log('🚀 Starting email send process...', formData);
        
        // Try EmailJS first
        console.log('📧 Attempting EmailJS send...');
        const emailjsResult = await this.sendEmailWithEmailJS(formData);
        console.log('📧 EmailJS result:', emailjsResult);
        
        if (emailjsResult.success) {
            console.log('✅ EmailJS successful!');
            return { success: true, method: 'emailjs', message: 'Email sent successfully via EmailJS!' };
        }

        console.log('⚠️ EmailJS failed, trying mailto fallback...');
        // Try mailto as fallback
        const mailtoResult = this.sendEmailWithMailto(formData);
        console.log('📧 Mailto result:', mailtoResult);
        
        if (mailtoResult.success) {
            console.log('✅ Mailto successful!');
            return { success: true, method: 'mailto', message: 'Email client opened! Please send the pre-filled email.' };
        }

        console.log('⚠️ Mailto failed, trying clipboard fallback...');
        // Final fallback: copy to clipboard
        const clipboardResult = this.copyToClipboard(formData);
        console.log('📧 Clipboard result:', clipboardResult);
        
        if (clipboardResult.success) {
            console.log('✅ Clipboard successful!');
            return { success: true, method: 'clipboard', message: 'Email content copied to clipboard! Please paste it into your email client.' };
        }

        console.log('❌ All methods failed');
        return { success: false, message: 'Failed to send email. Please try again or contact us directly.' };
    }
}

// Initialize email service
const emailService = new EmailService();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
}
