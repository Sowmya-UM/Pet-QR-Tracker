import { useState, useEffect } from 'react';

type Coordinates = {
  lat: number;
  lng: number;
};

type GeoLocationType = {
  location: Coordinates | null;
  error: string | null;
  getLocation: () => void;
};

const useGeoLocation = (): GeoLocationType => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, error, getLocation };
};

export default useGeoLocation;
