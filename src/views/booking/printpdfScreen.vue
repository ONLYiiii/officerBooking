<template>
  <v-container fluid class="text-center">
    <v-row>
      <v-col style="line-height: 55px">
        <div :style="{ fontSize: computedFontSize }">
          <h2>เลขนัดหมายขอเข้ารับบริการของคุณ</h2>
          <h1
            :style="{
              color: '#1081e9',
              letterSpacing: '4px',
              fontSize: bookingIdFontSize,
            }"
          >
            {{ bookingDetails.booking_id }}
          </h1>
          <h2>วันที่ {{ getFormattedDate }}</h2>
          <h2>ประเภทงาน : {{ typeworkName }}</h2>
          <h2>งานบริการ : {{ serviceName }}</h2>
          <h2>ณ {{ placeText }}</h2>
          <h2>
            {{
              bookingDetails.time_booking === 1
                ? "ช่วงเช้า (เวลา 09.00 - 11.00)"
                : "ช่วงบ่าย (เวลา 13.00 - 15.00)"
            }}
          </h2>
        </div>
        <v-row justify="center" class="mt-3" align="center">
          <v-col cols="10" sm="10" lg="2" md="5">
            <v-btn
              size="x-large"
              elevation="1"
              variant="outlined"
              color="#154C8B"
              style="border-width: 3px"
              rounded="lg"
              width="100%"
              @click="handleprint"
              >พิมพ์</v-btn
            >
          </v-col>
          <v-col cols="10" sm="10" lg="3" md="5">
            <v-btn
              v-if="!showTextField"
              size="x-large"
              elevation="1"
              variant="flat"
              color="#154C8B"
              rounded="lg"
              width="100%"
              @click="toggleTextField"
              >ส่งสรุปนัดหมายไปที่อีเมลล์</v-btn
            >
            <v-text-field
              v-else
              variant="outlined"
              label="กรอกอีเมลล์ของคุณ"
              v-model="emailSummary"
              width="100%"
              color="#154c8b"
              :rules="[validateEmail]"
              :hide-details="true"
            >
              <template v-slot:append-inner>
                <v-btn
                  color="#154C8B"
                  variant="flat"
                  rounded="lg"
                  @click="sendMail"
                >
                  <v-icon color="white" size="30">mdi-arrow-right-bold</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-card-text
          :style="{
            color: 'red',
            lineHeight: '30px',
            fontSize: computedFontSizebelow,
            fontWeight: 'bold',
          }"
        >
          *กรุณาแจ้ง เลขนัดหมายขอเข้ารับบริการ หรือ เลขประจำตัวประชาชน<br />ต่อเจ้าหน้าเมื่อเข้ารับบริการตามวันเเละเวลาที่นัดหมาย
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
//* Utilities Import
import print from "@/utilities/print";
import { formatDateString } from "@/utilities/formatDate";
import sendEmail from "@/utilities/sendMail";

//* JSON Import
import provinceJson from "@/json/province.json";
import typework from "@/json/typework.json";
import service from "@/json/service.json";

//* Stores Import
import {
  getBookingDetailsStore,
  getUserInfoStore,
  getDistrictStore,
} from "@/stores/getter_stores";

//* API Import
import api from "@/api/booking.js";

//* Package Import
import Swal from "sweetalert2";

