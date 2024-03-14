import {
  SkiAreasStore,
  SkiArea,
  GroupedSkiAreas,
  CountrySkiAreas,
  StateSkiAreas,
} from "../SkiAreaStore";

// Utility function to ensure the nested structure for groupedSkiAreas
export const ensureNestedStructure = (
  state: SkiAreasStore,
  country: string,
  stateName: string
): void => {
  if (!state.groupedSkiAreas.countries[country]) {
    state.groupedSkiAreas.countries[country] = {
      total: 0,
      totalHasSkied: 0,
      states: {},
    };
  }
  if (!state.groupedSkiAreas.countries[country].states[stateName]) {
    state.groupedSkiAreas.countries[country].states[stateName] = {
      total: 0,
      totalHasSkied: 0,
      skiAreas: {},
    };
  }
};

// Utility function to sort ski areas
export const sortSkiAreas = (skiAreas: {
  [id: string]: SkiArea;
}): { [id: string]: SkiArea } => {
  return Object.values(skiAreas)
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((acc, skiArea) => {
      acc[skiArea.id] = skiArea;
      return acc;
    }, {} as { [id: string]: SkiArea });
};

// Utility function to sort the grouped ski areas by country
export const sortGroupedSkiAreas = (
  groupedSkiAreas: GroupedSkiAreas
): GroupedSkiAreas => {
  const sortedCountries = Object.keys(groupedSkiAreas.countries)
    .sort()
    .reduce((acc, country) => {
      const sortedStates = Object.keys(
        groupedSkiAreas.countries[country].states
      )
        .sort()
        .reduce((stateAcc, state) => {
          stateAcc[state] = groupedSkiAreas.countries[country].states[state];
          return stateAcc;
        }, {} as { [state: string]: StateSkiAreas });

      acc[country] = {
        ...groupedSkiAreas.countries[country],
        states: sortedStates,
      };

      return acc;
    }, {} as { [country: string]: CountrySkiAreas });

  return {
    ...groupedSkiAreas,
    countries: sortedCountries,
  };
};
