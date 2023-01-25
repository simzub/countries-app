interface CountriesAmountSelectorProps {
  setCountriesAmountState: (value: React.SetStateAction<number>) => void;
}
export default function CountriesAmountSelector(props: CountriesAmountSelectorProps) {
  return (
    <div>
      <select
        onChange={(e) => props.setCountriesAmountState(+e.target.value)}
        className="mt-1 block w-full h-full bg-white rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:ring-2 sm:text-sm"
      >
        <option value="50">50 items per page</option>
        <option value="100">100 items per page</option>
      </select>
    </div>
  );
}
