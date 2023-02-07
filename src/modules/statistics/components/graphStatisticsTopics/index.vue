<template>
  <div v-if="showChart" class="pa-0 ma-0 mt-6 overflow-auto">
    <apexchart type="bar" height="450" :options="getChartOptions" :series="getSeriesGraph"></apexchart>
  </div>
</template>

<script src="./graphStatisticsTopics.js"></script>
