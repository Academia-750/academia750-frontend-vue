<template>
  <v-toolbar
    class="indigo lighten-5"
    outlined
    :height="$vuetify.breakpoint.xs ? '180px' : '56px'"
  >
    <div
      class="d-flex justify-space-between flex-wrap"
      :style="{ width: '-webkit-fill-available' }"
    >
      <div class="lessons-info">
        <div class="lessons-attributes">
          <slot name="info"> </slot>
        </div>
        <div class="lessons-actions">
          <slot name="actions"> </slot>
        </div>
      </div>
    </div>
  </v-toolbar>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'LessonToolBar',
  data: () => ({})
}
</script>
<style lang="scss" scoped>
.lessons-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
  .lessons-attributes {
    display: flex;
    flex: 2;
    gap: 12px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;
  }
  .lessons-actions {
    display: flex;
    flex: 1;
    gap: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
@media screen and (max-width: 600px) {
  .lessons-info {
    .lessons-attributes {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: flex-start;
      justify-content: center;
      margin-right: 20px;
    }
    .lessons-actions {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
    }
  }
}
</style>
