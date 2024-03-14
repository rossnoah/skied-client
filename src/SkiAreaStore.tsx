import { create } from "zustand";
import { produce } from "immer";

// Define the SkiArea type
export type SkiArea = {
  name: string;
  id: string;
  country: string;
  state: string;
  hasSkied: boolean;
};

export type GroupedSkiAreas = {
  [country: string]: {
    [state: string]: {
      [id: string]: SkiArea;
    };
  };
};

// Define the store interface including the data and all utility functions
interface SkiAreasStore {
  groupedSkiAreas: GroupedSkiAreas;
  totalSkiAreas: number;
  totalHasSkied: number;
  idList: string[];
  addSkiArea: (skiArea: SkiArea) => void;
  toggleHasSkied: (skiArea: SkiArea) => boolean;
  clearHasSkied: () => void;
}

// Utility function to ensure the nested structure for groupedSkiAreas
const ensureNestedStructure = (
  state: SkiAreasStore,
  country: string,
  stateName: string
): void => {
  if (!state.groupedSkiAreas[country]) {
    state.groupedSkiAreas[country] = {};
  }
  if (!state.groupedSkiAreas[country][stateName]) {
    state.groupedSkiAreas[country][stateName] = {};
  }
};

// Utility function to sort ski areas
const sortSkiAreas = (skiAreas: {
  [id: string]: SkiArea;
}): { [id: string]: SkiArea } => {
  return Object.values(skiAreas)
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((acc, skiArea) => {
      acc[skiArea.id as string] = skiArea;
      return acc;
    }, {} as { [id: string]: SkiArea });
};

// Utility function to sort the grouped ski areas by country and state
const sortGroupedSkiAreas = (
  groupedSkiAreas: GroupedSkiAreas
): GroupedSkiAreas => {
  const sortedGroupedSkiAreas: GroupedSkiAreas = {};
  Object.keys(groupedSkiAreas)
    .sort()
    .forEach((country) => {
      sortedGroupedSkiAreas[country] = {};
      Object.keys(groupedSkiAreas[country])
        .sort()
        .forEach((stateName) => {
          sortedGroupedSkiAreas[country][stateName] =
            groupedSkiAreas[country][stateName];
        });
    });
  return sortedGroupedSkiAreas;
};

// Create the Zustand store
export const useSkiAreasStore = create<SkiAreasStore>((set, get) => ({
  groupedSkiAreas: {},
  totalSkiAreas: 0,
  totalHasSkied: 0,
  idList: [],
  addSkiArea: (skiArea: SkiArea): void => {
    set(
      produce((state: SkiAreasStore) => {
        ensureNestedStructure(state, skiArea.country, skiArea.state);

        if (
          !state.groupedSkiAreas[skiArea.country][skiArea.state][skiArea.id]
        ) {
          state.totalSkiAreas += 1;
          state.idList.push(skiArea.id);
          state.totalHasSkied += skiArea.hasSkied ? 1 : 0;
        }

        state.groupedSkiAreas[skiArea.country][skiArea.state][skiArea.id] =
          skiArea;

        state.groupedSkiAreas[skiArea.country][skiArea.state] = sortSkiAreas(
          state.groupedSkiAreas[skiArea.country][skiArea.state]
        );

        state.groupedSkiAreas = sortGroupedSkiAreas(state.groupedSkiAreas);
      })
    );
  },
  toggleHasSkied: (skiArea: SkiArea): boolean => {
    const { country, state: stateName, id } = skiArea;
    set(
      produce((state: SkiAreasStore) => {
        ensureNestedStructure(state, country, stateName);

        const currentSkiArea = state.groupedSkiAreas[country][stateName][id];
        if (currentSkiArea) {
          currentSkiArea.hasSkied = !currentSkiArea.hasSkied;
          state.totalHasSkied += currentSkiArea.hasSkied ? 1 : -1;
        }
      })
    );
    return get().groupedSkiAreas[country][stateName][id].hasSkied;
  },
  clearHasSkied: (): void => {
    set(
      produce((state: SkiAreasStore) => {
        Object.values(state.groupedSkiAreas).forEach((states) => {
          Object.values(states).forEach((skiAreas) => {
            Object.values(skiAreas).forEach((skiArea) => {
              skiArea.hasSkied = false;
            });
          });
        });
        state.totalHasSkied = 0;
      })
    );
  },
}));
