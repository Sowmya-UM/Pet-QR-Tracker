
//ORIGINAL ONE
// import React, { useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';

// interface Props {
//   onLocationAllow: (lat: number, lng: number) => void;
//   onClose: () => void;
//   show: boolean;
// }

// const PetInfoModal: React.FC<Props> = ({ onLocationAllow, onClose, show }) => {
//   useEffect(() => {
//     document.body.style.overflow = show ? 'hidden' : 'auto';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [show]);

//   const notifyMe = () => {
//     if (!('Notification' in window)) {
//       alert('This browser does not support desktop notification');
//     } else if (Notification.permission === 'granted') {
//       new Notification('Thanks for allowing location!');
//     } else if (Notification.permission !== 'denied') {
//       Notification.requestPermission().then((permission) => {
//         if (permission === 'granted') {
//           new Notification('Thanks for allowing location!');
//         }
//       });
//     }
//   };

//   const handleAllowClick = () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const lat = position.coords.latitude;
//       const lng = position.coords.longitude;
//       onLocationAllow(lat, lng);
//       notifyMe(); // Show notification after allowing location
//       onClose();
//     });
//   };

//   return (
//     <Modal show={show} backdrop="static" keyboard={false} centered>
//       <Modal.Header>
//         <Modal.Title>Location Access</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         This app needs access to your location to continue.
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="outline-success" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="success" onClick={handleAllowClick}>
//           Allow
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PetInfoModal;




import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
interface Props {
  show: boolean;
  onLocationAllow: (lat: number, lng: number) => void;
  onClose: () => void;
  onNotifyOwner: (lat: number, lng: number) => void | Promise<void>; // ✅ Corrected
}



const PetInfoModal: React.FC<Props> = ({ onLocationAllow, onClose, show, onNotifyOwner }) => {
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  const notifyMe = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      new Notification('Thanks for allowing location!');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Thanks for allowing location!');
        }
      });
    }
  };

//  const handleAllowClick = () => {
//   navigator.geolocation.getCurrentPosition((position) => {
//     const lat = position.coords.latitude;
//     const lng = position.coords.longitude;
//     onLocationAllow(lat, lng);
//     notifyMe();
//     onNotifyOwner(); // call notify right here
//     onClose();
//   });
// };

const handleAllow = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      onLocationAllow(latitude, longitude);
      notifyMe(); // optional: send notification
      onNotifyOwner(latitude, longitude); // ✅ Corrected
      onClose(); // optional: close modal after everything
    },
    () => {
      alert("Location not available");
    }
  );
};



  return (
    <Modal show={show} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Location Access</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This app needs access to your location to continue.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleAllow}>
          Allow
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PetInfoModal;
