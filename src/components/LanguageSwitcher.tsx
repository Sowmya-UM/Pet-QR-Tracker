// src/components/LanguageSwitcher.tsx
import React from 'react';
import i18n from 'i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select onChange={handleChange} className='language-select'>
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="kn">ಕನ್ನಡ</option>
    </select>
  );
};

export default LanguageSwitcher;