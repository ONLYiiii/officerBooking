<template>
  <div>
    <v-toolbar color="#14305E"> </v-toolbar>
    <v-toolbar color="#154C8B" height="100" flat>
      <template v-slot:title>
        <v-btn @click="GotoBookingScreen">
          <p class="titletoolbar">ระบบนัดหมายขอเข้ารับบริการ</p>
        </v-btn>
      </template>

      <template v-slot:prepend>
        <v-btn icon="mdi-menu" @click="$emit('toggle-drawer')"></v-btn>
      </template>

      <p class="setfont" style="margin-right: 10px">1102500034183</p>
      <v-icon style="margin-right: 200px">mdi-account</v-icon>
    </v-toolbar>
  </div>
</template>

<script>
import bookingScreenVue from "@/views/bookingScreen.vue";
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
  font-family: "Kanit";
  font-size: 25px;
}
.setfont {
  font-family: "Kanit";
  letter-spacing: 2px;
  font-size: 18px;
}
</style>
