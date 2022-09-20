<template>
  <div id="Ball"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted } from "vue";
import Ball from "../Ball/Ball";
import store from "../store/index";

export default defineComponent({
  name: "Ball",
  setup() {
    //当组件html加载完毕时new
    let ball: Ball;

    onMounted(() => {
      ball = new Ball();
      if (!store.state.isPlaying) {
        ball.Unmounted();
        return;
      }
      //开启
      ball.start();
    })
    onUnmounted(() => {
      ball.Unmounted();
    })
    return {
      Ball
    }
  }
});
</script>

<style scoped>
#Ball {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1f1f1f;
  position: absolute;
}
</style>