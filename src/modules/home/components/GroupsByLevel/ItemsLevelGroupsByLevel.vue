<template>
  <div class="item-level mt-2 mb-5">
    <p class="titulo_3">{{ title }}</p>
    <ul>
      <li v-for="(item, index) in itemsLevel" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ItemsLevelGroupsByLevel',
  props: {
    title: {
      type: String,
      required: true
    },
    itemsLevel: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  .item-level ul {
    list-style: none;
    padding-left: 0px !important;
  }

  .item-level ul li {
    font-size: 16px;
    font-weight: 300;
    margin: 15px 0px;
    display: flex;
    align-items: center;
    color: #000;
  }

  .item-level ul li::before {
    content: url(/images/academia750/cheack-ico.svg);
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 5px;
  }
</style>
