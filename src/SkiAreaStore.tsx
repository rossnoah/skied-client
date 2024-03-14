import { create } from "zustand";
import { produce } from "immer";
import {
  ensureNestedStructure,
  sortSkiAreas,
  sortGroupedSkiAreas,
} from "./utils/sorting";

// Define the SkiArea type
export type SkiArea = {
  name: string;
  id: string;
  country: string;
  state: string;
  hasSkied: boolean;
};

export type StateSkiAreas = {
  total: number;
  totalHasSkied: number;
  skiAreas: { [id: string]: SkiArea };
};

export type CountrySkiAreas = {
  total: number;
  totalHasSkied: number;
  states: { [state: string]: StateSkiAreas };
};

export type GroupedSkiAreas = {
  total: number;
  totalHasSkied: number;
  countries: { [country: string]: CountrySkiAreas };
};

// Define the store interface including the data and all utility functions
export interface SkiAreasStore {
  groupedSkiAreas: GroupedSkiAreas;
  idList: string[];
  addSkiArea: (skiArea: SkiArea) => void;
  toggleHasSkied: (skiArea: SkiArea) => boolean;
  clearHasSkied: () => void;
}

// Create the Zustand store
export const useSkiAreasStore = create<SkiAreasStore>((set) => ({
  idList: [],
  groupedSkiAreas: {
    total: 0,
    totalHasSkied: 0,
    countries: {},
  },
  addSkiArea: (skiArea: SkiArea): void => {
    set(
      produce((state: SkiAreasStore) => {
        ensureNestedStructure(state, skiArea.country, skiArea.state);

        const country = state.groupedSkiAreas.countries[skiArea.country];
        const stateData = country.states[skiArea.state];

        if (!stateData.skiAreas[skiArea.id]) {
          stateData.total += 1;
          stateData.totalHasSkied += skiArea.hasSkied ? 1 : 0;
          country.total += 1;
          country.totalHasSkied += skiArea.hasSkied ? 1 : 0;
          state.groupedSkiAreas.total += 1;
          state.groupedSkiAreas.totalHasSkied += skiArea.hasSkied ? 1 : 0;
          state.idList.push(skiArea.id);
        }

        stateData.skiAreas[skiArea.id] = skiArea;
        stateData.skiAreas = sortSkiAreas(stateData.skiAreas);
        state.groupedSkiAreas.countries = sortGroupedSkiAreas(
          state.groupedSkiAreas
        ).countries;
      })
    );
  },
  toggleHasSkied: (skiArea: SkiArea): boolean => {
    const { country, state: stateName, id } = skiArea;
    set(
      produce((state: SkiAreasStore) => {
        ensureNestedStructure(state, country, stateName);

        const currentSkiArea =
          state.groupedSkiAreas.countries[country].states[stateName].skiAreas[
            id
          ];
        if (currentSkiArea) {
          currentSkiArea.hasSkied = !currentSkiArea.hasSkied;
          const increment = currentSkiArea.hasSkied ? 1 : -1;
          state.groupedSkiAreas.countries[country].states[
            stateName
          ].totalHasSkied += increment;
          state.groupedSkiAreas.countries[country].totalHasSkied += increment;
          state.groupedSkiAreas.totalHasSkied += increment;
        }
      })
    );
    return skiArea.hasSkied;
  },
  clearHasSkied: (): void => {
    set(
      produce((state: SkiAreasStore) => {
        Object.values(state.groupedSkiAreas.countries).forEach((country) => {
          country.totalHasSkied = 0;
          Object.values(country.states).forEach((state) => {
            state.totalHasSkied = 0;
            Object.values(state.skiAreas).forEach((skiArea) => {
              skiArea.hasSkied = false;
            });
          });
        });
        state.groupedSkiAreas.totalHasSkied = 0;
      })
    );
  },
}));
