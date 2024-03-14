import {
  CountrySkiAreas,
  GroupedSkiAreas,
  SkiArea,
  StateSkiAreas,
} from "../SkiAreaStore";

export function filterToHasSkied(
  groupedSkiAreas: GroupedSkiAreas
): GroupedSkiAreas {
  const filteredCountries = Object.entries(groupedSkiAreas.countries).reduce(
    (acc, [countryName, countryData]) => {
      let countryTotal = 0;
      let countryTotalHasSkied = 0;

      const filteredStates = Object.entries(countryData.states).reduce(
        (stateAcc, [stateName, stateData]) => {
          const filteredSkiAreas = Object.entries(stateData.skiAreas).reduce(
            (areaAcc, [areaId, skiArea]) => {
              if (skiArea.hasSkied) {
                areaAcc[areaId] = skiArea;
                countryTotalHasSkied++;
              }
              return areaAcc;
            },
            {} as { [id: string]: SkiArea }
          );

          if (Object.keys(filteredSkiAreas).length > 0) {
            stateAcc[stateName] = {
              ...stateData,
              skiAreas: filteredSkiAreas,
              total: Object.keys(filteredSkiAreas).length,
              totalHasSkied: Object.keys(filteredSkiAreas).length,
            };
            countryTotal += Object.keys(filteredSkiAreas).length;
          }

          return stateAcc;
        },
        {} as { [state: string]: StateSkiAreas }
      );

      if (Object.keys(filteredStates).length > 0) {
        acc[countryName] = {
          ...countryData,
          states: filteredStates,
          total: countryTotal,
          totalHasSkied: countryTotalHasSkied,
        };
      }

      return acc;
    },
    {} as { [country: string]: CountrySkiAreas }
  );

  return {
    ...groupedSkiAreas,
    countries: filteredCountries,
    total: Object.values(filteredCountries).reduce(
      (sum, country) => sum + country.total,
      0
    ),
    totalHasSkied: Object.values(filteredCountries).reduce(
      (sum, country) => sum + country.totalHasSkied,
      0
    ),
  };
}

export function filterToUSA(groupedSkiAreas: GroupedSkiAreas): GroupedSkiAreas {
  if (groupedSkiAreas.countries["United States"]) {
    const usaData = groupedSkiAreas.countries["United States"];

    return {
      total: usaData.total,
      totalHasSkied: usaData.totalHasSkied,
      countries: {
        "United States": usaData,
      },
    };
  } else {
    return {
      total: 0,
      totalHasSkied: 0,
      countries: {},
    };
  }
}
