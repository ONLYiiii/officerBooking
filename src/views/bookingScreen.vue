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
        <v-col cols="7">
          <v-row class="mt-2">
            <v-col>
              <p style="font-color: #1f4680">
                จังหวัด<span style="color: red">*</span>
              </p>
              <v-autocomplete
                :rules="Provincerules"
                v-model="selectedProvince"
                variant="outlined"
                :items="province"
                item-title="ccDesc"
                item-value="ccCode"
                required
                color="#1081E9"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <p>อำเภอ/เขต<span style="color: red">*</span></p>
              <v-autocomplete
                :rules="Districtrules"
                v-model="selectedDistrict"
                variant="outlined"
                :items="updateDistrict"
                required
                color="#1081E9"
                item-title="aaDesc"
                item-value="aaCode"
                :disabled="!selectedProvince"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col>
              <p>ประเภทงาน<span style="color: red">*</span></p>
              <v-autocomplete
                :rules="Typerules"
                v-model="selectedType"
                variant="outlined"
                :items="typework"
                required
                color="#1081E9"
                item-title="work"
                item-value="code"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <p>งานบริการ<span style="color: red">*</span></p>
              <v-autocomplete
                :rules="Servicerules"
                v-model="selectedService"
                variant="outlined"
                :items="updateService"
                required
                color="#1081E9"
                :disabled="!selectedType"
                item-title="service"
                item-value="code"
              ></v-autocomplete>
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
    holiday: holiday,
    province: provinceJson,
    district11: district11Json,
    district12: district12Json,
    district13: district13Json,
    typework: typework,
    service: service,
    updateDistrict: [],
    updateService: [],
    selectedProvince: null,
    selectedDate: new Date(),
    selectedwork: null,
    items: ["item1", "item2", "item3", "item4"],
    Provincerules: [
      (value) => {
        if (value) return true;
        return "กรุณาเลือกจังหวัดที่ต้องการเข้ารับบริการ";
      },
    ],
    selectedDistrict: null,
    Districtrules: [
      (value) => {
        if (value) return true;

        return "กรุณาเลือกอำเภอ/เขตที่ต้องการเข้ารับบริการ";
      },
    ],
    selectedType: null,
    Typerules: [
      (value) => {
        if (value) return true;

        return "กรุณาเลือกประเภทที่ต้องการเข้ารับบริการ";
      },
    ],
    selectedService: null,
    Servicerules: [
      (value) => {
        if (value) return true;

        return "กรุณาเลือกงานบริการที่ต้องการเข้ารับบริการ";
      },
    ],
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
  },
  computed: {
    ...mapStores(useBookingDetailsStore),
    allFieldsFilled() {
      return !!(
        this.selectedProvince &&
        this.selectedDistrict &&
        this.selectedType &&
        this.selectedService
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
    selectedProvince: function (newProvince) {
      this.selectedDistrict = null;
      switch (newProvince) {
        case "11":
          this.updateDistrict = this.district11;
          break;
        case "12":
          this.updateDistrict = this.district12;
          break;
        case "13":
          this.updateDistrict = this.district13;
          break;
        default:
          this.updateDistrict = null;
      }
    },
    selectedType: function (setService) {
      // const typeCode = `${setService > 9 ? "" : "0"}${setService}`; If type is integer

      this.selectedService = null;
      this.updateService = this.service.filter((value) =>
        value.code.startsWith(setService)
      );
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
