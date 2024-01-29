<template>
    <vue-date-picker
      v-model="startEndDateModelValue"
      locale="th-TH"
      placeholder="เลือกวันที่เริ่มต้น - วันที่สิ้นสุด"
      :format="formatDatePicker"
      :enable-time-picker="false"
      :start-time="startTime"
      :clearable="false"
      :min-date="minDate"
      :max-date="maxDate"
      select-text="เลือก"
      cancel-text="ยกเลิก"
      input-class-name="customDatePicker"
      menu-class-name="customMenu"
      model-auto
      range
    >
      <template #action-row="{ internalModelValue, selectDate }">
        <div class="action-row">
          <p class="mb-5" style="font-size: smaller;">{{ formatDatePicker(internalModelValue) }}</p>
          <v-btn color="primary" size="small" variant="outlined" @click="selectDate">
            Select Date
          </v-btn>
        </div>
      </template>
    </vue-date-picker>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { formatShortDate } from "@/utilities/formatDate";

export default {
  components: {
    VueDatePicker
  },
  props: ["startEndDate", "minDate", "maxDate"],
  emits: ["update:startEndDate"],
  data() {
    return {
      startTime: [
        {
          hours: 0,
          minutes: 0,
        },
        {
          hours: 0,
          minutes: 0,
        },
      ],
    }
  },
  computed: {
    startEndDateModelValue: {
      get() {
        return this.startEndDate;
      },
      set(newValue) {
        this.$emit('update:startEndDate', newValue);
      }
    },
  },
  methods: {
    formatDatePicker(date) {
      if (!date) {
        return "วันที่เริ่มต้น - วันที่สิ้นสุด"
      }

      const date1 = date[0] ? formatShortDate(date[0], true) : "";
      const date2 = date[1] ? formatShortDate(date[1], true) : "";

      
      if (date.length === 2 && date[1] !== null) {
        return `${date1} ถึง ${date2}`;
      } else {
        return `${date1}`;
      }
    },
  }
}
</script>

<style lang="scss">
.action-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
}
.customDatePicker {
  padding-top: 7px;
  padding-bottom: 8px;
}
.customMenu {
  width: 350px;
}
.dp-action-row {
    width: 100% !important;
}
</style>