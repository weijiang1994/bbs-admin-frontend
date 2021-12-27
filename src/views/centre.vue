<style>
</style>
<template>
  <div id="centre">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card shadow="hover">
              <div slot="header">
                <i class="fa fa-cube mr-3"></i>社区概况
              </div>
              <el-row :gutter="10">
                <el-col :span="12">
                  <community-card
                    apiUrl="/community/user/info"
                  ></community-card>
                </el-col>
                <el-col :span="12">
                  <community-card
                    apiUrl="/community/post/info"
                  ></community-card>
                </el-col>
              </el-row>
              <el-row :gutter="10" class="mt-10">
                <el-col :span="12">
                  <community-card apiUrl="/community/comment/info"></community-card>
                </el-col>
                <el-col :span="12"><community-card apiUrl="/community/user/register"></community-card></el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <div slot="header"><i class="fa fa-map-marker mr-2"></i> 快捷入口</div>
              <div></div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import CommunityCard from "@/components/CommunityCard";
export default {
  name: "Home",
  components: {
    CommunityCard
  },
};
</script>
<style scoped>
/deep/ .el-card__header {
  padding: 8px;
}
</style>