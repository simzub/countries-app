interface ToggleableButtonProps {
  filter: boolean;
  setFilter: (value: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
}
export default function ToggleableButton(props: ToggleableButtonProps) {
  return (
    <button
      onClick={() => props.setFilter(!props.filter)}
      type="button"
      className="inline-flex justify-center w-full items-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      style={{ backgroundColor: props.filter ? '#C7D2FE' : '#FFFFFF' }}
    >
      {props.children}
    </button>
  );
}
