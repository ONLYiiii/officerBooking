<template>
  <default-bar>
    <default-view />
  </default-bar>
</template>

<script>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";

export default {
  components: {
    DefaultBar,
    DefaultView,
  },
  data: () => ({}),
  // async created() {
  //   this.fetchUserInfo();
  // },

  computed: {},

  methods: {
    // async getUserInfo() {
    //   try {
    //     this.userInfo = await api.getUserInfo();
    //     console.log( this.userInfo.data);
    //   } catch (error) {
    //     console.error("Error fetching user info:", error);
    //   }
    // },
  },
};
</script>
