<template>
  <div class="mx-10 my-4">
    <v-row class="pt-5" align="center" justify="center">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-row>
          <v-col cols="12" md="5" lg="5">
            <CustomDatePickerVue v-model="startEndDate" />
          </v-col>

          <v-col cols="12" md="5" lg="5">
            <v-select
              v-model="selectedStatus"
              label="สถานะการนัดหมาย"
              item-title="status"
              item-value="key"
              :items="status"
              variant="outlined"
              density="compact"
              base-color="primary"
              color="primary"
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="5" lg="5">
            <div>
              <v-autocomplete
                label="เลือกประเภทงาน"
                v-model="selectedWork"
                :loading="false"
                :items="typework"
                item-title="work"
                item-value="code"
                variant="outlined"
                density="compact"
                base-color="primary"
                color="primary"
                hide-details="auto"
              ></v-autocomplete>
            </div>
          </v-col>
          <v-col cols="12" md="5" lg="5">
            <div>
              <v-autocomplete
                :items="filterService"
                v-model="selectedService"
                item-title="service"
                item-value="code"
                label="เลือกงานบริการ"
                multiple
                chips
                variant="outlined"
                density="compact"
                hide-details="auto"
                @click="handleServiceInput"
              ></v-autocomplete>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div>
      <data-box
        :grid-cols="gridCols"
        justify="center"
        :box-font-size="boxFontSize"
        :count-rows="amountCount"
        class="mt-6"
      />
    </div>

    <v-card max-width="100%" class="mt-10" color="primary">
      <v-row class="pa-1" justify="space-between">
        <v-col>
          <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
        </v-col>
        <v-col class="d-flex justify-end align-center mr-1">
          <v-btn
            v-if="btnPdf"
            class="text-none ms-4"
            color="white"
            variant="flat"
            height="35"
            width="100"
            align="center"
            @click="handlePrint"
            >ส่งออก PDF</v-btn
          >
        </v-col>
      </v-row>

      <TableList :items="dataTable" :headers="headers"></TableList>
    </v-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import typework from "@/json/typework.json";
import statusData from "@/json/statusData.json";
import service from "@/json/service.json";
import TableList from "@/components/TableList.vue";
import dataBox from "@/components/officerBooking/dataBox.vue";
import CustomDatePickerVue from "@/components/officerBooking/CustomDatePicker.vue";

import api from "@/api/booking.js";
import { getFullDate } from "@/utilities/formatDate";
import officerprint from "@/utilities/officerprint";
import { getUserInfoStore } from "@/stores/getter_stores";

