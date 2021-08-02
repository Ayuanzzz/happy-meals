<template>
  <div class="app-container">
    <div v-show="show.order">
      <div class="list-header">
        <h2>{{ name }}</h2>
        <h2>{{ timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</h2>
      </div>
      <div class="list-main">
        <div class="meal">
          <span class="list-title">套餐</span>
          <span class="list-label" style="color: #409EFF">
            {{ mealName }}
          </span>
        </div>
        <div class="meal">
          <span class="list-title">小食</span>
          <span class="list-label" style="color: #67C23A">
            {{ snacksName }}
          </span>
        </div>
        <div class="meal">
          <span class="list-title">备注</span>
          <span class="list-label" style="color: #E6A23C">
            {{ remark }}
          </span>
        </div>
      </div>
      <div class="list-footer">
        <span class="list-title">总计</span>
        <span class="list-label">￥{{ totalPrice }}</span>
      </div>
      <el-button type="primary" style="margin-left:60px" @click="cancel"
        >取消订单</el-button
      >
    </div>
    <noOrder v-show="show.noOrder"></noOrder>
    <cancelOrder v-show="show.cancelOrder"></cancelOrder>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import noOrder from "./components/noOrder";
import cancelOrder from "./components/cancelOrder";
export default {
  components: { noOrder, cancelOrder },
  data() {
    return {
      show: { order: true, noOrder: false, cancelOrder: false },
      time: ""
    };
  },
  computed: {
    ...mapGetters([
      "mealName",
      "snacksName",
      "remark",
      "name",
      "totalPrice",
      "timestamp"
    ])
  },
  created() {
    if (!this.mealName) {
      this.show.noOrder = true;
      this.show.order = false;
    }
  },
  methods: {
    cancel() {
      this.show.order = false;
      this.show.cancelOrder = true;
      this.$store.commit("order/RESET_STATE");
    }
  }
};
</script>
