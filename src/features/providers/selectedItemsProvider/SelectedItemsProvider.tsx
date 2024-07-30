import { Spacecraft } from '@/entities/spacecraft/models';
import { createContext, useCallback, useContext, useState } from 'react';

type SelectedItemsContextUpdateValue = {
  addSelectedItem: (value: Spacecraft) => void;
  removeSelectedItem: (value: Spacecraft) => void;
  clearSelectedItems: () => void;
};

const defaultItems: Spacecraft[] = [];
const SelectedItemsContext = createContext(defaultItems);
const SelectedItemsContextUpdate = createContext<SelectedItemsContextUpdateValue | null>(null);

export const useSelectedItems = () => {
  return useContext(SelectedItemsContext);
};

export const useSelectedItemsUpdate = () => {
  if (SelectedItemsContextUpdate === null) {
    throw new Error('SelectedItemsContextUpdate is null');
  }
  return useContext(SelectedItemsContextUpdate);
};

export function SelectedItemsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedItems, setSelectedItems] = useState<Spacecraft[]>([]);

  const addSelectedItem = useCallback((value: Spacecraft) => {
    setSelectedItems((prevItems) => [...prevItems, value]);
  }, []);

  const removeSelectedItem = useCallback((value: Spacecraft) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.uid !== value.uid)
    );
  }, []);

  const clearSelectedItems = useCallback(() => {
    setSelectedItems([]);
  }, []);

  return (
    <SelectedItemsContext.Provider value={selectedItems}>
      <SelectedItemsContextUpdate.Provider
        value={{ addSelectedItem, removeSelectedItem, clearSelectedItems }}
      >
        {children}
      </SelectedItemsContextUpdate.Provider>
    </SelectedItemsContext.Provider>
  );
}
