// notifications.js - Sistema de Notificações

/**
 * Mostra notificação na tela
 */
function showNotification(message, type = 'success', duration = 5000) {
    const container = document.getElementById('notifications-container');
    if (!container) {
        console.warn('Container de notificações não encontrado:', message);
        return;
    }
    
    hideNotification();
    
    let bgColor = 'bg-green-500';
    let icon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;

    if (type === 'error') {
        bgColor = 'bg-red-500';
        icon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    } else if (type === 'loading' || type === 'warning') {
        bgColor = 'bg-yellow-500';
        icon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${type === 'loading' ? 'animate-spin' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>`;
    }

    const notification = document.createElement('div');
    notification.className = `p-4 text-white ${bgColor} rounded-lg shadow-xl flex items-center space-x-3 transition-opacity duration-300 opacity-0`;
    notification.innerHTML = `
        <div>${icon}</div>
        <p class="font-medium">${message}</p>
    `;

    if (type === 'loading') {
        notification.id = 'loading-notification';
    } else {
        notification.id = 'temp-notification-' + Date.now();
    }

    container.appendChild(notification);
    
    setTimeout(() => notification.classList.remove('opacity-0'), 10);

    if (type !== 'loading') {
        setTimeout(() => {
            notification.classList.add('opacity-0');
            setTimeout(() => {
                if (notification.parentNode === container) {
                    container.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
}

/**
 * Esconde notificações
 */
function hideNotification() {
    const container = document.getElementById('notifications-container');
    if (!container) return;
    
    const notifications = container.querySelectorAll('div');
    notifications.forEach(notification => {
        notification.classList.add('opacity-0');
        setTimeout(() => {
            if (notification.parentNode === container) {
                container.removeChild(notification);
            }
        }, 300);
    });
}