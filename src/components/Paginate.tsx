interface PaginateProps {
  totalCountries: number;
  countriesPerPage: number;
  paginate: (pageNumber: number) => void;
  previousPage: React.MouseEventHandler<HTMLLIElement>;
  nextPage: React.MouseEventHandler<HTMLLIElement>;
  currentPage: number;
}

export default function Paginate(props: PaginateProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalCountries / props.countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="flex justify-center items-center mt-4 gap-4 flex-wrap">
        <li
          onClick={props.previousPage}
          className="text-base text-gray-400 font-semibold hover:text-gray-700  py-2 px-2 rounded-lg cursor-pointer"
        >
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => props.paginate(number)}
            style={{ color: props.currentPage === number ? '#000000' : '#9CA38F' }}
            className="text-base font-semibold  text-gray-400 hover:text-gray-700 py-2 px-2 rounded-lg cursor-pointer"
          >
            {number}
          </li>
        ))}
        <li
          onClick={props.nextPage}
          className="text-base text-gray-400 hover:text-gray-700 font-semibold  py-2 px-2 rounded-lg cursor-pointer"
        >
          Next
        </li>
      </ul>
    </div>
  );
}
