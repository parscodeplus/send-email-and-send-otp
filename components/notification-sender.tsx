// components/NotificationSender.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';

const NotificationSender = () => {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(setPermission);
    }
  }, []);

  const sendNotification = async () => {
    if (Notification.permission === 'granted') {
      try {
        const res = await fetch('/api/push', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: 'Hello from Next.js',
            body: 'This is a push notification test.',
          }),
        });

        const data = await res.json();
        console.log('Notification sent:', data);
      } catch (error) {
        console.error('Failed to send notification:', error);
      }
    } else {
      alert('Notification permission not granted');
    }
  };

  return (
    <div>
      {permission === 'granted' ? (
        <Button onClick={sendNotification}>
          Send Push Notification
        </Button>
      ) : (
        <p>Notification permissions are not granted.</p>
      )}
    </div>
  );
};

export default NotificationSender;
