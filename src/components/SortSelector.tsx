interface SortSelectorProps {
  setSortState: (value: React.SetStateAction<string>) => void;
}
export default function SortSelector(props: SortSelectorProps) {
  return (
    <div>
      <select
        onChange={(e) => props.setSortState(e.target.value)}
        className="mt-1 block w-full h-full bg-white rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:ring-2 sm:text-sm"
      >
        <option value="name-asc">Ascending</option>
        <option value="name-desc">Descending</option>
      </select>
    </div>
  );
}
