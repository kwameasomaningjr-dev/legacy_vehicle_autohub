import React, { createContext, useContext, useState, useEffect } from 'react';
import { CARS_DATA } from '../data/cars';

const CarContext = createContext();

const CARS_STORAGE_KEY = 'legacy_vehicle_hub_cars_v1';
const INQUIRIES_STORAGE_KEY = 'legacy_vehicle_hub_inquiries_v1';
const AUTH_STORAGE_KEY = 'legacy_vehicle_hub_admin_auth_v1';

export function CarProvider({ children }) {
  // 1. Vehicles Catalog State
  const [cars, setCars] = useState(() => {
    try {
      const stored = localStorage.getItem(CARS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : CARS_DATA;
    } catch (e) {
      console.error('Error loading cars from localStorage:', e);
      return CARS_DATA;
    }
  });

  // 2. Inquiries Log State
  const [inquiries, setInquiries] = useState(() => {
    try {
      const stored = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [
        {
          id: 'inq-1',
          date: new Date().toISOString().split('T')[0],
          customerName: 'Kwaku Duah',
          phone: '+233 55 123 4567',
          email: 'kwaku@example.com',
          carName: 'Toyota Land Cruiser Prado',
          travelScope: 'Outside Accra',
          estimatedRate: 'GH₵ 1,800',
          pickupDate: '2026-10-01',
          returnDate: '2026-10-05',
          notes: 'Chauffeur driver requested for Kumasi trip.'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // 3. Admin Auth State - Requires login per session
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      // Clear legacy persistent localStorage auth so user must login first
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  // Sync cars to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(cars));
    } catch (e) {
      console.error('Error saving cars to localStorage:', e);
    }
  }, [cars]);

  // Sync inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Error saving inquiries to localStorage:', e);
    }
  }, [inquiries]);

  // Auth helper methods
  const loginAdmin = (username, password) => {
    const validUsername = (import.meta.env.VITE_ADMIN_USERNAME || 'admin').trim().toLowerCase();
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'password123';

    const inputUser = username.trim().toLowerCase();
    const inputPass = password;

    if (inputUser === validUsername && inputPass === validPassword) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (e) {
        console.error('Error saving auth to sessionStorage:', e);
      }
      return { success: true };
    }

    return {
      success: false,
      message: `Invalid admin credentials. Please check your username and password.`
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error('Error removing auth:', e);
    }
  };

  // Car CRUD Operations
  const addCar = (newCarData) => {
    const newCar = {
      ...newCarData,
      id: `car-${Date.now()}`,
      year: Number(newCarData.year) || new Date().getFullYear(),
      seats: Number(newCarData.seats) || 5,
      rateInsideAccra: Number(newCarData.rateInsideAccra) || 500,
      rateOutsideAccra: Number(newCarData.rateOutsideAccra) || 700,
      featured: Boolean(newCarData.featured),
      isAvailable: Boolean(newCarData.isAvailable !== false),
      hasAC: Boolean(newCarData.hasAC !== false),
      features: Array.isArray(newCarData.features) ? newCarData.features : (newCarData.features || '').split(',').map(f => f.trim()).filter(Boolean),
      images: Array.isArray(newCarData.images) && newCarData.images.length > 0 ? newCarData.images : [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
      ]
    };

    setCars(prev => [newCar, ...prev]);
    return newCar;
  };

  const updateCar = (carId, updatedFields) => {
    setCars(prev => prev.map(car => {
      if (car.id === carId) {
        const formatted = { ...car, ...updatedFields };
        if (updatedFields.rateInsideAccra) formatted.rateInsideAccra = Number(updatedFields.rateInsideAccra);
        if (updatedFields.rateOutsideAccra) formatted.rateOutsideAccra = Number(updatedFields.rateOutsideAccra);
        if (updatedFields.year) formatted.year = Number(updatedFields.year);
        if (updatedFields.seats) formatted.seats = Number(updatedFields.seats);
        return formatted;
      }
      return car;
    }));
  };

  const deleteCar = (carId) => {
    setCars(prev => prev.filter(car => car.id !== carId));
  };

  const resetCatalogToDefault = () => {
    setCars(CARS_DATA);
    localStorage.removeItem(CARS_STORAGE_KEY);
  };

  const addInquiry = (inquiryData) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...inquiryData
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const deleteInquiry = (inquiryId) => {
    setInquiries(prev => prev.filter(inq => inq.id !== inquiryId));
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        inquiries,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addCar,
        updateCar,
        deleteCar,
        resetCatalogToDefault,
        addInquiry,
        deleteInquiry
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
}
