<template>
  <v-card min-height="100vh">
    <v-layout>
      <!-- App Bar Component -->
      <v-app-bar color="primary" :height="90">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title v-if="!$vuetify.display.mobile"
          >ระบบนัดหมายขอเข้ารับบริการ</v-app-bar-title
        >

        <template v-slot:append>
          <p class="mr-2" style="font-size: large">1102500034183</p>
          <v-icon class="mr-5">mdi-account</v-icon>
        </template>
      </v-app-bar>

      <!-- Drawer Component -->
      <v-navigation-drawer v-model="drawer" elevation="5">
        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, index) in showPath"
            :key="index"
            :value="item.name"
            color="#0D2F5F"
            @click="goToPath(item.path)"
          >
            <v-list-item-title style="font-size: 15px">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Component -->
      <v-main><slot></slot></v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  emits: ["toggle-drawer"],
  data() {
    return {
      drawer: false,
      path: {
        booking: [
          {
            title: "ระบบนัดหมายเข้ารับบริการ",
            name: "bookingScreen",
            path: "/",
          },
          {
            title: "รายการนัดหมายเข้ารับบริการของฉัน",
            name: "bookinglistScreen",
            path: "/list",
          },
        ],
        officer: [
          {
            title: "รายการนัดหมายเข้ารับบริการ",
            name: "bookingListOfficerScreen",
            path: "/officer",
          },
          {
            title: "สถิติรายการนัดหมายเข้ารับบริการ",
            name: "statScreen",
            path: "/officer/stat",
          },
        ],
      },
    };
  },
  computed: {
    showPath() {
      const path = this.$route.path.startsWith("/officer")
        ? this.path.officer
        : this.path.booking;
      return path;
    },
  },
  methods: {
    search() {
      return;
    },
    goBack() {
      history.back();
    },
    goToPath(path) {
      this.$router.push(path);
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
