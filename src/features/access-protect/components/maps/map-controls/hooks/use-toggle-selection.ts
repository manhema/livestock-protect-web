import { useState, useCallback } from 'react';

/**
 * Custom hook for managing a list of selected items that can be toggled on/off.
 *
 * @param initialSelection - Optional array of initially selected item IDs
 * @returns A tuple containing:
 *   - selected: Array of currently selected item IDs
 *   - toggleSelection: Function to toggle an item's selection state
 *   - setSelected: Function to directly set the selection state
 */
export function useToggleSelection(initialSelection: string[] = []) {
  const [selected, setSelected] = useState<string[]>(initialSelection);

  const toggleSelection = useCallback((id: string) => {
    setSelected((prev) => {
      const currentIndex = prev.indexOf(id);
      const newSelected = [...prev];

      if (currentIndex === -1) {
        newSelected.push(id);
      } else {
        newSelected.splice(currentIndex, 1);
      }

      return newSelected;
    });
  }, []);

  return [selected, toggleSelection, setSelected] as const;
}
