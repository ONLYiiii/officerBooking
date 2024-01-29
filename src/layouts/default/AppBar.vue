<template>
  <v-card min-height="100vh">
    <v-layout>
      <!-- App Bar Component -->
      <v-app-bar color="primary">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title v-if="!$vuetify.display.mobile"
          >ระบบนัดหมายขอเข้ารับบริการ</v-app-bar-title
        >

        <template v-slot:append>
          <v-row>
            <v-col cols="5">
              <p style="font-size: large">
              {{ userInfo ? userInfo.name : "" }}
            </p>
            </v-col>
            <v-col cols="1">
              <v-icon class="mr-5">mdi-account</v-icon>
            </v-col>
            <v-col>
              {{ userInfo ? userInfo.rcodeDescription.description : "" }}
            </v-col>
          </v-row>
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
import { getUserInfoStore } from "@/stores/getter_stores";

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
            path: "/booking",
          },
          {
            title: "รายการนัดหมายเข้ารับบริการของฉัน",
            name: "bookinglistScreen",
            path: "/booking/list",
          },
        ],
        officer: [
          {
            title: "รายการนัดหมายเข้ารับบริการ",
            name: "bookingListOfficerScreen",
            path: "/booking/officer",
          },
          {
            title: "สถิติรายการนัดหมายเข้ารับบริการ",
            name: "statScreen",
            path: "/booking/officer/stat",
          },
        ],
      },
    };
  },
  // provide() {
  //   return {
  //     citizenIdProvide: this.userInfo.pid,
  //     citizenNameProvide: this.userInfo.name,
  //   };
  // },
  computed: {
    showPath() {
      const path = this.$route.path.startsWith("/booking/officer")
        ? this.path.officer
        : this.path.booking;
      return path;
    },
    userInfoStore() {
      return getUserInfoStore();
    },
    userInfo() {
      return this.userInfoStore.userInfo;
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
