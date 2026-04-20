export function isUserActiveInTab(): boolean {
  if (typeof document !== 'undefined')
    // document.visibilityState returns 'visible' if the page is visible
    return document.visibilityState === 'visible';
}

/**
 * Creates a browser notification.
 *
 * @param {string} title - The title of the notification.
 * @param {object} options - Options for the notification.
 * @param {string} options.body - The body text of the notification.
 * @param {string} [options.icon] - The URL of the icon to display in the notification.
 * @returns {Promise<Notification>} - A promise that resolves with the created notification object.
 */

export function createBrowserNotification(title: string, options: NotificationOptions): Promise<Notification> {
  // Check if the browser supports notifications
  if (!('Notification' in window)) {
    console.error('This browser does not support desktop notifications.');
    return Promise.reject(new Error('Notifications are not supported in this browser.'));
  }

  // Request permission if not already granted
  if (Notification.permission !== 'granted') {
    return Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        console.error('User denied notification permission.');
        return Promise.reject(new Error('Notification permission denied by user.'));
      }

      // Create and return the notification
      return new Notification(title, options);
    });
  }

  // If permission is already granted, create the notification
  return Promise.resolve(new Notification(title, options));
}
