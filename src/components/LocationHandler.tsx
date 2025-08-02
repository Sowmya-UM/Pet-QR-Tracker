'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LocationHandler = () => {
  const [mounted, setMounted] = useState(false); // <== new
  const router = useRouter();

  useEffect(() => {
    setMounted(true); // <== only run client code after mount
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetch('/api/notify-owner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log('Owner notified:', data);
              router.push('/'); // redirect after success
            });
        },
        (error) => {
          console.error('Location access error:', error);
        }
      );
    } else {
      alert('Geolocation not supported');
    }
  }, [mounted]);

  return null;
};

export default LocationHandler;
