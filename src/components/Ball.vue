<template>
  <div id="Ball"></div>
</template>

<script>
import {defineComponent, onMounted, onUnmounted, watch} from "vue";
import Ball from "../Ball/Ball.ts";
import store from "../store/index.ts";

export default defineComponent({
  name: "Ball",
  setup() {
    //当组件html加载完毕时new
    let ball;

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