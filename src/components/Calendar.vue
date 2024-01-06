<template>
  <v-row class="mt-2">
    <v-col>
      <v-date-picker
        landscape
        width="600"
        color="#154C8B"
        @update:year="updateYear"
        v-model="selectedDate"
        :allowed-dates="allowedDate"
        :view-mode="viewMode"
        @update:view-mode="updateViewMode"
        :min="new Date()"
        :max="addDate(new Date(), 30)"
      >
        <template v-slot:title>
          <v-btn
            variant="text"
            class="v-date-picker__title"
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
export default {
  props: ["date"],
  emits: ["update-date"],
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
        this.$emit("update-date", newValue);
      },
    },
  },
  methods: {
    updateYear(year) {
      this.$vuetify.locale.messages.th.$vuetify.datePicker.title = `พ.ศ.${
        year + 543
      }`;
    },
    addDate(date, dateCount) {
      const d = date.getDate();
      date.setDate(d + dateCount);
      return date.toISOString();
    },
    allowedDate(val) {
      const isAllowedDate = val.getDay() !== 0 && val.getDay() !== 6;
      // '2024-01-18'
      return isAllowedDate;
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