export default {
  components: {
    dataBox,
    CustomDatePickerVue,
    TableList,
  },
  data() {
    return {
      btnPdf: false,
      amountCount: { totalCount: 0, morningCount: 0, afternoonCount: 0 },
      service: service,
      selectedWork: 0,
      selectedService: [],
      typework: typework,
      status: statusData,
      dataTable: [],
      filterService: [],
      startEndDate: null,
      selectedStatus: 0,

      headers: [
        {
          title: "วันที่",
          key: "dateBooking",
          align: "center",
          sortable: false,
        },
        {
          title: "ช่วงเวลา",
          key: "timeBooking",
          align: "center",
          sortable: false,
        },

        {
          title: "เลขประจำตัวประชาชน ",
          key: "citizenId",
          align: "center",
          sortable: false,
        },
        {
          title: "ประเภทงาน",
          key: "typeWork",
          align: "start",
          sortable: false,
        },
        {
          title: "งานบริการ",
          key: "typeService",
          align: "start",
          sortable: false,
        },
        {
          title: "เลขนัดหมาย",
          key: "bookingId",
          align: "center",
          sortable: false,
        },
        {
          title: "สถานะ",
          key: "status",
          align: "center",
          sortable: false,
        },
      ],
      gridCols: [
        { cols: 12, sm: 4, lg: 2 },
        {
          cols: 6,
          sm: 4,
          lg: 2,
        },
        {
          cols: 6,
          sm: 4,
          lg: 2,
        },
      ],
      boxFontSize: {
        lg: "14px",
        md: "16px",
        sm: "16px",
        xs: "14px",
        default: "16px",
      },
    };
  },
  methods: {
    handleServiceInput() {
      if (!this.selectedWork) {
        Swal.fire({
          title: "เเจ้งเตือน",
          text: "กรุณาเลือกประเภทงาน",
          icon: "info",
          confirmButtonText: "ปิด",
        });
        this.selectedService.length = 0;
      }
    },
    handlePrint() {
      officerprint(this.dataTable, this.startEndDate);
    },
    getEmpDB(value, start, end) {
      return value.toString().substring(start, end);
    },
    async getReport() {
      try {
        this.dataTable.length = 0;
        let dateStart;
        let dateEnd;
        if (this.startEndDate[0]) {
          dateStart = getFullDate(this.startEndDate[0]);
          dateEnd = getFullDate(this.startEndDate[1]);
        } else {
          dateStart = getFullDate(this.startEndDate);
          dateEnd = getFullDate(this.startEndDate);
        }
        const typeService =
          this.selectedService.length > 0 ? this.selectedService : null;

        let resDatas = await api.getReport(
          dateStart,
          dateEnd,
          this.selectedWork,
          typeService,
          this.selectedStatus,
          this.userInfo.rcode
        );
        // this.amountCount.totalCount = resDatas.data.amount;
        // this.amountCount.morningCount = resDatas.data.timeBooking1;
        // this.amountCount.afternoonCount = resDatas.data.timeBooking2;
        // this.dataTable.push(...resDatas.data.bookingDetail);

        const bookingDetail = resDatas.data.bookingDetail;
        console.log("bookingDetail", bookingDetail);
        let resBookingDetail = [];
        const db = "10101000001100"; //this.userInfo.db
        let role1 = this.getEmpDB(db, 0, 1);
        let role2 = this.getEmpDB(db, 1, 2);
        let role3 = this.getEmpDB(db, 2, 3);
        let role4 = this.getEmpDB(db, 3, 4);
        let role5 = this.getEmpDB(db, 4, 5);
        let role6 = this.getEmpDB(db, 5, 6);
        let role7 = this.getEmpDB(db, 6, 7);
        let role8 = this.getEmpDB(db, 7, 8);
        let role12 = this.getEmpDB(db, 11, 12);

        console.log(
          role1,
          role2,
          role3,
          role4,
          role5,
          role6,
          role7,
          role8,
          role12
        );
        let morCount = 0;
        let aftCount = 0;

        bookingDetail.forEach((item) => {
          switch (Number(item.code)) {
            case 1: //โรงแรม
              if (Number(role3) === 1) {
                item.timeBooking === 1 ? (morCount += 1) : (aftCount += 1);
                resBookingDetail.push(item);
              }
              break;
            case 2: // สถานบริการ
              if (Number(role8) === 1) {
                item.timeBooking === 1 ? (morCount += 1) : (aftCount += 1);
                resBookingDetail.push(item);
              }

              break;
            case 3: //การพนัน
              if (Number(role2) === 1) {
                item.timeBooking === 1 ? (morCount += 1) : (aftCount += 1);
                resBookingDetail.push(item);
              }
              break;
            case 4: //ขายทอดตลาดเเละค้าของเก่า
              if (Number(role4) === 1) {
                item.timeBooking === 1 ? (morCount += 1) : (aftCount += 1);
                resBookingDetail.push(item);
              }

              break;
            case 5: //โรงรับจำนำ
              if (Number(role5) === 1) {
                item.timeBooking === 1 ? (morCount += 1) : (aftCount += 1);
                resBookingDetail.push(item);
              }
              break;
            case 6: //เรี่ยไร
              if (Number(role7) === 1) {
                item.timeBooking === 1 ? (morCount += 1) : (aftCount += 1);
                resBookingDetail.push(item);
              }
              break;
            case 7: //มูลนิธิเเละงานสมาคม
              if (Number(role6) === 1) {
                item.timeBooking === 1 ? (morCount += 1) : (aftCount += 1);
                resBookingDetail.push(item);
              }
              break;
            case 8: //อาวุธปืน
              if (Number(role1) === 1) {
                item.timeBooking === 1 ? (morCount += 1) : (aftCount += 1);
                resBookingDetail.push(item);
              }
              break;
            case 9: //โฆษณาโดยใช้เครื่องขยายเสียง
              if (Number(role12) === 1) {
                item.timeBooking === 1 ? (morCount += 1) : (aftCount += 1);
                resBookingDetail.push(item);
              }
              break;
            default:
              break;
          }
        });

        console.log("resBookingDetail", resBookingDetail);
        this.amountCount.totalCount = morCount + aftCount;
        this.amountCount.morningCount = morCount;
        this.amountCount.afternoonCount = aftCount;
        this.dataTable.push(resBookingDetail);
      } catch (error) {
        console.error(error);
      }
    },
  },

  computed: {
    userInfoStore() {
      return getUserInfoStore();
    },
    userInfo() {
      return this.userInfoStore.userInfo;
    },
  },
  watch: {
    selectedWork: function () {
      const typeCode = `${this.selectedWork > 9 ? "" : "0"}${
        this.selectedWork
      }`;
      if (this.selectedWork) {
        this.filterService = this.service.filter((value) => {
          return value.code.startsWith(typeCode);
        });
      }
      this.selectedService.length = 0;
      this.getReport();
    },
    startEndDate: function () {
      this.getReport();
    },
    selectedService: function () {
      this.getReport();
    },
    selectedStatus: function () {
      this.getReport();
    },
  },
};
</script>
