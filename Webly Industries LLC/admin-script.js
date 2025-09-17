// Advanced Admin Dashboard - Enhanced for Industry-Leading Website
// Sample message data (in a real app, this would come from a database)
const sampleMessages = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        subject: "Advanced Website Development Inquiry",
        message: "Hi Webly Industries team, I came across your revolutionary website and I'm blown away by the 3D graphics and AI features! We need a cutting-edge website for our tech startup. Can we discuss your Professional package?",
        timestamp: "2024-01-15T10:30:00Z",
        status: "new",
        phone: "+1 (555) 123-4567",
        budget: "5000-plus",
        service: "professional"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@company.com",
        subject: "Enterprise WebGL Application",
        message: "Hello! I'm amazed by your 3D WebGL graphics and AI-powered features! We need an enterprise-level application with custom WebGL and advanced AI integration. Your Enterprise package looks perfect for our needs.",
        timestamp: "2024-01-14T15:45:00Z",
        status: "replied",
        phone: "+1 (555) 987-6543",
        budget: "15000-plus",
        service: "enterprise"
    },
    {
        id: 3,
        name: "Mike Chen",
        email: "mike.chen@startup.io",
        subject: "AI-Powered Website Partnership",
        message: "Hi Webly Industries team, I'm the founder of a tech startup and I'm blown away by your AI-powered features and personalized recommendations! Your background in cutting-edge web development aligns perfectly with our vision. Let's discuss a partnership for our next project!",
        timestamp: "2024-01-13T09:15:00Z",
        status: "read",
        phone: "+1 (555) 456-7890",
        budget: "3000-5000",
        service: "consultation"
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@designstudio.com",
        subject: "3D Design Collaboration",
        message: "Your 3D WebGL graphics and advanced animations are absolutely stunning! I'm a UI/UX designer specializing in 3D interfaces and I'd love to collaborate on client projects. Your Professional package with 3D graphics would be perfect for our design studio!",
        timestamp: "2024-01-12T14:20:00Z",
        status: "new",
        phone: "+1 (555) 321-0987",
        budget: "5000-plus",
        service: "professional"
    },
    {
        id: 5,
        name: "David Wilson",
        email: "david.wilson@techcorp.com",
        subject: "Advanced Technology Partnership",
        message: "We're a Fortune 500 tech company and we're amazed by your advanced website technologies! We'd love to discuss a partnership for our digital transformation projects. Your Enterprise package with custom WebGL and AI integration would be perfect for our needs.",
        timestamp: "2024-01-11T11:30:00Z",
        status: "read",
        phone: "+1 (555) 654-3210",
        budget: "15000-plus",
        service: "enterprise"
    },
    {
        id: 6,
        name: "Lisa Rodriguez",
        email: "lisa@smallbiz.com",
        subject: "Small Business Website Inquiry",
        message: "Hi Webly Industries! I'm starting a small local business and need a simple but professional website. I've seen your work and it's amazing! What can you do for a smaller budget?",
        timestamp: "2024-01-10T16:45:00Z",
        status: "new",
        phone: "+1 (555) 789-0123",
        budget: "300-1200",
        service: "starter"
    }
];

// Initialize the advanced admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();
    updateStatistics();
    loadRecentActivity();
    initializeAdvancedFeatures();
    setupRealTimeUpdates();
    initializeAnalytics();
});

// Advanced Features for Industry-Leading Admin Dashboard
function initializeAdvancedFeatures() {
    // Add advanced filtering and search
    addAdvancedFilters();
    
    // Add AI-powered insights
    addAIInsights();
    
    // Add real-time notifications
    setupRealTimeNotifications();
    
    // Add advanced analytics dashboard
    createAnalyticsDashboard();
}

