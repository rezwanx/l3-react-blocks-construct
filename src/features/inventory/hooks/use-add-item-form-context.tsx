import React, { createContext, useContext, useState } from 'react';

interface AddItemFormContextProps {
  isAddItemFormOpen: boolean;
  setIsAddItemFormOpen: (isOpen: boolean) => void;
}

const AddItemFormContext = createContext<AddItemFormContextProps | undefined>(undefined);

export const AddItemFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAddItemFormOpen, setIsAddItemFormOpen] = useState(false);

  return (
    <AddItemFormContext.Provider value={{ isAddItemFormOpen, setIsAddItemFormOpen }}>
      {children}
    </AddItemFormContext.Provider>
  );
};

export const useAddItemForm = (): AddItemFormContextProps => {
  const context = useContext(AddItemFormContext);
  if (!context) {
    throw new Error;
  }
  return context;
};