export default {
  data() {
    return {
      showTextField: false,
      emailSummary: "",
      validateEmail: (value) => {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return valid || "กรุณากรอกที่อยู่อีเมลล์ที่ถูกต้อง";
      },
      province: provinceJson,
      updateDistrict: [],

      typework: typework,
      service: service,
      citizenName: this.citizenNameProvide,
    };
  },
  methods: {
    toggleTextField() {
      this.showTextField = true;
    },
    handleprint() {
      print(
        this.bookingDetails,
        this.typeworkName,
        this.serviceName,
        this.placeText,
        null
      );
    },
    async getDistrict(cc) {
      try {
        let resDatas = await api.getDistrict(cc);
        let datas = resDatas.data;
        datas.push({
          code: "0083",
          description: "ศูนย์บริการประชาชน",
          descriptionEnglish: "",
        });
        datas.push({
          code: "0084",
          description: "กองทะเบียน",
          descriptionEnglish: "",
        });
        datas.push(datas);
        return datas;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSendMail(data) {
      const sendData = {
        email: this.emailSummary,
        name: this.userInfoStore.userInfo.name,
        bookingId: this.bookingDetails.booking_id,
        work: this.typeworkName,
        service: this.serviceName,
        province: this.provinceName,
        district: this.districtName,
        dateBooking: this.getFormattedDate,
        fileBase64: data,
      };
      const response = await sendEmail(sendData);
      
      if (response.status === 201) {
        Swal.fire({
          title: "ผลดำเนินการ",
          text: `จัดส่งข้อมูลนัดหมายไปที่อีเมล์ ${this.emailSummary} เรียบร้อยเเล้ว`,
          icon: "success",
          confirmButtonText: "ปิด",
        });
      } else {
        Swal.fire({
          title: "ผลดำเนินการ",
          text: "ไม่สามารถจัดส่งข้อมูลนัดหมายไปยังอีเมลล์ของท่านได้",
          icon: "error",
          confirmButtonText: "ปิด",
        });
      }
    },
    sendMail() {
      print(
        this.bookingDetails,
        this.districtName,
        this.typeworkName,
        this.serviceName,
        this.fetchSendMail
      );
    },
  },
  computed: {
    districtStore() {
      return getDistrictStore();
    },
    bookingDetailsStores() {
      return getBookingDetailsStore();
    },
    userInfoStore() {
      return getUserInfoStore();
    },
    bookingDetails() {
      return this.bookingDetailsStores.bookingDetails;
    },
    provinceName() {
      let rcode_province = this.bookingDetails.rcode.substring(0, 2);
      if (rcode_province) {
        if (rcode_province === "00") {
          rcode_province = "10";
        }
        const index = this.province.findIndex(
          (value) => value.ccCode === rcode_province
        );

        return this.province[index].ccDesc;
      }
      return null;
    },
    districtName() {
      return this.districtStore.district;
    },
    typeworkName() {
      if (this.bookingDetails.type_work) {
        const index = this.typework.findIndex(
          (value) => value.code === this.bookingDetails.type_work
        );
        return this.typework[index].work;
      }
      return null;
    },
    serviceName() {
      if (this.bookingDetails.type_service) {
        const index = this.service.findIndex(
          (value) => value.code === this.bookingDetails.type_service
        );
        return this.service[index].service;
      }
      return null;
    },
    computedFontSize() {
      return this.$vuetify.display.xs
        ? "12px"
        : this.$vuetify.display.smAndDown
        ? "13px"
        : this.$vuetify.display.mdAndDown
        ? "14px"
        : "13px";
    },
    computedFontSizebelow() {
      return this.$vuetify.display.xs
        ? "14px"
        : this.$vuetify.display.smAndDown
        ? "15px"
        : this.$vuetify.display.mdAndDown
        ? "16px"
        : "14px";
    },
    bookingIdFontSize() {
      return this.$vuetify.display.smAndDown
        ? "30px"
        : this.$vuetify.display.mdAndDown
        ? "35px"
        : "40px";
    },
    getFormattedDate() {
      return formatDateString(this.bookingDetails.date_booking);
    },
    placeText() {
      const ccCode = this.bookingDetails.rcode.substring(0, 2);
      let districtText = "อำเภอ";
      let provinceText = "";
      if (ccCode === "10" || ccCode === "00") {
        districtText = "";
        provinceText = this.provinceName;
      } else {
        provinceText = `จังหวัด${this.provinceName}`;
      }
      return `${districtText}${this.districtName} ${provinceText}`;
    },
  },
  async mounted() {},
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Kanit");
</style>
