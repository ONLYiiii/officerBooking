<template>
  <!-- <v-data-table :items="tableItems" :headers="tableHeaders">
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

    <slot></slot>
  </v-data-table> -->
  <v-data-table :items="tableItems" :headers="tableHeaders" >
    <template v-slot:item.typeWork="{ item }">
      <span>{{ converter("work", item.typeWork) }}</span>
    </template>

    <template v-slot:item.typeService="{ item }">
      <span>{{ converter("service", item.typeService) }}</span>
    </template>

    <template v-slot:item.timeBooking="{ item }">
      <span v-html="converter('time', item.timeBooking)"></span>
    </template>

    <template v-slot:item.dateBooking="{ item }">
      <span>{{ converter("date", item.dateBooking) }}</span>
    </template>

    <template v-slot:item.status="{ item }">
      <span>{{ converter("status", item.status) }}</span>
    </template>
  </v-data-table>
</template>

<script>
//* Utilities Import
import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
  convertStatus,
} from "@/utilities/convertCode.js";

export default {
  props: ["items", "headers"],
  data() {
    return {
      tableItems: this.items,
      tableHeaders: this.headers,
    };
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
        case "status":
          return convertStatus(data);
        default:
          return null;
      }
    },
  },
};
</script>
