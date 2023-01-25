import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import sortingData from '../utils/sorting-data';
import CountriesAmountSelector from './CountriesAmountSelector';
import CountriesList from './CountriesList';
import PageHeader from './PageHeader';
import Paginate from './Paginate';
import SortSelectelement from './SortSelector';
import ToggleableButton from './ToggleableButton';

export interface Country {
  name: string;
  region: string;
  area?: number;
  independent: boolean;
}

export default function MainPage() {
  const [data, setData] = useState<Country[]>([]);
  const [sortOption, setSortOption] = useState('name-asc');
  const [areaFilter, setAreaFilter] = useState(false);
  const [oceaniaFilter, setOceaniaFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(50);

  const getData = async () => {
    const { data } = await axios.get('https://restcountries.com/v2/all?fields=name,region,area');
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const visibleData = useMemo(
    () => sortingData(data, sortOption, areaFilter, oceaniaFilter, setCurrentPage),
    [data, sortOption, areaFilter, oceaniaFilter]
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = visibleData.slice(indexOfFirstCountry, indexOfLastCountry);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(visibleData.length / countriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <PageHeader />
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 justify-between">
        <div id="toggles" className="flex gap-8">
          <ToggleableButton filter={areaFilter} setFilter={setAreaFilter}>
            {'<'} Lithuania
          </ToggleableButton>
          <ToggleableButton filter={oceaniaFilter} setFilter={setOceaniaFilter}>
            Only Oceania
          </ToggleableButton>
        </div>
        <div id="sorting" className="flex flex-col gap-2 sm:flex-row sm:gap-8 h-full">
          <SortSelectelement setSortState={setSortOption} />
          <CountriesAmountSelector setCountriesAmountState={setCountriesPerPage} />
        </div>
      </div>
      <CountriesList countriesData={currentCountries} />
      <Paginate
        totalCountries={visibleData.length}
        countriesPerPage={countriesPerPage}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
      />
    </div>
  );
}
