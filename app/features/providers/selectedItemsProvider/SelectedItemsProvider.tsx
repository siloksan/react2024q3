import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Spacecraft } from '~/entities/spacecraft/models';

type SelectedItemsContextUpdateValue = {
  addSelectedItem: (value: Spacecraft) => void;
  removeSelectedItem: (value: Spacecraft) => void;
  clearSelectedItems: () => void;
};

const defaultItems: Spacecraft[] = [];
const SelectedItemsContext = createContext(defaultItems);
const SelectedItemsContextUpdate = createContext<SelectedItemsContextUpdateValue | undefined>(undefined);

export const useSelectedItems = () => {
  return useContext(SelectedItemsContext);
};

export const useSelectedItemsUpdate = () => {
  const context = useContext(SelectedItemsContextUpdate);
  if (!context) {
    throw new Error('useSelectedItemsUpdate must be used within a SelectedItemsProvider');
  }
  return context;
};

export function SelectedItemsProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<Spacecraft[]>([]);

  const addSelectedItem = useCallback((value: Spacecraft) => {
    setSelectedItems((prevItems) => [...prevItems, value]);
  }, []);

  const removeSelectedItem = useCallback((value: Spacecraft) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.uid !== value.uid));
  }, []);

  const clearSelectedItems = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      addSelectedItem,
      removeSelectedItem,
      clearSelectedItems,
    }),
    [addSelectedItem, removeSelectedItem, clearSelectedItems]
  );

  return (
    <SelectedItemsContext.Provider value={selectedItems}>
      <SelectedItemsContextUpdate.Provider value={contextValue}>{children}</SelectedItemsContextUpdate.Provider>
    </SelectedItemsContext.Provider>
  );
}
