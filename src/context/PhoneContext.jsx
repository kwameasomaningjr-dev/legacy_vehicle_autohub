import React, { createContext, useContext, useState } from 'react';
import PhoneNumbersModal from '../components/PhoneNumbersModal';

const PhoneContext = createContext();

export function PhoneProvider({ children }) {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const openPhoneModal = () => setIsPhoneModalOpen(true);
  const closePhoneModal = () => setIsPhoneModalOpen(false);
  const togglePhoneModal = () => setIsPhoneModalOpen((prev) => !prev);

  return (
    <PhoneContext.Provider
      value={{
        isPhoneModalOpen,
        openPhoneModal,
        closePhoneModal,
        togglePhoneModal,
      }}
    >
      {children}
      <PhoneNumbersModal
        isOpen={isPhoneModalOpen}
        onClose={closePhoneModal}
      />
    </PhoneContext.Provider>
  );
}

export function usePhoneModal() {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error('usePhoneModal must be used within a PhoneProvider');
  }
  return context;
}
