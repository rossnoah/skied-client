import { GroupedSkiAreas, SkiArea } from "./SkiAreaStore";

export function filterToHasSkied(
  groupedSkiAreas: GroupedSkiAreas
): GroupedSkiAreas {
  return Object.entries(groupedSkiAreas).reduce(
    (
      acc: Record<string, Record<string, Record<string, SkiArea>>>,
      [country, states]
    ) => {
      const filteredStates = Object.entries(states).reduce(
        (stateAcc: Record<string, Record<string, SkiArea>>, [state, areas]) => {
          const filteredAreas = Object.entries(areas).reduce(
            (areaAcc: Record<string, SkiArea>, [id, skiArea]) => {
              if (skiArea.hasSkied) {
                areaAcc[id] = skiArea; // Add only ski areas where hasSkied is true
              }
              return areaAcc;
            },
            {}
          );

          if (Object.keys(filteredAreas).length > 0) {
            stateAcc[state] = filteredAreas; // Add state only if it has non-empty ski areas
          }
          return stateAcc;
        },
        {}
      );

      if (Object.keys(filteredStates).length > 0) {
        acc[country] = filteredStates; // Add country only if it has non-empty states
      }
      return acc;
    },
    {}
  );
}

export function filterToUSA(groupedSkiAreas: GroupedSkiAreas): GroupedSkiAreas {
  return Object.entries(groupedSkiAreas).reduce(
    (
      acc: Record<string, Record<string, Record<string, SkiArea>>>,
      [country, states]
    ) => {
      if (country === "United States") {
        acc[country] = states;
      }
      return acc;
    },
    {}
  );
}
