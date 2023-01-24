import axios from 'axios';
import { useEffect, useState } from 'react';

interface Country {
  name: string;
  region: string;
  area?: number;
  independent: boolean;
}

const data: Country[] = [
  { name: 'Afghanistan', region: 'Asia', area: 652230.0, independent: false },
  { name: 'Åland Islands', region: 'Europe', area: 1580.0, independent: false },
  { name: 'Albania', region: 'Europe', area: 28748.0, independent: false },
  { name: 'Algeria', region: 'Africa', area: 2381741.0, independent: false },
  { name: 'American Samoa', region: 'Oceania', area: 199.0, independent: false },
  { name: 'Andorra', region: 'Europe', area: 468.0, independent: false },
  { name: 'Angola', region: 'Africa', area: 1246700.0, independent: false },
  { name: 'Anguilla', region: 'Americas', area: 91.0, independent: false },
  { name: 'Antarctica', region: 'Polar', area: 1.4e7, independent: false },
  { name: 'Antigua and Barbuda', region: 'Americas', area: 442.0, independent: false },
  { name: 'Argentina', region: 'Americas', area: 2780400.0, independent: false },
  { name: 'Armenia', region: 'Asia', area: 29743.0, independent: false },
  { name: 'Aruba', region: 'Americas', area: 180.0, independent: false },
  { name: 'Australia', region: 'Oceania', area: 7692024.0, independent: false },
  { name: 'Austria', region: 'Europe', area: 83871.0, independent: false },
  { name: 'Azerbaijan', region: 'Asia', area: 86600.0, independent: false },
  { name: 'Bahamas', region: 'Americas', area: 13943.0, independent: false },
  { name: 'Bahrain', region: 'Asia', area: 765.0, independent: false },
  { name: 'Bangladesh', region: 'Asia', area: 147570.0, independent: false },
  { name: 'Barbados', region: 'Americas', area: 430.0, independent: false },
  { name: 'Belarus', region: 'Europe', area: 207600.0, independent: false },
  { name: 'Belgium', region: 'Europe', area: 30528.0, independent: false },
  { name: 'Belize', region: 'Americas', area: 22966.0, independent: false },
  { name: 'Benin', region: 'Africa', area: 112622.0, independent: false },
  { name: 'Bermuda', region: 'Americas', area: 54.0, independent: false },
  { name: 'Bhutan', region: 'Asia', area: 38394.0, independent: false },
  { name: 'Bolivia (Plurinational State of)', region: 'Americas', area: 1098581.0, independent: false },
  { name: 'Bonaire, Sint Eustatius and Saba', region: 'Americas', area: 294.0, independent: false },
  { name: 'Bosnia and Herzegovina', region: 'Europe', area: 51209.0, independent: false },
  { name: 'Botswana', region: 'Africa', area: 582000.0, independent: false },
  { name: 'Bouvet Island', region: 'Antarctic Ocean', area: 49.0, independent: false },
  { name: 'Brazil', region: 'Americas', area: 8515767.0, independent: false },
  { name: 'British Indian Ocean Territory', region: 'Africa', area: 60.0, independent: false },
  { name: 'United States Minor Outlying Islands', region: 'Americas', independent: false },
  { name: 'Virgin Islands (British)', region: 'Americas', area: 151.0, independent: false },
  { name: 'Virgin Islands (U.S.)', region: 'Americas', area: 346.36, independent: false },
  { name: 'Brunei Darussalam', region: 'Asia', area: 5765.0, independent: false },
  { name: 'Bulgaria', region: 'Europe', area: 110879.0, independent: false },
  { name: 'Burkina Faso', region: 'Africa', area: 272967.0, independent: false },
  { name: 'Burundi', region: 'Africa', area: 27834.0, independent: false },
  { name: 'Cambodia', region: 'Asia', area: 181035.0, independent: false },
  { name: 'Cameroon', region: 'Africa', area: 475442.0, independent: false },
  { name: 'Canada', region: 'Americas', area: 9984670.0, independent: false },
  { name: 'Cabo Verde', region: 'Africa', area: 4033.0, independent: false },
  { name: 'Cayman Islands', region: 'Americas', area: 264.0, independent: false },
  { name: 'Central African Republic', region: 'Africa', area: 622984.0, independent: false },
  { name: 'Chad', region: 'Africa', area: 1284000.0, independent: false },
  { name: 'Chile', region: 'Americas', area: 756102.0, independent: false },
  { name: 'China', region: 'Asia', area: 9640011.0, independent: false },
  { name: 'Christmas Island', region: 'Oceania', area: 135.0, independent: false },
  { name: 'Cocos (Keeling) Islands', region: 'Oceania', area: 14.0, independent: false },
  { name: 'Colombia', region: 'Americas', area: 1141748.0, independent: false },
  { name: 'Comoros', region: 'Africa', area: 1862.0, independent: false },
  { name: 'Congo', region: 'Africa', area: 342000.0, independent: false },
  { name: 'Congo (Democratic Republic of the)', region: 'Africa', area: 2344858.0, independent: false },
  { name: 'Cook Islands', region: 'Oceania', area: 236.0, independent: false },
  { name: 'Costa Rica', region: 'Americas', area: 51100.0, independent: false },
  { name: 'Croatia', region: 'Europe', area: 56594.0, independent: false },
  { name: 'Cuba', region: 'Americas', area: 109884.0, independent: false },
  { name: 'Curaçao', region: 'Americas', area: 444.0, independent: false },
  { name: 'Cyprus', region: 'Europe', area: 9251.0, independent: false },
  { name: 'Czech Republic', region: 'Europe', area: 78865.0, independent: false },
  { name: 'Denmark', region: 'Europe', area: 43094.0, independent: false },
  { name: 'Djibouti', region: 'Africa', area: 23200.0, independent: false },
  { name: 'Dominica', region: 'Americas', area: 751.0, independent: false },
  { name: 'Dominican Republic', region: 'Americas', area: 48671.0, independent: false },
  { name: 'Ecuador', region: 'Americas', area: 276841.0, independent: false },
  { name: 'Egypt', region: 'Africa', area: 1002450.0, independent: false },
  { name: 'El Salvador', region: 'Americas', area: 21041.0, independent: false },
  { name: 'Equatorial Guinea', region: 'Africa', area: 28051.0, independent: false },
  { name: 'Eritrea', region: 'Africa', area: 117600.0, independent: false },
  { name: 'Estonia', region: 'Europe', area: 45227.0, independent: false },
  { name: 'Ethiopia', region: 'Africa', area: 1104300.0, independent: false },
  { name: 'Falkland Islands (Malvinas)', region: 'Americas', area: 12173.0, independent: false },
  { name: 'Faroe Islands', region: 'Europe', area: 1393.0, independent: false },
  { name: 'Fiji', region: 'Oceania', area: 18272.0, independent: false },
  { name: 'Finland', region: 'Europe', area: 338424.0, independent: false },
  { name: 'France', region: 'Europe', area: 640679.0, independent: false },
  { name: 'French Guiana', region: 'Americas', independent: false },
  { name: 'French Polynesia', region: 'Oceania', area: 4167.0, independent: false },
  { name: 'French Southern Territories', region: 'Africa', area: 7747.0, independent: false },
  { name: 'Gabon', region: 'Africa', area: 267668.0, independent: false },
  { name: 'Gambia', region: 'Africa', area: 11295.0, independent: false },
  { name: 'Georgia', region: 'Asia', area: 69700.0, independent: false },
  { name: 'Germany', region: 'Europe', area: 357114.0, independent: false },
  { name: 'Ghana', region: 'Africa', area: 238533.0, independent: false },
  { name: 'Gibraltar', region: 'Europe', area: 6.0, independent: false },
  { name: 'Greece', region: 'Europe', area: 131990.0, independent: false },
  { name: 'Greenland', region: 'Americas', area: 2166086.0, independent: false },
  { name: 'Grenada', region: 'Americas', area: 344.0, independent: false },
  { name: 'Guadeloupe', region: 'Americas', independent: false },
  { name: 'Guam', region: 'Oceania', area: 549.0, independent: false },
  { name: 'Guatemala', region: 'Americas', area: 108889.0, independent: false },
  { name: 'Guernsey', region: 'Europe', area: 78.0, independent: false },
  { name: 'Guinea', region: 'Africa', area: 245857.0, independent: false },
  { name: 'Guinea-Bissau', region: 'Africa', area: 36125.0, independent: false },
  { name: 'Guyana', region: 'Americas', area: 214969.0, independent: false },
  { name: 'Haiti', region: 'Americas', area: 27750.0, independent: false },
  { name: 'Heard Island and McDonald Islands', region: 'Antarctic', area: 412.0, independent: false },
];

