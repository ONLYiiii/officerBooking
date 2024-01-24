<template>
  <v-container>
    <v-card style="border-width: 2px; align: center" max-width="100%">
      <div style="background-color: #dadada; height: 50px; display: flex">
        <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
      </div>
      <v-data-table :items="items" :headers="headers">
        <template v-slot:item.typeWork="{ item }">
          <span>{{ converter("work", item.typeWork) }}</span>
        </template>

        <template v-slot:item.typeService="{ item }">
          <span>{{ converter("service", item.typeService) }}</span>
        </template>

        <template v-slot:item.timeBooking="{ item }">
          <span>{{ converter("time", item.timeBooking) }}</span>
        </template>

        <template v-slot:item.dateBooking="{ item }">
          <span>{{ converter("date", item.dateBooking) }}</span>
        </template>

        <template v-slot:item.rcodeDesc="{ item }">
        <span>{{  item.rcodeDesc }}</span>
      </template>

        <template v-slot:item.cancel="{ item }">
          <v-btn
            class="text-none ms-4 text-white"
            color="red"
            variant="flat"
            @click="cancelBooking(item)"
            >ยกเลิก</v-btn
          >
        </template>
      </v-data-table>
      <!-- <TableListVue :items="items" :headers="headers">
        {{ items }}
        <template v-slot:item.rcode="{ item }">
          <span>
            {{ findDistrict(item) }}
          </span>
        </template>

        <template v-slot:item.cancel="{ item }">
          <v-btn
            class="text-none ms-4 text-white"
            color="red"
            variant="flat"
            @click="putBookingStatus(item)"
            >ยกเลิก</v-btn
          >
        </template>
      </TableListVue> -->
    </v-card>
  </v-container>
</template>
<script>
import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
} from "@/utilities/convertCode.js";

import {sleep} from "@/utilities/utils.js"

import Swal from "sweetalert2";

// Components Import
import TableListVue from "@/components/TableList.vue";

// API Import
import api from "@/api/booking.js";

// Store Import
import { getUserInfoStore } from "@/stores/getter_stores";

// Json Import
import provinceJson from "@/json/province.json";

export default {
  components: {
    // TableListVue,
  },
  data() {
    return {
      headers: [
        { title: "เลขนัดหมาย", key: "bookingId" },
        { title: "ประเภทงาน", key: "typeWork" },
        { title: "งานบริการ", key: "typeService" },
        { title: "ช่วงเวลา", key: "timeBooking" },
        { title: "วันที่", key: "dateBooking" },
        { title: "สถานที่นัดหมาย", key: "rcodeDesc" },
        { title: "ยกเลิกนัดหมาย", key: "cancel", sortable: false },
      ],
      items: [],
    };
  },
  computed: {
    userInfoStore() {
      return getUserInfoStore();
    },
  },
  async mounted() {
    await this.getCitizenId();
  },
  methods: {
    converter(mode, data) {
      switch (mode) {
        case "work":
          return convertWorkCode(data);
        case "service":
          return convertServiceCode(data);
        case "time":
          return convertTimeBooking(data);
        case "date":
          return convertDate(data + "");
        default:
          return null;
      }
    },
    async cancelBooking() {
      Swal.fire({
        title: "เเจ้งเตือน",
        text: "ระบบยกเลิกรายการจองเรียบร้อยเเล้ว",
        icon: "success",
        confirmButtonText: "ปิด",
      });
      await this.getCitizenId();
    },
    async getCitizenId() {
      this.items.length = 0;
      try {
        const response = await api.getCitizenId(
          this.userInfoStore.userInfo.pid
        );
       
        const promises = response.data.map(async (item, index) => {
          item.rcodeDesc = await this.findDistrict(item.rcode);
          return item;
        });

        await Promise.all(promises);
        this.items.push(...promises);
        
        // return response.data; 

        // console.log('Items: ',this.items)
        // console.log("response:: ", this.items);
      } catch (error) {
        console.error("getCitizenId Error:", error);
      }
    },
    async putBookingStatus(item) {
      const apiRequest = {
        status: 0,
      };
      const response = await api.putBookingStatus(
        item.bookingId,
        item.citizenId,
        apiRequest
      );
      const statusCode = response.status;
      if (statusCode === 200) {
        await this.cancelBooking();
      }
    },
    async getDistrict(cc) {
      try {
        let resDatas = await api.getDistrict(cc);
        const datas = [];
        if (+cc === 10) {
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
        }
        datas.push(...resDatas.data);
        return datas;
      } catch (error) {
        console.error("getDistrict Error:", error);
      }
    },
    async findDistrict(rcode) {
      let returnValue = "";
      const ccCode = rcode.substring(0, 2);
      const districtCode = rcode.substring(2);

      if (ccCode !== "00") {
        let district = await api.getDistrict(ccCode);
        
        let aa = district.data.find(
          (item) => item.code === districtCode
        ).description;
        let cc = provinceJson.find((item) => item.ccCode === ccCode).ccDesc;
        returnValue = `${cc} ${aa}`

      } else {
        if (rcode === "0083") {
          returnValue = "กรุงเทพมหานคร ศูนย์บริการประชาชน";
        } else {
          returnValue = "กรุงเทพมหานคร กองทะเบียน";
        }
      }

      return returnValue;
    },

    // setDistrict(districtList, ){

    // }
  },
};
</script>
<style></style>
