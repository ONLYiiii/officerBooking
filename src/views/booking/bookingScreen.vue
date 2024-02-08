<template>
  <v-container fluid class="pa-8">
    <v-card>
      <v-card-title
        :style="{
          backgroundColor: $vuetify.theme.global.current.colors.primary,
          color: 'whitesmoke',
          paddingTop: '14px',
          paddingRight: '16px',
          paddingBottom: '14px',
        }"
        ><v-icon icon="mdi-square-edit-outline" size="20"></v-icon>
        ลงทะเบียนข้อมูลขอเข้ารับบริการ</v-card-title
      >
      <v-card-text style="padding: 40px">
        <v-row>
          <v-col cols="12" lg="7">
            <v-row>
              <v-col
                cols="12"
                sm="6"
                v-for="(item, key) in autocompleteProps"
                :key="key"
              >
                <Autocomplete
                  :header="item.header"
                  :rules="item.rules"
                  :items="item.items"
                  :itemTitle="item.itemTitle"
                  :itemValue="item.itemValue"
                  :disabled="item.disabled"
                  v-model="item.modelValue"
                />
              </v-col>
              <v-col cols="12" v-if="allFieldsFilled">
                <p style="color: #7d7d7d;">
                  เลือกวันที่จะเข้ารับบริการ
                </p>
              </v-col>
              <v-col v-if="allFieldsFilled">
                <custom-calendar
                  v-if="!mobileBreak"
                  v-model:date="selectedDate"
                  :max-date="maxDate"
                ></custom-calendar>
                <v-btn v-else @click="() => (calendarDialog = !calendarDialog)">
                  เลือกวันที่
                </v-btn>
                <CalendarDialog
                  v-model:dialog="calendarDialog"
                  v-model:selectDate="selectedDate"
                  :max-date="maxDate"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="isCodeVisible">
            <BookingSummary
              :is-code-visible="isCodeVisible"
              :get-formatted-date="getFormattedDate"
              :selected-province-title="selectedProvinceTitle"
              :selected-district-title="selectedDistrictTitle"
              :selected-type-title="selectedTypeTitle"
              :selected-service-title="selectedServiceTitle"
              :selected-province="autocompleteProps.province.modelValue"
              @book-morning-time="bookMorningTime"
              @book-afternoon-time="bookAfternoonTime"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <dialog-info
      v-if="isCodeVisible"
      @toggle-dialog-visible="(newValue) => (dialogVisible = newValue)"
      :dialogVisible="dialogVisible"
      :screenOrientation="screenOrientation"
      :bookTime="Bookingtime"
      :selected-date="selectedDate"
      :selected-province-title="selectedProvinceTitle"
      :selected-service-title="selectedServiceTitle"
      :selected-type-title="selectedTypeTitle"
      :selected-district-title="selectedDistrictTitle"
      :selected-province="autocompleteProps.province.modelValue"
      :selectedDistrict="autocompleteProps.district.modelValue"
      :selectedType="autocompleteProps.work.modelValue"
      :selectedService="autocompleteProps.service.modelValue"
      :get-formatted-date="getFormattedDate"
    ></dialog-info>
  </v-container>
</template>

<script>
import Autocomplete from "@/components/booking/inputComponent/autocomplete.vue";
import DialogInfo from "@/components/booking/DialogInfo.vue";
import CustomCalendar from "@/components/booking/CustomCalendar.vue";
import BookingSummary from "@/components/booking/BookingSummary.vue";
import CalendarDialog from "@/components/booking/CalendarDialog.vue";

import holiday from "@/json/holiday.json";
import provinceJson from "@/json/province.json";
import typework from "@/json/typework.json";
import service from "@/json/service.json";

import { getFullDate, formatDate } from "@/utilities/formatDate";
import addDate from "@/utilities/addDate";

import api from "@/api/booking.js";

import Swal from "sweetalert2";

