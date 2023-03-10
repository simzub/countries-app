import { Country } from '../components/MainPage';

export default function sortingData(
  data: Country[],
  sortOption: string,
  areaFilter: boolean,
  oceaniaFilter: boolean,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) {
  let updatedData = [...data];
  const lithuaniaArea = updatedData.find((country) => country.name === 'Lithuania')?.area || 0;
  if (sortOption === 'name-asc') {
    updatedData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    updatedData.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (areaFilter) {
    updatedData = updatedData.filter((country) => country.area! < lithuaniaArea);
    setCurrentPage(1);
  }
  if (oceaniaFilter) {
    updatedData = updatedData.filter((country) => country.region === 'Oceania');
    setCurrentPage(1);
  }
  return updatedData;
}
