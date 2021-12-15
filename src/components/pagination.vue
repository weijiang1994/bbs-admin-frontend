<template>
  <div class="block">
    <el-pagination
      background
      :hide-on-single-page="value"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    // 每页条数改变
    handleSizeChange(val) {
    },
    // 当前页改变
    handleCurrentChange(val) {
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      pageSizes: [20, 50, 100],
      total: 0,
      value: true,
    };
  },
};
</script>