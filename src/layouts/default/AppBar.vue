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
          <v-list-item class="text-right" v-if="isOfficer">
            <p style="font-size: medium">
              {{ userInfo ? userInfo.name : "" }}
            </p>
            <p style="font-size: smaller; color: lightgray">
              {{ userInfo ? userInfo.rcodeDescription.description : "" }}
            </p>
          </v-list-item>

          <v-list-item v-else>
            <p style="font-size: large">
              {{ userInfo ? userInfo.pid : "" }}
            </p>
          </v-list-item>

          <v-list-item class="pl-0">
            <v-icon>mdi-account</v-icon>
          </v-list-item>
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
        <template v-slot:append>
          <hr class="mb-4 mx-5" />
          <div class="px-5 pb-10">
            <v-btn
              block
              text
              rounded="xl"
              size="large"
              color="secondary"
              prepend-icon="mdi-arrow-left"
              @click="back()"
            >
              ย้อนกลับ
            </v-btn>
          </div>
        </template>
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
    isOfficer() {
      return this.$route.path.startsWith("/booking/officer");
    },
    showPath() {
      return this.isOfficer ? this.path.officer : this.path.booking;
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
    back() {
      this.$router.go(-1).catch(() => {});
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
  letter-spacing: 2px;
  font-size: 18px;
}
</style>
