<template>
  <v-row class="mt-2">
    <v-col>
      <v-date-picker
        landscape
        width="600"
        color="#154C8B"
        @update:year="updateYear"
        v-model="selectedDate"
        :allowed-dates="callAllowedDate"
        :view-mode="viewMode"
        @update:view-mode="updateViewMode"
        :min="new Date()"
        :max="maxDateComputed"
      >
        <template v-slot:title>
          <v-btn
            variant="text"
            class="v-date-picker_220.032_title"
            @click="changeViewMode"
          >
            {{ $vuetify.locale.messages.th.$vuetify.datePicker.title }}
          </v-btn>
        </template>
      </v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
import { allowedDate } from "@/utilities/calendarConfig";

export default {
  props: ["date", "maxDate"],
  emits: ["update:date"],
  data() {
    return {
      viewMode: "month",
    };
  },
  computed: {
    selectedDate: {
      get() {
        return this.date;
      },
      set(newValue) {
        this.$emit("update:date", newValue);
      },
    },
    maxDateComputed() {
      return this.maxDate ?? new Date();
    },
  },
  methods: {
    updateYear(year) {
      this.$vuetify.locale.messages.th.$vuetify.datePicker.title = `พ.ศ.${
        year + 543
      }`;
    },
    callAllowedDate(val) {
      return allowedDate(val);
    },
    changeViewMode() {
      if (this.viewMode === "year") {
        this.viewMode = "month";
      } else {
        this.viewMode = "year";
      }
    },
    updateViewMode(newViewMode) {
      this.viewMode = newViewMode;
    },
  },
};
</script>

<style>
.v-picker--landscape {
  grid-template-areas: "title body" !important;
  grid-template-columns: 230px auto;
  /* grid-template-rows: 430px 430px; */
}
.v-date-picker-months,
.v-date-picker-years {
  height: 372px !important;
}
</style>
