
//Now--ORIGINAL ONE---
// 'use client';

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './globals.css';
// import './page.css';
// import '@/i18n';

// import PetInfoModal from '../components/petInfoModal';
// import LanguageSwitcher from '@/components/LanguageSwitcher';
// import { useTranslation } from 'react-i18next';

// const Page = () => {
//   const { t } = useTranslation();
//   const [showModal, setShowModal] = useState(true);
//   const [locationConfirmed, setLocationConfirmed] = useState(false);
//   const [latitude, setLatitude] = useState<number | null>(null);
//   const [longitude, setLongitude] = useState<number | null>(null);

//   // Prevent background scroll when modal is open
//   useEffect(() => {
//     document.body.style.overflow = showModal ? 'hidden' : 'auto';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [showModal]);

//   const handleLocationAllow = (lat: number, lng: number) => {
//     setLatitude(lat);
//     setLongitude(lng);
//     setLocationConfirmed(true);
//     setShowModal(false); // Close modal after success
//   };

//   const handleModalClose = () => {
//     setShowModal(false); // Optional cancel
//   };

//   const handleNotifyOwner = async () => {
//     if (latitude === null || longitude === null) {
//       alert('Location not available');
//       return;
//     }

//     try {
//       const res = await fetch('/api/notify-owner', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ latitude, longitude }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert('Owner has been notified successfully!');
//       } else {
//         alert('Failed to notify owner.');
//       }
//     } catch (error) {
//       console.error('Error notifying owner:', error);
//       alert('Something went wrong.');
//     }
//   };

//   return (
//     <div>
//       {showModal && (
//         <PetInfoModal
//           show={showModal}
//           onLocationAllow={handleLocationAllow}
//           onClose={handleModalClose}
//         />
//       )}

//       {!showModal && locationConfirmed && (
//         <div className="Information-wrapper">
//           <nav className="navbar">
//             <div className="logo">
//               <img
//                 src="/logo.jpg"
//                 alt="PetTracker Logo"
//                 style={{ width: '50px', height: '50px' }}
//               />
//               <span
//                 style={{
//                   fontWeight: 'bold',
//                   fontSize: '1.5rem',
//                   marginTop: '10px',
//                 }}
//               >
//                 PetTracker
//               </span>
//             </div>
//             <div className="nav-link">
//               <LanguageSwitcher />
//             </div>
//           </nav>

//           <div className="content-wrapper">
//             <h1>{t('Every Tag Tells a Story. Let Yours Lead Them Home.')}</h1>

//             <div className="petInfo-wrapper">
//               <div className="petDetails-wrapper">
//                 <div className="petDetails">
//                   <h3>{t("Hey Hooman! It's Me!")}</h3>
//                   <div className="pet-card">
//                     <ul>
//                       <li><strong>{t('pet.name')}</strong></li>
//                       <li><strong>{t('pet.breed')}</strong></li>
//                       <li><strong>{t('pet.age')}</strong></li>
//                       <li><strong>{t('pet.color')}</strong></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <img src="/petImage.jpg" alt="pet" className="dog-photo" />
//             </div>

//             <div className="OwnerInfo-wrapper">
//               <h3>{t("Hi there, I'm the human behind Shiroo!")}</h3>
//               <div className="ownerDetails-card">
//                 <ul>
//                   <li><strong>{t('owner.name')}</strong></li>
//                   <li><strong>{t('owner.phone_number')}</strong></li>
//                   <li><strong>{t('owner.email')}</strong></li>
//                   <li><strong>{t('owner.location')}</strong></li>
//                 </ul>
//               </div>
//             </div>

//             <div style={{ marginTop: '2rem', textAlign: 'center' }}>
//               <button className="btn btn-success" onClick={handleNotifyOwner}>
//                 {t('Notify Owner')}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;


'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import './page.css';
import '@/i18n';

import PetInfoModal from '../components/petInfoModal';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Page = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(true);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleLocationAllow = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocationConfirmed(true);
    setShowModal(false); // Close modal after success
  };

  const handleModalClose = () => {
    setShowModal(false); // Optional cancel
  };

  const handleNotifyOwner = async (lat: number, lng: number) => {
    try {
      const res = await fetch('/api/notify-owner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      });

      const data = await res.json();

      if (data.success) {
        alert('Owner has been notified successfully!');
      } else {
        alert('Failed to notify owner.');
      }
    } catch (error) {
      console.error('Error notifying owner:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      {showModal && (
        <PetInfoModal
          show={showModal}
          onLocationAllow={handleLocationAllow}
          onNotifyOwner={handleNotifyOwner} // ✅ Added to fix TS error
          onClose={handleModalClose}
        />
      )}

      {!showModal && locationConfirmed && (
        <div className="Information-wrapper">
          <nav className="navbar">
            <div className="logo">
              <img
                src="/logo.jpg"
                alt="PetTracker Logo"
                style={{ width: '50px', height: '50px' }}
              />
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  marginTop: '10px',
                }}
              >
                PetTracker
              </span>
            </div>
            <div className="nav-link">
              <LanguageSwitcher />
            </div>
          </nav>

          <div className="content-wrapper">
            <h1>{t('Every Tag Tells a Story. Let Yours Lead Them Home.')}</h1>

            <div className="petInfo-wrapper">
              <div className="petDetails-wrapper">
                <div className="petDetails">
                  <h3>{t("Hey Hooman! It's Me!")}</h3>
                  <div className="pet-card">
                    <ul>
                      <li><strong>{t('pet.name')}</strong></li>
                      <li><strong>{t('pet.breed')}</strong></li>
                      <li><strong>{t('pet.age')}</strong></li>
                      <li><strong>{t('pet.color')}</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
              <img src="/petImage.jpg" alt="pet" className="dog-photo" />
            </div>

            <div className="OwnerInfo-wrapper">
              <h3>{t("Hi there, I'm the human behind Shiroo!")}</h3>
              <div className="ownerDetails-card">
                <ul>
                  <li><strong>{t('owner.name')}</strong></li>
                  <li><strong>{t('owner.phone_number')}</strong></li>
                  <li><strong>{t('owner.email')}</strong></li>
                  <li><strong>{t('owner.location')}</strong></li>
                </ul>
              </div>
            </div>

            {/* <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                className="btn btn-success"
                onClick={() => {
                  if (latitude !== null && longitude !== null) {
                    handleNotifyOwner(latitude, longitude);
                  } else {
                    alert('Location not available.');
                  }
                }}
              >
                {t('Notify Owner')}
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;


