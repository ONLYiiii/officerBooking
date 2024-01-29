<template>
  <v-row align="center" :justify="justify" v-if="!$vuetify.display.mobile">
    <v-col
      v-for="(item, i) in titleAmount"
      :key="i"
      :cols="item.cols"
      :sm="item.sm"
      :lg="item.lg"
    >
      <div class="w-100 h-100 d-flex justify-center">
        <v-card
          max-width="180"
          min-height="130"
          min-width="10vw"
          max-height="130"
          variant="outlined"
          class="boxStyles"
        >
          <v-card-item style="padding: 10px">
            <p
              class="text-center pa-2"
              :style="{ 'font-size': textSize.fontSize }"
            >
              <span v-html="item.title"></span>
            </p>
            <h1
              class="text-center"
              :style="{
                'font-size': textSize.amountFontSize,
                color: item.color,
              }"
            >
              {{ item.amount ?? 0 }}
            </h1>
          </v-card-item>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["gridCols", "justify", "boxFontSize", "countRows"],
  data() {
    return {
      // titleAmount: [
      //   {
      //     title: "<p>จำนวนคนนัดหมาย<br>ทั้งหมด</p>",
      //     amount: 100,
      //     cols: this.gridCols[0].cols,
      //     sm: this.gridCols[0].sm,
      //     lg: this.gridCols[0].lg,
      //   },
      //   {
      //     title: "<p>จำนวนคนนัดหมาย<br>มารับบริการช่วงเช้า</p>",
      //     amount: 100,
      //     cols: this.gridCols[1].cols,
      //     sm: this.gridCols[1].sm,
      //     lg: this.gridCols[1].lg,
      //   },
      //   {
      //     title: "<p>จำนวนคนนัดหมาย<br>มารับบริการช่วงบ่าย</p>",
      //     amount: 100,
      //     cols: this.gridCols[2].cols,
      //     sm: this.gridCols[2].sm,
      //     lg: this.gridCols[2].lg,
      //   },
      // ],
    };
  },
  computed: {
    textSize() {
      let fontSize = "";
      let amountFontSize = "";
      const displaySize = this.$vuetify.display.name;
      switch (displaySize) {
        case "lg":
          fontSize = this.boxFontSize.lg;
          amountFontSize = "36px";
          break;
        case "md":
          fontSize = this.boxFontSize.md;
          amountFontSize = "26px";
          break;
        case "sm":
          fontSize = this.boxFontSize.sm;
          amountFontSize = "26px";
          break;
        case "xs":
          fontSize = this.boxFontSize.xs;
          amountFontSize = "26px";
          break;
        default:
          fontSize = this.boxFontSize.default;
          amountFontSize = "35px";
      }
      return { fontSize, amountFontSize };
    },
    titleAmount() {
      return [
        {
          title: "<h3>คิวทั้งหมด<h3/>",
          amount: this.countRows.totalCount,
          cols: this.gridCols[0].cols,
          sm: this.gridCols[0].sm,
          lg: this.gridCols[0].lg,
          color: "#00A725",
        },
        {
          title: "<h3>ช่วงเช้า</h3>",
          amount: this.countRows.morningCount,
          cols: this.gridCols[1].cols,
          sm: this.gridCols[1].sm,
          lg: this.gridCols[1].lg,
          color: "#1081E9",
        },
        {
          title: "<h3>ช่วงบ่าย</h3>",
          amount: this.countRows.afternoonCount,
          cols: this.gridCols[2].cols,
          sm: this.gridCols[2].sm,
          lg: this.gridCols[2].lg,
          color: "#F77329",
        },
      ];
    },
  },
};
</script>

<style scoped>
.boxStyles {
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: #154c8b;
  /* box-shadow: 0 2px 6px 0 #1081e9; */
}
</style>