function addAdvancedFilters() {
    // Enhanced filtering with AI-powered suggestions
    const filterContainer = document.querySelector('.filter-container') || createFilterContainer();
    
    const aiFilter = document.createElement('div');
    aiFilter.className = 'ai-filter-section';
    aiFilter.innerHTML = `
        <h3>🤖 AI-Powered Insights</h3>
        <div class="ai-insights">
            <div class="insight-card">
                <span class="insight-icon">📈</span>
                <div class="insight-content">
                    <h4>High-Value Leads</h4>
                    <p>${getHighValueLeadsCount()} leads with $5k+ budget</p>
                </div>
            </div>
            <div class="insight-card">
                <span class="insight-icon">⚡</span>
                <div class="insight-content">
                    <h4>Hot Prospects</h4>
                    <p>${getHotProspectsCount()} leads viewed pricing in last 24h</p>
                </div>
            </div>
            <div class="insight-card">
                <span class="insight-icon">🎯</span>
                <div class="insight-content">
                    <h4>Conversion Rate</h4>
                    <p>${getConversionRate()}% of leads convert to clients</p>
                </div>
            </div>
        </div>
    `;
    
    filterContainer.appendChild(aiFilter);
}

function createFilterContainer() {
    const container = document.createElement('div');
    container.className = 'filter-container';
    container.style.cssText = `
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 2rem;
        margin-bottom: 2rem;
    `;
    
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
        messagesContainer.insertBefore(container, messagesContainer.firstChild);
    }
    
    return container;
}

function getHighValueLeadsCount() {
    return sampleMessages.filter(msg => 
        msg.budget === '5000-plus' || msg.budget === '15000-plus'
    ).length;
}

function getHotProspectsCount() {
    // Simulate hot prospects (leads that viewed pricing recently)
    return Math.floor(Math.random() * 5) + 2;
}

function getConversionRate() {
    // Simulate conversion rate
    return Math.floor(Math.random() * 20) + 15;
}

function addAIInsights() {
    // AI-powered lead scoring and recommendations
    const insights = document.createElement('div');
    insights.className = 'ai-insights-panel';
    insights.innerHTML = `
        <h3>🧠 AI Recommendations</h3>
        <div class="recommendations">
            <div class="recommendation">
                <span class="priority high">High Priority</span>
                <p>Follow up with John Smith - Enterprise lead showing strong interest</p>
                <button onclick="followUpLead(1)">Follow Up Now</button>
            </div>
            <div class="recommendation">
                <span class="priority medium">Medium Priority</span>
                <p>Sarah Johnson is ready for a demo - schedule a call</p>
                <button onclick="scheduleDemo(2)">Schedule Demo</button>
            </div>
        </div>
    `;
    
    const container = document.querySelector('.filter-container');
    if (container) {
        container.appendChild(insights);
    }
}

function followUpLead(leadId) {
    const lead = sampleMessages.find(msg => msg.id === leadId);
    if (lead) {
        showNotification(`Following up with ${lead.name} - ${lead.email}`, 'success');
        // In a real app, this would trigger an email or CRM action
    }
}

function scheduleDemo(leadId) {
    const lead = sampleMessages.find(msg => msg.id === leadId);
    if (lead) {
        showNotification(`Demo scheduled with ${lead.name}`, 'success');
        // In a real app, this would integrate with calendar system
    }
}

function setupRealTimeNotifications() {
    // Simulate real-time notifications
    setInterval(() => {
        if (Math.random() > 0.7) {
            const notifications = [
                "New high-value lead just viewed your pricing page!",
                "Sarah Johnson opened your email - follow up now!",
                "Enterprise inquiry received - potential $25k+ project!",
                "AI detected increased interest in Professional package"
            ];
            
            const notification = notifications[Math.floor(Math.random() * notifications.length)];
            showNotification(notification, 'info');
        }
    }, 30000); // Every 30 seconds
}

function createAnalyticsDashboard() {
    const analytics = document.createElement('div');
    analytics.className = 'analytics-dashboard';
    analytics.innerHTML = `
        <h3>📊 Advanced Analytics</h3>
        <div class="analytics-grid">
            <div class="metric-card">
                <h4>Lead Quality Score</h4>
                <div class="score">${getLeadQualityScore()}/100</div>
                <div class="trend up">+12% this week</div>
            </div>
            <div class="metric-card">
                <h4>Response Time</h4>
                <div class="score">2.3h avg</div>
                <div class="trend down">-0.5h improvement</div>
            </div>
            <div class="metric-card">
                <h4>Revenue Pipeline</h4>
                <div class="score">$${getPipelineValue()}k</div>
                <div class="trend up">+25% this month</div>
            </div>
            <div class="metric-card">
                <h4>AI Engagement</h4>
                <div class="score">${getAIEngagement()}%</div>
                <div class="trend up">+8% this week</div>
            </div>
        </div>
    `;
    
    const container = document.querySelector('.filter-container');
    if (container) {
        container.appendChild(analytics);
    }
}

