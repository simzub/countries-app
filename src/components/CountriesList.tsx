import { Country } from './MainPage';

interface CountriesListProps {
  countriesData: Country[];
}

export default function CountriesList(props: CountriesListProps) {
  return (
    <div className="flex-auto  justify-center ">
      <div className="overflow-hidden  bg-white shadow sm:rounded-md ">
        <ul className="divide-y divide-gray-200">
          {props.countriesData.map((data) => (
            <li key={data.name}>
              <div className="flex flex-col gap-2 p-4 sm:px-6">
                <div className="text-xl font-medium">{data.name}</div>
                <div>{data.region}</div>
                <div>
                  {data.area} km<sup>2</sup>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
