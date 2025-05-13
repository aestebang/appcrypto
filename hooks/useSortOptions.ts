import { useCallback } from 'react';

type SortBy = 'rank' | 'price' | 'change';
type SortOrder = 'asc' | 'desc';

interface UseSortOptionsProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortBy) => void;
}

export const useSortOptions = ({ sortBy, sortOrder, onSortChange }: UseSortOptionsProps) => {
  const isSortActive = useCallback((value: SortBy) => sortBy === value, [sortBy]);
  
  const getSortIcon = useCallback((value: SortBy) => {
    if (!isSortActive(value)) return null;
    return sortOrder === 'asc' ? 'up' : 'down';
  }, [isSortActive, sortOrder]);
  
  const getButtonStyle = useCallback((value: SortBy, baseStyle: any, activeStyle: any) => {
    return isSortActive(value) ? [baseStyle, activeStyle] : baseStyle;
  }, [isSortActive]);
  
  const getTextStyle = useCallback((value: SortBy, baseStyle: any, activeStyle: any, inactiveStyle: any) => {
    return isSortActive(value) ? [baseStyle, activeStyle] : [baseStyle, inactiveStyle];
  }, [isSortActive]);
  
  const handleSortChange = useCallback((value: SortBy) => {
    onSortChange(value);
  }, [onSortChange]);
  
  return {
    isSortActive,
    getSortIcon,
    getButtonStyle,
    getTextStyle,
    handleSortChange
  };
}; 