<template>
    <div :id="chartId" style="width: 100%; height: 100%"></div>
  </template>
  
  <script setup lang="ts">
  import * as echarts from 'echarts';
  import { onMounted, defineProps, watch } from 'vue';
  
  const props = defineProps({
    paper: [String, Number],
    zl: [String, Number],
    hj: [String, Number],
    all: [String, Number]
  });
  
  const chartId = 'hxtChart';
  let myChart: echarts.ECharts | null = null;
  
  onMounted(() => {
    initChart();
  });
  
  const initChart = () => {
    myChart = echarts.init(document.getElementById(chartId)!);
    updateChart();
  };
  
  const updateChart = () => {
    const option: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['论文', '专利', '获奖', '总数']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [props.paper, props.zl, props.hj,props.all],
          type: 'bar'
        }
      ]
    };
    myChart!.setOption(option);
  };
  
  watch(() => [props.paper, props.zl, props.hj, props.all], () => {
    updateChart();
  })
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  