<template>
  <v-dialog v-model="dialogVisibleModel" content-class="align-center">
    <v-card
      min-height="10vh"
      :min-width="screenOrientation === 'landscape' ? '30vw' : '90vw'"
      class="text-center"
      style="line-height: 15px"
    >
      <v-card-title class="titledialog d-flex align-center" color="primary"
        >ยืนยันการจอง</v-card-title
      >

      <v-card-text>ยืนยันการจองนัดหมายขอเข้ารับบริการ </v-card-text>
      <v-card-text>วันที่ {{ getFormattedDate }} </v-card-text>
      <v-card-text>{{ selectedTypeTitle }}</v-card-text>
      <v-card-text>{{ selectedServiceTitle }}</v-card-text>
      <v-card-text
        >{{ selectedProvince === "10" ? "" : "จังหวัด"
        }}{{ selectedProvinceTitle }}
        {{ selectedProvince === "10" ? "" : "อำเภอ"
        }}{{ selectedDistrictTitle }}</v-card-text
      >
      <v-card-text>{{ bookTimeString }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          variant="text"
          @click="() => $emit('toggleDialogVisible', false)"
        >
          ยกเลิก
        </v-btn>
        <v-btn color="#1081E9" variant="flat" @click="GotopdfScreen">
          ยืนยัน
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
//* Utilities Import
import { getFullDate } from "@/utilities/formatDate";

//* Stores Import
import {
  getUserInfoStore,
  getBookingDetailsStore,
  getDistrictStore,
} from "@/stores/getter_stores";

//* api Import
import api from "@/api/booking.js";

export default {
  props: {
    dialogVisible: Boolean,
    screenOrientation: String,
    bookTime: Number,
    selectedDate: String,
    selectedProvinceTitle: String,
    selectedTypeTitle: String,
    selectedServiceTitleselectedServiceTitle: String,
    selectedDistrictTitle: String,
    selectedProvince: String,
    selectedDistrict: String,
    selectedType: Number,
    selectedService: Number,
    getFormattedDate: String,
    selectedServiceTitle: String,
  },
  emits: ["toggleDialogVisible"],
  data() {
    return {
      bookingId: null,
    };
  },
  methods: {
    // async confirmAndGoToPdfScreen() {
    //   const sendData = {
    //     citizen_id: "1102500034183",
    //     booking_id: 0,
    //     rcode: this.selectedProvince + this.selectedDistrict,
    //     date_booking: getFullDate(this.selectedDate),
    //     type_work: this.selectedType,
    //     type_service: this.selectedService,
    //     time_booking: this.bookTime,
    //     status: 0,
    //   };

    //   this.GotopdfScreen(sendData);
    // },
    async GotopdfScreen() {
      const sendData = await this.postBooking();
      this.bookingDetailsStores.setNewValue(sendData);
      console.log(this.selectedDistrictTitle);
      this.districtStore.setNewValue(this.selectedDistrictTitle);
      this.$router.push("/booking/pdf");
    },
    async postBooking() {
      const apiRequestBody = {
        citizenId: this.userInfo.pid,
        rcode: `${
          this.selectedDistrict.length === 4 ? "" : this.selectedProvince
        }${this.selectedDistrict}`,
        dateBooking: +getFullDate(this.selectedDate),
        typeWork: this.selectedType,
        typeService: this.selectedService,
        timeBooking: this.bookTime,
      };
      console.log(apiRequestBody);
      const response = await api.postBooking(apiRequestBody);
      console.log("callback ", response);
      return response.data;
      /*
        response.data = {
          "citizenId": 1341600131552,
          "rcode": "1202",
          "dateBooking": 25670110,
          "typeWork": 1,
          "typeService": "0101",
          "timeBooking": 1,
          "status": 0,
          "bookingId": 2
        }
      */
    },
  },
  computed: {
    districtStore() {
      return getDistrictStore();
    },
    userInfoStore() {
      return getUserInfoStore();
    },
    bookingDetailsStores() {
      return getBookingDetailsStore();
    },
    userInfo() {
      return this.userInfoStore.userInfo;
    },
    dialogVisibleModel: {
      get() {
        return this.dialogVisible;
      },
      set(newValue) {
        this.$emit("toggleDialogVisible", newValue);
      },
    },
    bookTimeString() {
      if (this.bookTime === 1) {
        return "ช่วงเช้า (เวลา 09:00 น. ถึง 11:00 น.)";
      } else {
        return "ช่วงบ่าย (เวลา 13:00 น. ถึง 15:00 น.)";
      }
    },
  },
};
</script>
<style>
.titledialog {
  background-color: #d3d3d3;
  height: 60px;
}
</style>
