import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import sortingData from '../utils/sorting-data';

export interface Country {
  name: string;
  region: string;
  area?: number;
  independent: boolean;
}

export default function CountriesList() {
  const [data, setData] = useState<Country[]>([]);
  const [sortOption, setSortOption] = useState('name-asc');
  const [areaFilter, setAreaFilter] = useState(false);
  const [oceaniaFilter, setOceaniaFilter] = useState(false);
  const getData = async () => {
    const { data } = await axios.get('https://restcountries.com/v2/all?fields=name,region,area');
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const visibleData = useMemo(
    () => sortingData(data, sortOption, areaFilter, oceaniaFilter),
    [data, sortOption, areaFilter, oceaniaFilter]
  );

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Countries frontend
          </h1>
        </div>
      </div>
      <div id="filtersandtoggles" className="flex gap-8 justify-between">
        <div id="toggles" className="flex gap-8">
          <button
            onClick={() => setAreaFilter(!areaFilter)}
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            style={{ backgroundColor: areaFilter ? '#C7D2FE' : '#FFFFFF' }}
          >
            {'<'} Lithuania
          </button>

          <button
            onClick={() => setOceaniaFilter(!oceaniaFilter)}
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-gray-50"
            style={{ backgroundColor: oceaniaFilter ? '#C7D2FE' : '#FFFFFF' }}
          >
            Only Oceania
          </button>
        </div>
        <div id="sorting" className="flex flex-col gap-2 sm:flex-row sm:gap-8 h-full">
          <div>
            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="mt-1 block w-full h-full bg-white rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:ring-2 sm:text-sm"
            >
              <option value="name-asc">Ascending</option>
              <option value="name-desc">Descending</option>
            </select>
          </div>
          <div>
            <select className="mt-1 block w-full h-full bg-white rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:ring-2 sm:text-sm">
              <option value="5">10 items per page</option>
              <option value="25">25 items per page</option>
              <option value="50">50 items per page</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex-auto  justify-center ">
        <div className="overflow-hidden  bg-white shadow sm:rounded-md ">
          <ul className="divide-y divide-gray-200">
            {visibleData.map((data) => (
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
    </div>
  );
}
