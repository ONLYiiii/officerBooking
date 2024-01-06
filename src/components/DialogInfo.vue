<template>
  <v-card>
    <v-card-title class="titledialog">ยืนยันการจอง</v-card-title>
    <v-card-text
      >ยืนยันการจองนัดหมายขอเข้ารับบริการ วันที่ {{ getFormattedDate }}
    </v-card-text>
    <v-card-text
      >เข้ารับบริการ{{ selectedTypeTitle }} :
      {{ selectedServiceTitle }}</v-card-text
    >
    <v-card-text
      >ที่จังหวัด{{ selectedProvinceTitle }} อำเภอ/เขต{{
        selectedDistrictTitle
      }}</v-card-text
    >
    <v-card-text>{{ bookTimeString }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red" variant="text" @click="$emit('close-dialog')">
        ยกเลิก
      </v-btn>
      <v-btn color="#1081E9" variant="flat" @click="confirmAndGoToPdfScreen">
        ยืนยัน
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { getFullDate } from "../utilities/addDate";
import { mapActions } from "pinia";
import { useBookingDetailsStore } from "@/stores/booking_details";
export default {
  props: {
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
  emits: ["close-dialog"],
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapActions(useBookingDetailsStore, ["setNewValue"]),
    async confirmAndGoToPdfScreen() {
      const sendData = {
        citizen_id: "1102500034183",
        booking_id: Math.floor(Math.random() * 90000 + 10000).toString(),
        rcode: this.selectProvince + this.selectedDistrict,
        date_booking: getFullDate(this.selectedDate),
        type_work: this.selectedType,
        type_service: this.selectedService,
        time_booking: this.bookTime,
        status: 0,
      };

      this.GotopdfScreen(sendData);
    },
    GotopdfScreen(sendData) {
      this.setNewValue(sendData);
      this.$router.push({
        name: "printpdfScreen",
      });
    },
  },
  computed: {
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
