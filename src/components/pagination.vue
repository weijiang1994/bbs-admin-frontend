<template>
  <div class="block mt">
    <el-pagination
      background
      :hide-on-single-page="hideSingle"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="disable"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    // 每页条数改变
    handleSizeChange(size) {
      this.$emit('sizeChange', size)
    },
    // 当前页改变
    handleCurrentChange(page) {
      this.$emit('pageChange', page)
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      pageSizes: [20, 50, 100],
      hideSingle: false,
    };
  },
  // 获取父组件传递过来的total
  props:{
    total: Number,
    disable:{type: Boolean, default: false}
  }
};
</script>

<style>
  .mt{
    margin-top: 8px;
  }
</style>