<template>
  <div id="home">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card shadow="hover" :height="500">
              <div slot="header">
                <i class="fa fa-cube mr-3" style="color: #71cc59"></i>社区概况
              </div>
              <div style="height: 200px">
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
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" :height="500">
              <div slot="header">
                <i class="fa fa-map-marker mr-3" style="color: #71cc59"></i>
                快捷入口
              </div>
              <div class="flex-div-for-quick">
                <div
                  v-for="(item, index) in quickDatas"
                  :key="index"
                  class="flex-div-for-quick-item"
                >
                  <quick-link
                    :icon="item.icon"
                    :title="item.title"
                    :router="item.router"
                  ></quick-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="mt-10">
          <div slot="header">
            <i class="fa fa-line-chart mr-3" style="color: #71cc59"></i>访问统计
          </div>
          <el-button-group>
            <el-button
              :type="dateRange === 'week' ? 'primary' : ''"
              size="mini"
              @click="changeStatisticsRange('week')"
              >最近一周</el-button
            >
            <el-button
              :type="dateRange === 'half' ? 'primary' : ''"
              size="mini"
              @click="changeStatisticsRange('half')"
              >最近半月</el-button
            >
            <el-button
              :type="dateRange === 'month' ? 'primary' : ''"
              size="mini"
              @click="changeStatisticsRange('month')"
              >最近一月</el-button
            >
          </el-button-group>
          <Chart :optionData="chartData" class=""></Chart>
          <!-- <line-chart class="mt-10" :legends="legends"></line-chart> -->
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header">
            <i class="fa fa-file-o mr-3" style="color: #71cc59"></i>操作记录
          </div>
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
          <div slot="header">
            <i class="fa fa-server mr-3" style="color: #71cc59"></i>服务器状态
          </div>
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
import { visitStatistic } from "@/api/community";
import QuickLink from "../components/QuickLink.vue";
import Chart from "@/components/charts/Chart";
import { merge } from "lodash";
export default {
  name: "Home",
  components: {
    CommunityCard,
    QuickLink,
    Chart,
  },
  data() {
    this.quickDatas = [
      { title: "用户管理", icon: "fa fa-user fa-2x fa-fw", router: "/user" },
      {
        title: "帖子审核",
        icon: "fa fa-check fa-fw fa-2x",
        router: "/post/review",
      },
      {
        title: "帖子编辑",
        icon: "fa fa-edit fa-2x fa-fw",
        router: "/post/edit",
      },
      {
        title: "帖子类别",
        icon: "fa fa-tag fa-2x fa-fw",
        router: "/post/category",
      },
      {
        title: "帖子主题",
        icon: "fa fa-bookmark fa-2x fa-fw",
        router: "/post/topic",
      },
      {
        title: "评论编辑",
        icon: "fa fa-pencil fa-fw fa-2x",
        router: "/comment/manage",
      },
      {
        title: "评论分析",
        icon: "fa fa-paw fa-fw fa-2x",
        router: "/comment/analysis",
      },
      {
        title: "举报管理",
        icon: "fa fa-bullhorn fa-fw fa-2x",
        router: "/community/report",
      },
    ];
    return {
      dateRange: "week",
      chart: null,
      adminLogs: [],
      server: {
        cpu: 20,
        mem: 35,
      },
      serverColor: {
        cpu: "#5cb87a",
        mem: "#5cb87a",
      },
      chartData: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [],
      },
    };
  },
  created() {
    latestAdminLog().then((res) => {
      this.adminLogs = res.data;
    });
  },
  mounted() {
    this.getVisitStatistic();
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
    getVisitStatistic() {
      visitStatistic({ dateRange: this.dateRange }).then((res) => {
        // console.log(this.chartData);
        this.chartData.xAxis = [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              interval: 0,
              rotate: "45",
            },
            data: res.dates,
          },
        ];
        this.chartData.series = res.series;
      });
    },
    changeStatisticsRange(dateRange) {
      this.dateRange = dateRange;
      this.getVisitStatistic();
    },
    getServerStatus() {
      serverStatus().then((res) => {
        this.server = res.data;
        if (this.server.cpu < 40) {
          this.serverColor.cpu = "#5cb87a";
        } else if (40 < this.server.cpu && this.serverColor.cpu < 80) {
          this.serverColor.cpu = "#E6A23C";
        } else this.serverColor.cpu = "#F56C6C";

        if (this.server.mem < 40) {
          this.serverColor.mem = "#5cb87a";
        } else if (40 < this.server.mem && this.server.mem < 80) {
          this.serverColor.mem = "#E6A23C";
        } else this.serverColor.mem = "#F56C6C";
      });
    },
  },
};
</script>
<style scoped>
#home /deep/ .el-card__header {
  padding: 8px;
}
.flex-div-for-quick {
  height: 200px;
  display: flex;
  align-content: space-around;
  flex-wrap: wrap;
}
.flex-div-for-quick-item {
  flex-grow: 1;
}
#statistics {
  height: 300px;
}
</style>
