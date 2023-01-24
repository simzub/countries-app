import { Country } from './../components/CountriesList';

export default function sorting(data: Country[], sortOption: string) {
  if (sortOption === 'name-asc') {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    return data.sort((a, b) => b.name.localeCompare(a.name));
  } else return data.sort((a, b) => a.name.localeCompare(b.name));
}