function getLeadQualityScore() {
    return Math.floor(Math.random() * 20) + 80;
}

function getPipelineValue() {
    return Math.floor(Math.random() * 50) + 150;
}

function getAIEngagement() {
    return Math.floor(Math.random() * 15) + 75;
}

function setupRealTimeUpdates() {
    // Simulate real-time data updates
    setInterval(() => {
        updateStatistics();
        updateAnalytics();
    }, 10000); // Every 10 seconds
}

function updateAnalytics() {
    // Update analytics in real-time
    const scoreElements = document.querySelectorAll('.score');
    scoreElements.forEach(element => {
        if (element.textContent.includes('/100')) {
            const newScore = Math.floor(Math.random() * 20) + 80;
            element.textContent = `${newScore}/100`;
        }
    });
}

function initializeAnalytics() {
    // Advanced analytics tracking
    trackUserBehavior();
    trackConversionFunnel();
    trackAIInteractions();
}

function trackUserBehavior() {
    // Track admin dashboard usage
    let pageViews = 0;
    let actionsPerformed = 0;
    
    // Track page views
    pageViews++;
    
    // Track actions
    document.addEventListener('click', () => {
        actionsPerformed++;
    });
    
    // Send analytics data
    setInterval(() => {
        const analyticsData = {
            pageViews: pageViews,
            actionsPerformed: actionsPerformed,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        console.log('Admin Analytics:', analyticsData);
        // In production, send this to your analytics service
    }, 60000); // Every minute
}

function trackConversionFunnel() {
    // Track conversion funnel stages
    const funnelData = {
        leads: sampleMessages.length,
        contacted: sampleMessages.filter(msg => msg.status !== 'new').length,
        replied: sampleMessages.filter(msg => msg.status === 'replied').length,
        converted: Math.floor(sampleMessages.length * 0.15) // Simulate 15% conversion
    };
    
    console.log('Conversion Funnel:', funnelData);
}

function trackAIInteractions() {
    // Track AI feature usage
    let aiInteractions = 0;
    
    // Track AI chat interactions
    document.addEventListener('click', (e) => {
        if (e.target.closest('.ai-insights') || e.target.closest('.ai-filter-section')) {
            aiInteractions++;
        }
    });
    
    console.log('AI Interactions:', aiInteractions);
}

// Load and display messages
function loadMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';

    sampleMessages.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesList.appendChild(messageElement);
    });
}

