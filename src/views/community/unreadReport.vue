<template>
  <div id="unreadReport" class="mt-10">
    <el-table :data="datas" style="width: 100%">
      <el-table-column prop="post_title" label="帖子标题">
        <template slot-scope="scope">
          <a :href="scope.row.post_url" target="_blank">{{
            scope.row.post_title
          }}</a>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="report_body"
        label="举报内容"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="report_tag"
        label="举报类型"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="c_time"
        label="举报时间"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { unreadReport } from "@/api/community.js";
export default {
  data() {
    return {
      datas: [],
    };
  },
  mounted() {
    unreadReport({ page: 1, size: 20 }).then((res) => {
      this.datas = res.data;
      console.log(this.datas);
    });
  },
};
</script>