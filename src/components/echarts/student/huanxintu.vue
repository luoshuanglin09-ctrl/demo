<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

interface AbillityList {
  paper: string;
  zl: string;
  hj: string;
}

const props = defineProps<{
  abillityList: AbillityList;
}>();

const chart = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts;

onMounted(() => {
  initChart();
});

const initChart = () => {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    updateChart();
  }
};

const updateChart = () => {
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: parseInt(props.abillityList.paper), name: '论文' },
          { value: parseInt(props.abillityList.zl), name: '专利' },
          { value: parseInt(props.abillityList.hj), name: '获奖' },
        ]
      }
    ]
  };
  myChart.setOption(option);
};

// 监听 props.abillityList 的变化，数据变化时更新图表
watch(() => [props.abillityList.paper, props.abillityList.zl, props.abillityList.hj,], () => {
  updateChart();
});
</script>

<style scoped>
/* 样式 */
</style>