// Create a message element
function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-item ${message.status === 'new' ? 'unread' : ''}`;
    messageDiv.onclick = () => openMessageModal(message);

    const timeAgo = getTimeAgo(message.timestamp);
    const statusClass = message.status;

    messageDiv.innerHTML = `
        <div class="message-info">
            <h4>${message.name}</h4>
            <p><strong>Subject:</strong> ${message.subject}</p>
            <p>${truncateText(message.message, 100)}</p>
        </div>
        <div class="message-meta">
            <span class="message-time">${timeAgo}</span>
            <span class="message-status ${statusClass}">${message.status.toUpperCase()}</span>
        </div>
    `;

    return messageDiv;
}

// Open message modal
function openMessageModal(message) {
    const modal = document.getElementById('messageModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="message-details">
            <div class="detail-row">
                <strong>Name:</strong> ${message.name}
            </div>
            <div class="detail-row">
                <strong>Email:</strong> <a href="mailto:${message.email}">${message.email}</a>
            </div>
            <div class="detail-row">
                <strong>Phone:</strong> <a href="tel:${message.phone}">${message.phone}</a>
            </div>
            <div class="detail-row">
                <strong>Subject:</strong> ${message.subject}
            </div>
            <div class="detail-row">
                <strong>Received:</strong> ${formatDate(message.timestamp)}
            </div>
            <div class="detail-row">
                <strong>Status:</strong> <span class="message-status ${message.status}">${message.status.toUpperCase()}</span>
            </div>
            <div class="detail-row">
                <strong>Message:</strong>
                <div class="message-content">${message.message}</div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Mark as read if it's new
    if (message.status === 'new') {
        message.status = 'read';
        loadMessages(); // Refresh the list
    }
}

// Close message modal
function closeModal() {
    const modal = document.getElementById('messageModal');
    modal.style.display = 'none';
}

// Reply to message
function replyToMessage() {
    alert('Reply functionality would open your email client with the sender\'s email address.');
}

// Filter messages
function filterMessages() {
    const statusFilter = document.getElementById('statusFilter').value;
    const messages = document.querySelectorAll('.message-item');
    
    messages.forEach(message => {
        const status = message.querySelector('.message-status').textContent.toLowerCase();
        if (statusFilter === 'all' || status === statusFilter) {
            message.style.display = 'flex';
        } else {
            message.style.display = 'none';
        }
    });
}

// Search messages
function searchMessages() {
    const searchTerm = document.getElementById('searchMessages').value.toLowerCase();
    const messages = document.querySelectorAll('.message-item');
    
    messages.forEach(message => {
        const messageText = message.textContent.toLowerCase();
        if (messageText.includes(searchTerm)) {
            message.style.display = 'flex';
        } else {
            message.style.display = 'none';
        }
    });
}

// Refresh messages
function refreshMessages() {
    loadMessages();
    showNotification('Messages refreshed successfully!', 'success');
}

// Export messages
function exportMessages() {
    const csvContent = generateCSV(sampleMessages);
    downloadCSV(csvContent, 'contact-messages.csv');
    showNotification('Messages exported successfully!', 'success');
}

// Generate CSV content
function generateCSV(messages) {
    const headers = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Timestamp'];
    const csvRows = [headers.join(',')];
    
    messages.forEach(message => {
        const row = [
            `"${message.name}"`,
            `"${message.email}"`,
            `"${message.phone}"`,
            `"${message.subject}"`,
            `"${message.message.replace(/"/g, '""')}"`,
            `"${message.status}"`,
            `"${message.timestamp}"`
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

// Download CSV file
function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Update statistics (simulate real-time updates)
function updateStatistics() {
    // Calculate real statistics from sample messages
    const totalMessages = sampleMessages.length;
    const newMessages = sampleMessages.filter(msg => msg.status === 'new').length;
    const highValueLeads = sampleMessages.filter(msg => 
        msg.budget === '5000-plus' || msg.budget === '15000-plus'
    ).length;
    const conversionRate = Math.floor((sampleMessages.filter(msg => msg.status !== 'new').length / totalMessages) * 100) || 0;
    
    // Update the DOM elements
    document.getElementById('totalMessages').textContent = totalMessages;
    document.getElementById('newMessages').textContent = newMessages;
    document.getElementById('highValueLeads').textContent = highValueLeads;
    document.getElementById('conversionRate').textContent = conversionRate + '%';
    
    // Animate the numbers
    animateNumbers();
}

// Animate number counting
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, ''));
        animateNumber(stat, 0, target, 2000);
    });
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Load recent activity
function loadRecentActivity() {
    // This would typically load from a database
    // For now, we're using static data in the HTML
}

// Utility functions
function getTimeAgo(timestamp) {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('messageModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Additional functions for the admin dashboard
function refreshMessages() {
    loadMessages();
    updateStatistics();
    showNotification('Messages refreshed successfully!', 'success');
}

function exportMessages() {
    const csvContent = generateCSV(sampleMessages);
    downloadCSV(csvContent, 'contact-messages.csv');
    showNotification('Messages exported successfully!', 'success');
}

function filterMessages() {
    // This would open a filter modal or dropdown
    showNotification('Filter functionality coming soon!', 'info');
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
    
    .message-details {
        line-height: 1.8;
    }
    
    .detail-row {
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #f3f4f6;
    }
    
    .detail-row:last-child {
        border-bottom: none;
    }
    
    .message-content {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 0.5rem;
        white-space: pre-wrap;
    }
`;
document.head.appendChild(style);
