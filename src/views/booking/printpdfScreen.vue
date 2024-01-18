<template>
  <v-container fluid class="text-center">
    <v-row>
      <v-col style="line-height: 80px">
        <div :style="{ fontSize: computedFontSize }">
          <h2>หมายเลขนัดหมายขอเข้ารับบริการของคุณคือ :</h2>
          <h1
            :style="{
              color: '#1081e9',
              letterSpacing: '4px',
              fontSize: bookingIdFontSize,
            }"
          >
            {{ bookingDetails.booking_id }}
          </h1>
          <h2>ประเภทงาน : {{ typeworkName }}</h2>
          <h2>งานบริการ : {{ serviceName }}</h2>
          <h2>จังหวัด{{ provinceName }} อำเภอ/เขต{{ districtName }}</h2>
          <h2>
            {{
              bookingDetails.time_booking === 1
                ? "ช่วงเช้า (เวลา 09.00 - 11.00)"
                : "ช่วงบ่าย (เวลา 13.00 - 15.00)"
            }}
          </h2>
        </div>
        <v-row justify="center" class="mt-5" align="center">
          <v-col cols="10" sm="10" lg="3" md="5">
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
                  @click="sendEmail"
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
            lineHeight: '40px',
            fontSize: computedFontSizebelow,
            fontWeight: 'bold',
          }"
        >
          *กรุณาแจ้ง หมายเลขนัดหมายล่วงหน้า หรือ<br />
          เลขประจำตัวประชาชนต่อเจ้าหน้าที่เมื่อเข้ารับบริการตามวันเวลาที่จอง<br />
          เเละมาตามวันที่เเละเวลาที่นัดหมาย
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import print from "@/utilities/print";
import provinceJson from "@/json/province.json";
import district11Json from "@/json/district-11.json";
import district12Json from "@/json/district-12.json";
import district13Json from "@/json/district-13.json";
import typework from "@/json/typework.json";
import service from "@/json/service.json";
import { useBookingDetailsStore } from "@/stores/booking_details";
import { mapState, mapActions } from "pinia";
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
      district11: district11Json,
      district12: district12Json,
      district13: district13Json,
      typework: typework,
      service: service,
    };
  },
  methods: {
    ...mapActions(useBookingDetailsStore, ["printData"]),
    toggleTextField() {
      this.showTextField = true;
    },
    handleprint() {
      print(
        this.bookingDetails,
        this.provinceName,
        this.districtName,
        this.typeworkName,
        this.serviceName,
        true
      );
    },
    sendEmail() {
      print(
        this.bookingDetails,
        this.provinceName,
        this.districtName,
        this.typeworkName,
        this.serviceName,
        false
      );
      Swal.fire({
        title: "เเจ้งเตือน!",
        text: `ส่งสรุปข้อมูลการนัดหมายไปที่อีเมลล์ ${this.emailSummary} สำเร็จ`,
        icon: "success",
        confirmButtonText: "close",
      });
    },
  },
  computed: {
    ...mapState(useBookingDetailsStore, ["bookingDetails"]),
    provinceName() {
      const rcode_province = this.bookingDetails.rcode.substring(0, 2);
      if (rcode_province) {
        const index = this.province.findIndex(
          (value) => value.ccCode === rcode_province
        );
        return this.province[index].ccDesc;
      }
      return null;
    },
    districtName() {
      const updateDistrict = [];

      switch (this.bookingDetails.rcode.substring(0, 2)) {
        case "11":
          updateDistrict.push(...this.district11);
          break;
        case "12":
          updateDistrict.push(...this.district12);
          break;
        case "13":
          updateDistrict.push(...this.district13);
          break;
        default:
          break;
      }

      const rcode_district = this.bookingDetails.rcode.substring(2);

      if (rcode_district && updateDistrict.length !== 0) {
        const index = updateDistrict.findIndex(
          (value) => value.aaCode === rcode_district
        );
        return updateDistrict[index].aaDesc;
      }

      return null;
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
        ? "13px"
        : this.$vuetify.display.smAndDown
        ? "14px"
        : this.$vuetify.display.mdAndDown
        ? "15px"
        : "15px";
    },
    computedFontSizebelow() {
      return this.$vuetify.display.xs
        ? "14px"
        : this.$vuetify.display.smAndDown
        ? "15px"
        : this.$vuetify.display.mdAndDown
        ? "16px"
        : "18px";
    },
    bookingIdFontSize() {
      return this.$vuetify.display.smAndDown
        ? "30px"
        : this.$vuetify.display.mdAndDown
        ? "35px"
        : "40px";
    },
  },
  mounted() {
    this.printData();
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Kanit");
</style>
