<template>
  <div class="app-container">
    <div class="table-page-header">
      <el-form
        ref="form"
        :model="form"
        :inline="true"
        label-position="top"
        @keydown.enter.native="handleSearch"
      >
        <list-item
          v-model="form.market"
          type="select"
          prop="market"
          :label="Market"
        >
          <template v-slot:select>
            <el-option
              v-for="item in marketEnum"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </template>
        </list-item>
        <list-item
          v-model="form.accountId"
          prop="accountId"
          :label="Account"
        ></list-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem";
export default {
  components: {
    ListItem
  },
  data() {
    return {
      form: {
        market: "",
        exchange: "",
        symbol: "",
        eventType: "",
        timestamp: ""
      },
      marketEnum: ["wawa", "hhu"]
    };
  }
};
</script>

<style></style>
