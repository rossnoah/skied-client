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

const demoData: GroupedSkiAreas = {
  USA: {
    Colorado: {
      "2": {
        name: "Aspen",
        id: "2",
        country: "USA",
        state: "Colorado",
        hasSkied: false,
      },
    },
  },
  Canada: {
    "British Columbia": {
      "4": {
        name: "Whistler Blackcomb",
        id: "4",
        country: "Canada",
        state: "British Columbia",
        hasSkied: false,
      },
    },
  },
};

// Define the store interface including the data and all utility functions
interface SkiAreasStore {
  groupedSkiAreas: GroupedSkiAreas;
  totalSkiAreas: number;
  totalHasSkied: number;
  addSkiArea: (skiArea: SkiArea) => void;
  toggleHasSkied: (skiArea: SkiArea) => boolean;
}

// Create the Zustand store
export const useSkiAreasStore = create<SkiAreasStore>((set, get) => ({
  groupedSkiAreas: {},
  totalSkiAreas: 0,
  totalHasSkied: 0,
  addSkiArea: (skiArea: SkiArea) => {
    set(
      produce((state: SkiAreasStore) => {
        // Check if the country exists, if not, initialize it
        if (!state.groupedSkiAreas[skiArea.country]) {
          state.groupedSkiAreas[skiArea.country] = {};
        }

        // Check if the state exists in the country, if not, initialize it
        if (!state.groupedSkiAreas[skiArea.country][skiArea.state]) {
          state.groupedSkiAreas[skiArea.country][skiArea.state] = {} as {
            [id: string]: SkiArea;
          };
        }

        // Add the ski area to the state, increment totalSkiAreas counter
        if (
          !state.groupedSkiAreas[skiArea.country][skiArea.state][skiArea.id]
        ) {
          state.totalSkiAreas += 1; // Increment only if the ski area is new

          if (skiArea.hasSkied) {
            state.totalHasSkied += 1; // Increment only if the ski area is new and hasSkied
          }
        }

        // Add the ski area to the state
        state.groupedSkiAreas[skiArea.country][skiArea.state][skiArea.id] =
          skiArea;

        // Sort ski areas within the state
        const sortedSkiAreas = Object.values(
          state.groupedSkiAreas[skiArea.country][skiArea.state]
        ).sort((a, b) => a.name.localeCompare(b.name));
        state.groupedSkiAreas[skiArea.country][skiArea.state] =
          sortedSkiAreas.reduce((acc, skiArea) => {
            acc[skiArea.id] = skiArea;
            return acc;
          }, {} as { [id: string]: SkiArea });
      })
    );

    // Sort countries and states after adding a new ski area
    set(
      produce((state: SkiAreasStore) => {
        const sortedCountries = Object.keys(state.groupedSkiAreas).sort();
        const sortedGroupedSkiAreas: GroupedSkiAreas = {};

        sortedCountries.forEach((country) => {
          sortedGroupedSkiAreas[country] = {};
          const sortedStates = Object.keys(
            state.groupedSkiAreas[country]
          ).sort();

          sortedStates.forEach((stateName) => {
            sortedGroupedSkiAreas[country][stateName] =
              state.groupedSkiAreas[country][stateName];
          });
        });

        state.groupedSkiAreas = sortedGroupedSkiAreas;
      })
    );
  },
  toggleHasSkied: (skiArea: SkiArea) => {
    const country = skiArea.country;
    const state = skiArea.state;
    const id = skiArea.id;
    set(
      produce((draft: SkiAreasStore) => {
        // Ensure the nested structure exists up to the desired ski area
        if (
          draft.groupedSkiAreas[country] &&
          draft.groupedSkiAreas[country][state] &&
          draft.groupedSkiAreas[country][state][id]
        ) {
          // Toggle the hasSkied property
          draft.groupedSkiAreas[country][state][id].hasSkied =
            !draft.groupedSkiAreas[country][state][id].hasSkied;

          // Increment or decrement totalHasSkied based on the new value of hasSkied
          draft.totalHasSkied += draft.groupedSkiAreas[country][state][id]
            .hasSkied
            ? 1
            : -1;
        }
      })
    );
    //return the new value of hasSkied
    return get().groupedSkiAreas[country][state][id].hasSkied;
  },
}));
