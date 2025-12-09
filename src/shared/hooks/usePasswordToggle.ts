import { useState } from 'react';

export const usePasswordToggle = (initialState = false) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(initialState);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return {
    isPasswordVisible,
    togglePasswordVisibility,
    inputType: isPasswordVisible ? 'text' : 'password',
  };
};