export default function CountriesList() {
  const [stateData, setStateData] = useState(data);
  const [sortData, setSortData] = useState(data);
  const [areaFilter, setAreaFilter] = useState(false);
  /////////////////////////////////////
  //   useEffect(() => {
  //     axios
  //       .get('https://restcountries.com/v2/all?fields=name,region,area')
  //       .then(function (response) {
  //         // handle success
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //       })
  //       .then(function () {
  //         // always executed
  //       });
  //   }, []);

  // // 👇️ sort by Name ASCENDING (A - Z)
  // const nameAscending = [...data].sort((a, b) => (a.name > b.name ? 1 : -1));
  // console.log('sorting A-Z', nameAscending);

  // // 👇️ sort by Name DESCENDING (Z - A)
  // const nameDescending = [...data].sort((a, b) => (a.name > b.name ? -1 : 1));
  // console.log('sorting Z-A', nameDescending);
  ////////////////////////////////////////////

  const handleSort = (e: any) => {
    let sortedData = [...stateData];
    if (e.target.value === 'name-asc') {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (e.target.value === 'name-desc') {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (e.target.value === 'area-asc') {
      sortedData.sort((a, b) => a.area! - b.area!);
    } else if (e.target.value === 'area-desc') {
      sortedData.sort((a, b) => b.area! - a.area!);
    }
    setSortData(sortedData);
    setStateData(sortedData);
  };

  const handleFilter = () => {
    if (!areaFilter) {
      setAreaFilter(!areaFilter);
      const filteredData = [...sortData].filter((item) => item.area! < 65300);
      setStateData(filteredData);
    } else {
      setAreaFilter(!areaFilter);
      setStateData(sortData);
    }
  };

  // 👇️ sort by Name ASCENDING (A - Z)
  const nameAscending = [...data].sort((a, b) => a.name.localeCompare(b.name));
  console.log('sorting A-Z', nameAscending);

  // 👇️ sort by Name DESCENDING (Z - A)
  const nameDescending = [...data].sort((a, b) => b.name.localeCompare(a.name));
  console.log('sorting Z-A', nameDescending);

  // 👇️ sort by Area ASCENDING (1 - 100)
  const areaAscending = [...data].sort((a, b) => a.area! - b.area!);
  console.log('sorting 1-100', areaAscending);

  // 👇️ sort by Area DESCENDING (1 - 100)
  const areaDescending = [...data].sort((a, b) => b.area! - a.area!);
  console.log('sorting 100-1', areaDescending);

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
          {areaFilter ? (
            <button
              onClick={() => handleFilter()}
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-indigo-200 px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Smaller than
            </button>
          ) : (
            <button
              onClick={() => handleFilter()}
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  hover:bg-gray-50"
            >
              Smaller than
            </button>
          )}

          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-gray-50"
          >
            Only Oceania
          </button>
        </div>
        <div id="sorting" className="flex flex-col gap-2 sm:flex-row sm:gap-8 h-full">
          <div>
            <select
              onChange={handleSort}
              className="mt-1 block w-full h-full bg-white rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:ring-2 sm:text-sm"
            >
              <option value="name-asc">Alphabetically ascending</option>
              <option value="name-desc">Alphabetically descending</option>
              <option value="area-asc">By area ascending</option>
              <option value="area-desc">By area descending</option>
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
            {stateData.map((data) => (
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
