<template>
  <v-card
    class="mx-auto mt-7"
    max-width="85vw"
    max-height="95vh"
    elevation="5"
    rounded="lg"
  >
    <v-card class="text-h6 custom-title d-flex align-center">
      <v-card-title class="ml-5">ลงทะเบียนข้อมูลขอเข้ารับบริการ</v-card-title>
    </v-card>

    <div class="pa-10">
      <v-row>
        <v-col cols="12" lg="7">
          <!-- Left Side -->
          <v-row class="mt-2">
            <!-- Only 4 Autocomplete Component -->
            <v-col
              cols="12"
              lg="6"
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
          </v-row>

          <v-row>
            <v-col>
              <p style="color: #7d7d7d; font-family: 'Kanit'">
                เลือกวันที่จะเข้ารับบริการ
              </p>
              <calendar
                v-if="allFieldsFilled"
                :date="selectedDate"
                @update-date="updateDate"
              ></calendar>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          v-if="isCodeVisible"
          cols="4"
          class="ml-5 mt-4"
          style="line-height: 50px"
        >
          <div style="line-height: 60px">
            <h3 class="Info-custom">วันที่ {{ getFormattedDate }}</h3>

            <h3 class="Info-custom">
              จังหวัด{{ selectedProvinceTitle }} อำเภอ/เขต{{
                selectedDistrictTitle
              }}
            </h3>

            <h3 class="Info-custom">
              นัดหมายขอเข้ารับบริการ{{ selectedTypeTitle }}:
              {{ selectedServiceTitle }}
            </h3>
          </div>
          <v-row class="mt-2">
            <v-col class="d-flex flex-column align-start">
              <h3 style="color: red; font-family: 'Kanit'">
                ช่วงเช้า (เวลา 09.00 - 11.00)
              </h3>
              <v-btn
                style="font-family: 'Kanit'"
                rounded="lg"
                size="x-large"
                width="80%"
                color="#154C8B"
                @click="BookMorningTime"
              >
                จองคิว</v-btn
              >
            </v-col>
            <v-col class="d-flex flex-column align-center">
              <h3 style="color: red; font-family: 'Kanit'">
                ช่วงบ่าย (เวลา 13.00 - 15.00)
              </h3>
              <v-btn
                style="font-family: 'Kanit'"
                rounded="lg"
                size="x-large"
                width="80%"
                color="#154C8B"
                @click="BookAfternoonTime"
                >จองคิว
              </v-btn>
            </v-col>
          </v-row>
          <v-dialog v-model="dialogVisible" persistent width="auto">
            <dialog-info
              @close-dialog="dialogVisible = false"
              :bookTime="Bookingtime"
              :selected-date="selectedDate"
              :selected-province-title="selectedProvinceTitle"
              :selected-service-title="selectedServiceTitle"
              :selected-type-title="selectedTypeTitle"
              :selected-district-title="selectedDistrictTitle"
              :select-province="selectedProvince"
              :selectedDistrict="selectedDistrict"
              :selectedType="selectedType"
              :selectedService="selectedService"
              :get-formatted-date="getFormattedDate"
            ></dialog-info>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
//Component Import
import Autocomplete from "@/components/inputComponent/autocomplete.vue";

