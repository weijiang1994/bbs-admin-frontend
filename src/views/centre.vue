<template>
  <div id="home">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card shadow="hover">
              <div slot="header"><i class="fa fa-cube mr-3"></i>社区概况</div>
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
                  <community-card
                    apiUrl="/community/comment/info"
                  ></community-card>
                </el-col>
                <el-col :span="12"
                  ><community-card
                    apiUrl="/community/user/register"
                  ></community-card
                ></el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <div slot="header">
                <i class="fa fa-map-marker mr-2"></i> 快捷入口
              </div>
              <div></div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header"><i class="fa fa-file-o mr-3"></i>操作记录</div>
          <div>
            <el-timeline>
              <el-timeline-item
                v-for="(log, index) in adminLogs"
                :key="index"
                :timestamp="log.timestamp"
                color="#0bbd87"
              >
                {{ log.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>

        <el-card shadow="hover" class="mt-10">
          <div slot="header"><i class="fa fa-server mr-2"></i>服务器状态</div>
          <div>
            <p>CPU使用率</p>
            <el-progress
              :percentage="server.cpu"
              :color="serverColor.cpu"
            ></el-progress>
            <p>内存使用率</p>
            <el-progress
              :percentage="server.mem"
              :color="serverColor.mem"
            ></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CommunityCard from "@/components/CommunityCard";
import { latestAdminLog, serverStatus } from "@/api/normal";
export default {
  name: "Home",
  components: {
    CommunityCard,
  },
  data() {
    return {
      adminLogs: [],
      server: {
        cpu: 20,
        mem: 35,
      },
      serverColor: {
        cpu: "#5cb87a",
        mem: "#5cb87a",
      },
    };
  },
  created() {
    latestAdminLog().then((res) => {
      this.adminLogs = res.data;
    });
  },
  mounted() {
    this.getServerStatus();
    this.timer = window.setInterval(() => {
      setTimeout(() => {
        this.getServerStatus();
      }, 0);
    }, 3 * 1000);
  },
  destroyed() {
    window.clearInterval(this.timer);
  },
  methods: {
    getServerStatus() {
      serverStatus().then((res) => {
        this.server = res.data;
        if (this.server.cpu < 40) {
          this.serverColor.cpu = "#5cb87a";
        } else if (this.server.cpu > 40) {
          this.serverColor.cpu = "#E6A23C";
        } else if (this.server.cpu > 80) {
          this.serverColor.cpu = "#F56C6C";
        }
        if (this.serverColor.mem < 40) {
          this.serverColor.mem = "#5cb87a";
        } else if (this.server.mem > 40) {
          this.serverColor.mem = "#E6A23C";
        } else if (this.server.mem > 80) {
          this.serverColor.mem = "#F56C6C";
        }
      });
    },
  },
};
</script>
<style scoped>
#home /deep/ .el-card__header {
  padding: 8px;
}
</style>
