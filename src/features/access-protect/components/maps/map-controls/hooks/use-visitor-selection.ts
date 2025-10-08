import { useEffect, useState } from 'react';
import type { TrackAndTraceVisitor } from '../../../../services/models/movement-report-model.ts';

interface UseVisitorSelectionProps {
  filteredOptions: TrackAndTraceVisitor[];
  selected: string[];
  onToggle: (id: string) => void;
  deferredInputValue: string;
}

interface UseVisitorSelectionResult {
  allSelected: boolean;
  someSelected: boolean;
  selectionCount: number;
  handleSelectAll: () => void;
}

export const useVisitorSelection = ({
  filteredOptions,
  selected,
  onToggle,
  deferredInputValue,
}: UseVisitorSelectionProps): UseVisitorSelectionResult => {
  const [prevInputValue, setPrevInputValue] = useState('');
  const [allSelected, setAllSelected] = useState(false);
  const [someSelected, setSomeSelected] = useState(false);
  const [selectionCount, setSelectionCount] = useState(0);

  // Track selection state
  useEffect(() => {
    if (filteredOptions.length > 0) {
      const selectedCount = filteredOptions.filter((visitor) =>
        selected.includes(visitor.logId),
      ).length;

      setSelectionCount(selectedCount);
      setAllSelected(selectedCount === filteredOptions.length);
      setSomeSelected(selectedCount > 0 && selectedCount < filteredOptions.length);
    }
  }, [filteredOptions, selected]);

  // Update the previous input value when search changes
  useEffect(() => {
    if (prevInputValue !== deferredInputValue) {
      setPrevInputValue(deferredInputValue);

      // Update the selection state based on new filtered options
      if (filteredOptions.length > 0) {
        const selectedCount = filteredOptions.filter((visitor) =>
          selected.includes(visitor.logId),
        ).length;

        setAllSelected(selectedCount === filteredOptions.length);
        setSomeSelected(selectedCount > 0 && selectedCount < filteredOptions.length);
      }
    }
  }, [deferredInputValue, prevInputValue, filteredOptions, selected]);

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all filtered visitors
      filteredOptions.forEach((visitor) => {
        if (selected.includes(visitor.logId)) {
          onToggle(visitor.logId);
        }
      });
    } else {
      // Select all filtered visitors
      filteredOptions.forEach((visitor) => {
        if (!selected.includes(visitor.logId)) {
          onToggle(visitor.logId);
        }
      });
    }
    setAllSelected(!allSelected);
  };

  return {
    allSelected,
    someSelected,
    selectionCount,
    handleSelectAll,
  };
};
