<template>
  <v-dialog v-model="dialogVisibleModel" content-class="align-center">
    <v-card
      min-height="10vh"
      :min-width="screenOrientation === 'landscape' ? '30vw' : '90vw'"
    >
      <v-card-title class="titledialog d-flex align-center"
        >ยืนยันการจอง</v-card-title
      >

      <v-card-text
        >ยืนยันการจองนัดหมายขอเข้ารับบริการ วันที่ {{ getFormattedDate }}
      </v-card-text>
      <v-card-text>เข้ารับบริการ : {{ selectedTypeTitle }}</v-card-text>
      <v-card-text>งานบริการ : {{ selectedServiceTitle }}</v-card-text>
      <v-card-text
        >จังหวัด {{ selectedProvinceTitle }} อำเภอ/เขต
        {{ selectedDistrictTitle }}</v-card-text
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
        <v-btn color="#1081E9" variant="flat" @click="confirmAndGoToPdfScreen">
          ยืนยัน
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
//* Utilities Import
import { getFullDate } from "@/utilities/formatDate";

//* Package Import
import { mapActions } from "pinia";

//* Stores Import
import { useBookingDetailsStore } from "@/stores/booking_details";
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
    selectProvince: String,
    selectedDistrict: String,
    selectedType: Number,
    selectedService: Number,
    getFormattedDate: String,
    selectedServiceTitle: String,
  },
  emits: ["toggleDialogVisible"],
  inject: ["citizenIdProvide"],
  data() {
    return {
      citizenId: this.citizenIdProvide,
      bookingId: null,
    };
  },
  methods: {
    ...mapActions(useBookingDetailsStore, ["setNewValue"]),
    // async confirmAndGoToPdfScreen() {
    //   const sendData = {
    //     citizen_id: "1102500034183",
    //     booking_id: 0,
    //     rcode: this.selectProvince + this.selectedDistrict,
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
      this.setNewValue(sendData);
      this.$router.push("/pdf");
    },
    async postBooking() {
      const apiRequestBody = {
        citizenId: this.citizenId,
        rcode: this.selectedDistrict,
        dateBooking: getFullDate(this.selectedDate),
        typeWork: this.selectedType,
        typeService: this.selectedService,
        timeBooking: this.bookTime,
      };
      const response = await api.postBooking(apiRequestBody);
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
