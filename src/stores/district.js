import { defineStore } from "pinia";

export const useDistrictStore = defineStore("district", {
  state: () => {
    return {
      district: null,
    };
  },
  actions: {
    setNewValue(newValue) {
        this.district = newValue;
    }
  },
});
