<template>
  <v-container>
    <v-card style="border-width: 2px; align: center" max-width="100%">
      <div style="background-color: #dadada; height: 50px; display: flex">
        <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
      </div>
      <v-data-table :items="items" :headers="headers">
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
    </v-card>
  </v-container>
</template>
<script>
import { mapStores } from "pinia";
import { useBookingDetailsStore } from "@/stores/booking_details";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      headers: [
        { title: "รหัสการจอง", value: "bookingId" },
        { title: "ประเภทการจอง", value: "type" },
        { title: "บริการที่เข้ารับ", value: "service" },
        { title: "ช่วงเวลา", value: "time" },
        { title: "วันที่จอง", value: "date" },
        { title: "ยกเลิกนัดหมาย", key: "cancel", sortable: false },
      ],
      items: [
        {
          bookingId: "000555500054",
          type: "โรงเเรม",
          service: "ขอใบอนุญาติประกอบธุกิจโรงเเรม",
          time: "บ่าย",
          date: "13 ธันวาคม 2566",
        },
        {
          bookingId: "000000000054",
          type: "โรงเเรม",
          service: "ขอใบอนุญาติประกอบธุกิจโรงเเรม",
          time: "บ่าย",
          date: "13 ธันวาคม 2566",
        },
      ],
    };
  },
  computed: {
    ...mapStores(useBookingDetailsStore),
  },
  methods: {
    cancelBooking(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      Swal.fire({
        title: "เเจ้งเตือน",
        text: "ระบบยกเลิกรายการจองเรียบร้อยเเล้ว",
        icon: "success",
        confirmButtonText: "ปิด",
      });
    },
  },
};
</script>
<style></style>
