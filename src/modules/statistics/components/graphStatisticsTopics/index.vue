<template>
  <div v-if="showChart" class="pa-0 ma-0 overflow-x-auto">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script src="./graphStatisticsTopics.js"></script>
