<template>
  <div>
    <v-toolbar color="#14305E"> </v-toolbar>
    <v-toolbar color="#154C8B" height="100" flat>
      <v-row class="d-flex align-center ml-2">
        <v-btn icon="mdi-menu" @click="$emit('toggle-drawer')"></v-btn>
        <v-toolbar-title
          v-if="$vuetify.display.smAndUp"
          @click="GotoBookingScreen"
          variant="text"
          class="titletoolbar"
        >
          ระบบนัดหมายขอเข้ารับบริการ
        </v-toolbar-title>
      </v-row>
      <div class="d-flex align-end mr-10">
        <p class="setfont">1102500034183</p>
        <v-icon v-if="$vuetify.display.smAndUp">mdi-account</v-icon>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  emits: ["toggle-drawer"],
  methods: {
    search() {
      return;
    },
    goBack() {
      history.back();
    },
    GotoBookingScreen() {
      this.$router.push({
        name: "bookingScreen",
      });
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Kanit");
.titletoolbar {
  font-size: 20px !important;
}
.setfont {
  font-family: "Kanit";
  letter-spacing: 2px;
  font-size: 18px;
}
</style>
