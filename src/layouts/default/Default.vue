<template>
  <v-app>
    <default-bar @toggle-drawer="drawer = !drawer" />
    <!-- event เปลี่ยนค่า-->
    <default-drawer :drawer="drawer" @update-drawer="drawer = !drawer" />
    <!-- ส่ง prop กับ event ไป -->
  </v-app>
</template>

<script>
import DefaultBar from "./AppBar.vue";
import DefaultDrawer from "./Drawer.vue";

export default {
  components: {
    DefaultBar,
    DefaultDrawer,
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
