<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawerComputed" elevation="5">
        <v-list density="compact" nav>
          <v-list-item
            @click="BookingScreen"
            value="home"
            active-color="#0D2F5F"
          >
            <v-list-item-title style="font-size: 15px"
              >ระบบนัดหมายเข้ารับบริการ</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            @click="BookingList"
            value="about"
            active-color="#0D2F5F"
          >
            <v-list-item-title style="font-size: 15px"
              >รายการนัดหมายเข้ารับบริการของฉัน</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <DefaultView />
    </v-layout>
  </v-card>
</template>

<script>
import BookingScreen from "@/views/bookingScreen.vue";
import DefaultView from "./View.vue";
import PrintpdfScreen from "@/views/printpdfScreen.vue";

export default {
  components: {
    DefaultView,
  },
  props: ["drawer"],
  emits: ["update-drawer"],
  computed: {
    drawerComputed: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("update-drawer");
      },
    },
  },
  methods: {
    BookingScreen() {
      this.$router.push("/");
    },
    BookingList() {
      this.$router.push("/list");
    },
  },
};
</script>