export default {
  components: {
    DialogInfo,
    CustomCalendar,
    Autocomplete,
    BookingSummary,
    CalendarDialog,
  },
  data: () => ({
    holidayData: null,
    autocompleteProps: {
      province: {
        header: "จังหวัด",
        rules: [
          (value) => {
            if (value) return true;
            return "กรุณาเลือกจังหวัดที่ต้องการเข้ารับบริการ";
          },
        ],
        items: provinceJson.sort((a, b) =>
          a.ccDesc.localeCompare(b.ccDesc, "th-TH")
        ),
        itemTitle: "ccDesc",
        itemValue: "ccCode",
        oldModelValue: null,
        modelValue: null,
        disabled: false,
      },
      district: {
        header: "อำเภอ/เขต",
        rules: [
          (value) => {
            if (value) return true;

            return "กรุณาเลือกอำเภอ/เขตที่ต้องการเข้ารับบริการ";
          },
        ],
        items: [],
        itemTitle: "description",
        itemValue: "code",
        modelValue: null,
        oldModelValue: null,
        disabled: false,
      },
      work: {
        header: "ประเภทงาน",
        rule: [
          (value) => {
            if (value) return true;

            return "กรุณาเลือกประเภทที่ต้องการเข้ารับบริการ";
          },
        ],
        items: typework.slice(1),
        itemTitle: "work",
        itemValue: "code",
        oldModelValue: null,
        modelValue: null,
        disabled: false,
      },
      service: {
        header: "งานบริการ",
        rule: [
          (value) => {
            if (value) return true;
            return "กรุณาเลือกงานบริการที่ต้องการเข้ารับบริการ";
          },
        ],
        items: [],
        itemTitle: "service",
        itemValue: "code",
        modelValue: null,
        oldModelValue: null,
        disabled: false,
      },
    },

    holiday: holiday,
    service: service,
    dialogVisible: false,
    Bookingtime: "",
    selectedDate: null,
    calendarDialog: false,
    maxDate: null,
  }),
  methods: {
    showSummaryInfo() {
      this.isCodeVisible = !this.isCodeVisible;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    bookMorningTime() {
      this.Bookingtime = 1;
      this.showDialog();
    },
    bookAfternoonTime() {
      this.Bookingtime = 2;
      this.showDialog();
    },
    updateDate(newValue) {
      this.selectedDate = newValue;
    },
    async getDistrict(cc) {
      try {
        const datas = [];
        if (+cc === 10) {
          datas.push({
            code: "0083",
            description: "ศูนย์บริการประชาชน",
            descriptionEnglish: "",
          });
          this.autocompleteProps.district.modelValue = "0083";
          this.autocompleteProps.district.disabled = true;
        } else {
          let resDatas = await api.getDistrict(cc);
          datas.push(...resDatas.data);
          this.autocompleteProps.district.disabled = false;
        }

        return datas;
      } catch (error) {
        console.error("getDistrict Error:", error);
      }
    },
    async getBookingOver() {
      try {
        const resDuration = await api.getBookingOver(
          this.autocompleteProps.work.modelValue,
          this.autocompleteProps.service.modelValue
        );
        return addDate(new Date(), resDuration.data[0].duration);
      } catch (error) {
        console.error("getBookingOver Error:", error);
      }
    },
    async getHoliday() {
      const response = await api.getHoliday();
      this.holidayData = response.data;
    },
  },
  computed: {
    allFieldsFilled() {
      return !!(
        this.autocompleteProps.province.modelValue &&
        this.autocompleteProps.district.modelValue &&
        this.autocompleteProps.work.modelValue &&
        this.autocompleteProps.service.modelValue
      );
    },
    isCodeVisible() {
      return this.selectedDate !== null;
    },
    selectedProvinceTitle() {
      if (this.autocompleteProps.province.modelValue) {
        const index = this.autocompleteProps.province.items.findIndex(
          (value) => value.ccCode === this.autocompleteProps.province.modelValue
        );
        return this.autocompleteProps.province.items[index].ccDesc;
      }

      return "กรุณาเลือกจังหวัด";
    },
    selectedDistrictTitle() {
      if (this.autocompleteProps.district.modelValue) {
        const index = this.autocompleteProps.district.items.findIndex(
          (value) => value.code === this.autocompleteProps.district.modelValue
        );
        return this.autocompleteProps.district.items[index].description;
      }

      return "กรุณาเลือกอำเภอ/เขต";
    },
    selectedTypeTitle() {
      if (this.autocompleteProps.work.modelValue) {
        const index = this.autocompleteProps.work.items.findIndex(
          (value) => value.code === this.autocompleteProps.work.modelValue
        );
        return this.autocompleteProps.work.items[index].work;
      }

      return "กรุณาเลือกประเภทงาน";
    },
    selectedServiceTitle() {
      if (this.autocompleteProps.service.modelValue) {
        const index = this.autocompleteProps.service.items.findIndex(
          (value) => value.code === this.autocompleteProps.service.modelValue
        );
        return this.autocompleteProps.service.items[index].service;
      }

      return "กรุณาเลือกงานบริการ";
    },
    getFormattedDate() {
      return formatDate(this.selectedDate);
    },
    mobileBreak() {
      return this.$vuetify.display.mobile;
    },
    screenOrientation() {
      const orientation =
        this.$vuetify.display.width > this.$vuetify.display.height
          ? "landscape"
          : "portrait";
      return orientation;
    },
  },
  watch: {
    autocompleteProps: {
      async handler(newValue) {
        if (
          newValue.province.modelValue !== null &&
          newValue.province.modelValue !== newValue.province.oldModelValue
        ) {
          this.autocompleteProps.district.modelValue = null;

          let resDatas = await this.getDistrict(
            this.autocompleteProps.province.modelValue
          );
          this.autocompleteProps.district.items = resDatas;

          this.autocompleteProps.province.oldModelValue =
            newValue.province.modelValue;
        }

        if (
          newValue.district.modelValue !== null &&
          newValue.district.modelValue !== newValue.district.oldModelValue
        ) {
          this.autocompleteProps.district.oldModelValue =
            newValue.district.modelValue;
        }

        if (
          newValue.work.modelValue !== null &&
          newValue.work.modelValue !== newValue.work.oldModelValue
        ) {
          const typeCode = `${newValue.work.modelValue > 9 ? "" : "0"}${
            newValue.work.modelValue
          }`;

          this.autocompleteProps.service.modelValue = null;
          this.autocompleteProps.service.items = this.service.filter((value) =>
            value.code.startsWith(typeCode)
          );
          this.autocompleteProps.work.oldModelValue = newValue.work.modelValue;
        }

        if (
          newValue.service.modelValue !== null &&
          newValue.service.modelValue !== newValue.service.oldModelValue
        ) {
          this.autocompleteProps.service.oldModelValue =
            newValue.service.modelValue;
        }

        if (
          newValue.work.modelValue !== null &&
          newValue.service.modelValue !== null
        ) {
          this.maxDate = await this.getBookingOver();
        }

        if (newValue.service.modelValue && !this.allFieldsFilled) {
          Swal.fire({
            title: "เเจ้งเตือน",
            text: `กรุณาใส่${
              !newValue.province.modelValue ? "จังหวัดและอำเภอ/เขต" : "อำเภอเขต"
            }`,
            icon: "info",
            confirmButtonText: "ปิด",
          });
        }
      },
      deep: true,
    },
    allFieldsFilled: function (newValue) {
      if (!newValue) {
        this.selectedDate = null;
      }
    },
    selectedDate: function (newDate, oldDate) {
      const index = this.holidayData.findIndex(
        (value) => getFullDate(new Date(newDate)) === value.holidayDate
      );
      if (index === -1) {
        return;
      } else {
        Swal.fire({
          title: "เเจ้งเตือน",
          text: `ไม่สามารถเลือกวันที่นี้ได้เนื่องจากเป็น${this.holidayData[index].holidayDesc}`,
          icon: "info",
          confirmButtonText: "ปิด",
        });
        this.selectedDate = oldDate;
      }
    },
    mobileBreak: function () {
      this.calendarDialog = false;
    },
  },
  mounted() {
    this.getHoliday();
  },
};
</script>

<style>
.custom-title {
  background-color: #154c8b;
  height: 60px;
  color: whitesmoke;
}
.Info-custom {
  color: #154c8b;
}
</style>
