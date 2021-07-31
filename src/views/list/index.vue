<template>
  <div class="app-container">
    <div v-show="show.order">
      <div class="list-header">
        <h2>阿圆</h2>
        <h2>2021年7月31日</h2>
      </div>
      <div class="list-main">
        <div class="meal" v-for="(item, index) in orderList" :key="index">
          <span class="list-title">{{ item.title }}</span>
          <span class="list-label" :style="{ color: item.color }">
            {{ item.label }}
          </span>
        </div>
      </div>
      <div class="list-footer">
        <span class="list-title">总计</span>
        <span class="list-label">￥32</span>
      </div>
      <el-button type="primary" style="margin-left:60px">取消订单</el-button>
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
      orderList: [
        { title: "套餐", color: "#409EFF", label: "" },
        { title: "小食", color: "#67C23A", label: "" },
        { title: "备注", color: "#E6A23C", label: "" }
      ]
    };
  },
  computed: {
    ...mapGetters(["mealName", "snacksName", "remark"])
  },
  mounted() {
    this.orderList[0].label = this.mealName;
    this.orderList[1].label = this.snacksName;
    this.orderList[2].label = this.remark;
  },
  methods: {}
};
</script>
