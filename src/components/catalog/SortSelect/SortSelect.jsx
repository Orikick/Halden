import Select from '@/components/ui/Select/Select';
import { sortOptions } from '@/data/sortOptions';

export default function SortSelect({ value, onChange, className }) {
  return (
    <Select
      name="sort"
      id="catalog-sort"
      label="Sort by"
      options={sortOptions}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={className}
    />
  );
}
