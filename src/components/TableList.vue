<template>
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

    <slot></slot>
  </v-data-table>
</template>

<script>
//* Utilities Import
import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
} from "@/utilities/convertCode.js";

export default {
  props: ["items", "headers"],
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
          return convertDate(data);
        default:
          return null;
      }
    },
  },
};
</script>
