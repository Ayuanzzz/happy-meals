<template>
  <el-form-item :prop="prop" :label="label" :class="{ 'has-value': !!value }">
    <el-input
      v-if="type === 'text'"
      :value="value"
      @input="$emit('input', $event)"
    ></el-input>
    <el-select
      v-if="type === 'select'"
      placeholder=""
      clearable
      :value="value"
      class="w-full"
      @input="$emit('input', $event)"
    >
      <el-option
        v-for="item in data"
        :key="item"
        :label="$t(item)"
        :value="item"
      ></el-option>
      <slot name="select"></slot>
    </el-select>
    <el-date-picker
      v-if="type === 'datetime'"
      class="date-picker"
      type="datetime"
      value-format="timestamp"
      prefix-icon="icon"
      :value="value"
      @input="$emit('input', $event)"
    ></el-date-picker>
    <el-date-picker
      v-if="type === 'date'"
      class="date-picker"
      type="date"
      value-format="yyyy/MM/dd"
      prefix-icon="icon"
      clearable
      :value="value"
      @input="$emit('input', $event)"
    ></el-date-picker>
    <el-date-picker
      v-if="type === 'daterange'"
      type="daterange"
      class="date-picker"
      style="width: 332px"
      value-format="timestamp"
      range-separator="-"
      :value="value"
      @input="$emit('input', $event)"
    ></el-date-picker>
  </el-form-item>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    type: {
      type: String,
      default: "text"
    },
    prop: String,
    label: String,
    value: [String, Number],
    data: Array,
    input: Function
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  position: relative;
  margin: 0 24px 30px 0;

  &:focus-within,
  &.has-value {
    ::v-deep .el-form-item__label {
      top: -9px;
      font-size: 12px;
      @apply text-blue-500;
    }
  }

  ::v-deep .el-form-item__label {
    position: absolute;
    top: 8px;
    left: 10px;
    z-index: 1;
    padding: 0 4px;
    background: #fff;
    line-height: 20px;
    font-weight: 500;
    transition: all 300ms;
    pointer-events: none;
    @apply text-gray-300;
  }

  ::v-deep .date-picker {
    .el-input__inner {
      padding-left: 15px;
    }

    .el-input__prefix {
      display: none;
    }
  }
}
</style>
