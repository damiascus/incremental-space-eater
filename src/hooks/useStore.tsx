import { create } from "zustand";

interface SpaceEaterState {
    size: number;
    mass: number;
    topSpeed?: number;
    acceleration?: number;
    reach?: number;
    phase: "Organism" | "Planet" | "Space"; // Maybe Planet > Solar System > Galaxy?
    // Create setter functions for all the properties
    setTopSpeed?: (topSpeed: number) => void;
    setAcceleration?: (acceleration: number) => void;
    setReach?: (reach: number) => void;
    setMass?: (mass: number) => void;
    setSize?: (size: number) => void;
}

const useStore = create<SpaceEaterState>()((set) => ({
    size: 1,
    mass: 1,
    topSpeed: 0,
    acceleration: 0,
    reach: 0,
    phase: "Organism",
    setTopSpeed: (topSpeed) => set({ topSpeed }),
    setAcceleration: (acceleration) => set({ acceleration }),
    setReach: (reach) => set({ reach }),
    setMass: (mass) => set({ mass }),
    setSize: (size) => set({ size }),
}));