import DialogInfo from "@/components/DialogInfo.vue";
import Calendar from "@/components/Calendar.vue";
import holiday from "../json/holiday.json";
import provinceJson from "../json/province.json";
import district11Json from "../json/district-11.json";
import district12Json from "../json/district-12.json";
import district13Json from "../json/district-13.json";
import typework from "../json/typework.json";
import service from "../json/service.json";
import { getFullDate } from "@/utilities/addDate";
import { mapStores } from "pinia";
import { useBookingDetailsStore } from "@/stores/booking_details";
export default {
  data: () => ({
    autocompleteProps: {
      province: {
        header: "จังหวัด",
        rules: [
          (value) => {
            if (value) return true;
            return "กรุณาเลือกจังหวัดที่ต้องการเข้ารับบริการ";
          },
        ],
        items: provinceJson,
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
        itemTitle: "aaDesc",
        itemValue: "aaCode",
        modelValue: null,
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
        items: typework,
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
        disabled: false,
      },
    },

    holiday: holiday,
    district11: district11Json,
    district12: district12Json,
    district13: district13Json,
    service: service,
    dialogVisible: false,
    Bookingtime: "",
    selectedDate: null,
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
    BookMorningTime() {
      this.Bookingtime = 1;
      this.showDialog();
    },
    BookAfternoonTime() {
      this.Bookingtime = 2;
      this.showDialog();
    },
    updateDate(newValue) {
      this.selectedDate = newValue;
    },
    getFormattedDate() {
      const day = this.selectedDate.getDate();
      const month = this.getMonthName(this.selectedDate.getMonth());
      const year = this.selectedDate.getFullYear() + 543; // Adding 543 to get the Buddhist era year

      return `${day} ${month} ${year}`;
    },
    getMonthName(month) {
      const monthNames = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];

      return monthNames[month];
    },
    updateDate(newDate) {
      this.selectedDate = newDate;
    },
  },
  components: {
    DialogInfo,
    Calendar,
    Autocomplete,
  },
  computed: {
    ...mapStores(useBookingDetailsStore),
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
      if (this.selectedProvince) {
        const index = this.province.findIndex(
          (value) => value.ccCode === this.selectedProvince
        );
        return this.province[index].ccDesc;
      }

      return "กรุณาเลือกจังหวัด";
    },
    selectedDistrictTitle() {
      if (this.selectedDistrict) {
        const index = this.updateDistrict.findIndex(
          (value) => value.aaCode === this.selectedDistrict
        );
        return this.updateDistrict[index].aaDesc;
      }

      return "กรุณาเลือกอำเภอ/เขต";
    },
    selectedTypeTitle() {
      if (this.selectedType) {
        const index = this.typework.findIndex(
          (value) => value.code === this.selectedType
        );
        return this.typework[index].work;
      }

      return "กรุณาเลือกประเภทงาน";
    },
    selectedServiceTitle() {
      if (this.selectedService) {
        const index = this.service.findIndex(
          (value) => value.code === this.selectedService
        );
        return this.service[index].service;
      }

      return "กรุณาเลือกงานบริการ";
    },
    getFormattedDate() {
      const day = this.selectedDate.getDate();
      const month = this.getMonthName(this.selectedDate.getMonth());
      const year = this.selectedDate.getFullYear() + 543; // Adding 543 to get the Buddhist era year

      return `${day} ${month} ${year}`;
    },
  },
  watch: {
    autocompleteProps: {
      handler(newValue) {
        //* Province and District
        if (
          newValue.province.modelValue !== null &&
          newValue.province.modelValue !== newValue.province.oldModelValue
        ) {
          this.autocompleteProps.district.modelValue = null;
          switch (newValue.province.modelValue) {
            case "11":
              this.autocompleteProps.district.items = this.district11;
              break;
            case "12":
              this.autocompleteProps.district.items = this.district12;
              break;
            case "13":
              this.autocompleteProps.district.items = this.district13;
              break;
            default:
              this.autocompleteProps.district.items = null;
          }
          this.autocompleteProps.province.oldModelValue =
            newValue.province.modelValue;
        }

        //* Work and Service
        if (
          newValue.work.modelValue !== null &&
          newValue.work.modelValue !== newValue.work.oldModelValue
        ) {
          // const typeCode = `${setService > 9 ? "" : "0"}${setService}`; If type is integer

          this.autocompleteProps.service.modelValue = null;
          this.autocompleteProps.service.items = this.service.filter((value) =>
            value.code.startsWith(newValue.work.modelValue)
          );
          this.autocompleteProps.work.oldModelValue = newValue.work.modelValue;
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
      const index = holiday.findIndex(
        (value) => getFullDate(new Date(newDate)) === value.date
      );
      if (index === -1) {
        return;
      } else {
        alert(
          `ไม่สามารถเลือกวันที่นี้ได้เนื่องจากเป็น${this.holiday[index].title}`
        );
        this.selectedDate = oldDate;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Kanit");
.custom-title {
  font-family: "Kanit";
  background-color: #154c8b;
  height: 60px;
  color: whitesmoke;
}
.Info-custom {
  font-family: "Kanit";
  color: #154c8b;
}
</style>
