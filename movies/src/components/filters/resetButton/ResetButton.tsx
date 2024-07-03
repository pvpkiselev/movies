import Button from '@/components/common/buttons/button/Button';
import { useFilterDispatchContext } from '@/contexts/filterContext/filterContext';
import { RESET_FILTERS } from '@/reducers/constants';
import { X } from 'lucide-react';

export default function ResetButton() {
  const dispatch = useFilterDispatchContext();

  const handleResetFilters = () => {
    dispatch({
      type: RESET_FILTERS,
    });
  };

  return (
    <Button size="medium" appearance="tertiary" onClick={handleResetFilters}>
      <X />
      Сбросить фильтры
    </Button>
  );
}
