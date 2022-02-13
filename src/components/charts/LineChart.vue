<template>
  <div :id="id" style="width: 100%; height: 330px"></div>
</template>
<script>
import echarts from "echarts";
import chartTheme from "@/components/charts/theme/westeros.json";
import { merge } from "lodash";

export default {
  name: "LineChart",
  data() {
    return {
      id: "lineChart",
    };
  },
  props: {
    seriesData: {
      type: Array,
      default: () => [],
      require: true,
    },
    legends: {
      type: Array,
      default: () => [],
      require: true,
    },
  },
  watch: {
    legends: {
      deep: true,
      hanlder() {
        console.log('更新了legend');
        this.chart.setOption(this.loadOption(), true);
      },
    },
  },
  mounted() {
    console.log(this.legends);
    this.initChart();
  },
  methods: {
    initChart() {
      echarts.registerTheme("westeros", chartTheme);
      this.chart = echarts.init(document.getElementById(this.id), "westeros");
      this.chart.setOption(this.loadOption(), true);
    },
    loadOption() {
      let data = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: this.legends,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "访问量",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "基金",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "债券",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "期货",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "储蓄",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      return data;
    },
  },
  // beforeDestroy() {
  //   // 销毁表格
  //   if (!this.chart) {
  //     return;
  //   }
  //   this.chart.dispose();
  //   this.chart = null;
  // },
};
</script>