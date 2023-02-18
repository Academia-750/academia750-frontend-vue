<template>
  <div v-if="showChart" class="pa-0 ma-0 mt-6 overflow-auto">
    <apexchart
      type="bar"
      height="1000px"
      :options="getChartOptions"
      :series="getSeriesGraph"
    ></apexchart>
  </div>
</template>

<script src="./graphStatisticsTopics.js"></script>
