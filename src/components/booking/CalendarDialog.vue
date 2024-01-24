<template>
  <v-dialog v-model="dialogModel">
    <v-card>
      <v-card-text class="d-flex justify-center pa-0">
        <v-date-picker
          color="#154C8B"
          v-model="selectedDate"
          :allowed-dates="callAllowedDate"
          :min="new Date()"
          :max="maxDateComputed"
        ></v-date-picker>
      </v-card-text>
      <v-card-action class="d-flex justify-end pa-2">
        <v-btn
          class="mr-2"
          variant="text"
          @click="$emit('update:dialog', false)"
        >
          ปิด
        </v-btn>
        <v-btn variant="text" @click="confirmDate"> ตกลง </v-btn>
      </v-card-action>
    </v-card>
  </v-dialog>
</template>

<script>
import { allowedDate } from "@/utilities/calendarConfig";

export default {
  props: ["dialog", "selectDate", "maxDate"],
  emits: ["update:dialog", "update:selectDate"],
  data() {
    return {
      selectedDate: null,
    };
  },
  methods: {
    confirmDate() {
      this.$emit("update:selectDate", this.selectedDate);
      this.$emit("update:dialog", false);
    },
    callAllowedDate(val) {
      return allowedDate(val);
    },
  },
  computed: {
    dialogModel: {
      get() {
        return this.dialog;
      },
      set(newValue) {
        this.$emit("update:dialog", newValue);
      },
    },
    selectDateModel: {
      get() {
        return this.selectDate;
      },
      set(newValue) {
        this.$emit("update:selectDate", newValue);
      },
    },
    maxDateComputed() {
      return this.maxDate ?? new Date();
    },
  },
  watch: {
    dialog: function (newValue) {
      if (newValue) {
        this.selectedDate = this.selectDate;
      }
    },
  },
};
</script>
