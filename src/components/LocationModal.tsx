// // src/components/LocationModal.tsx

// import React, { useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import useGeoLocation from '../components/useGeoLocation';

// type Props = {
//   show: boolean;
//   setShow: React.Dispatch<React.SetStateAction<boolean>>;
//   onLocationSuccess: (latitude: number, longitude: number) => void;
// };

// const LocationModal = ({ show, setShow, onLocationSuccess }: Props) => {
//   const location = useGeoLocation();

//   useEffect(() => {
//     if (location.location) {
//       onLocationSuccess(location.location.lat, location.location.lng);
//       setShow(false);
//     }
//   }, [location.location]);

//   return (
//     <Modal show={show} onHide={() => setShow(false)} backdrop="static" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Share Location</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>We need your location to notify the pet owner.</p>
//         {location.error && <p className="text-danger">{location.error}</p>}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShow(false)}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={location.getLocation}>
//           Allow Location
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default LocationModal;




import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import useGeoLocation from '../components/useGeoLocation';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onLocationSuccess: (latitude: number, longitude: number) => void;
};

// Simple browser notification
const notifyMe = () => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    new Notification('Location shared successfully!');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Location shared successfully!');
      }
    });
  }
};

const LocationModal = ({ show, setShow, onLocationSuccess }: Props) => {
  const location = useGeoLocation();

  const handleAllow = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationSuccess(latitude, longitude);
        notifyMe(); // ✅ Trigger notification here
        setShow(false); // ✅ Close modal after success
      },
      (error) => {
        alert("Unable to retrieve location");
      }
    );
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Share Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>We need your location to notify the pet owner.</p>
        {location.error && <p className="text-danger">{location.error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAllow}>
          Allow Location
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationModal;
