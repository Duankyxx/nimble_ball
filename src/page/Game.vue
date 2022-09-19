<template>
  <div id="cont">
    <div id="title"></div>

    <!--球-->
    <Ball></Ball>

    <!--结束及其统计面板-->
    <GameOver v-show="!store.state.isPlaying"></GameOver>

    <div id="btn">
      <div id="btn_s" :style="{left: realityX+'px'}"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, Ref} from "vue";
import Ball from "../components/Ball.vue";
import store from "../store";
import GameOver from "../components/GameOver.vue";

export default defineComponent({
  name: "Game",
  components: {GameOver, Ball},
  setup() {
    //上一次平台的值
    let oldX: number = 0;
    //真实的值
    let realityX: Ref<number> = ref(0);

    onMounted(() => {
      //开启触摸事件
      const cont = document.getElementById("cont")!;
      const btn = document.getElementById("btn_s")!;
      let Max_X = (cont.clientWidth-20) - btn.clientWidth;
      //提供真实的值
      realityX.value = (cont.clientWidth/2)-btn.clientWidth/2;
      //更改store
      store.state.platform = [realityX.value,btn.clientWidth];

      document.ontouchmove = (ev) => {
        //第一次值只做记录
        if (oldX === 0) {
          oldX = Math.round(ev.touches[0].clientX);
          return;
        }
        //进行对比
        let newX: number = Math.round(ev.touches[0].clientX);
        let difference: number = newX - oldX;
        // console.log("difference----      "+difference);
        //是否可以更改
        realityX.value += difference;
        if(realityX.value<0 || realityX.value>Max_X) {
          if (realityX.value<0) {
            realityX.value = 0;
            store.state.platform = [0,btn.clientWidth];
          } else {
            realityX.value = Max_X;
            store.state.platform = [Max_X,btn.clientWidth];
          }
          return;
        }
        //更改store
        store.state.platform = [realityX.value,btn.clientWidth];
        oldX = newX;
      }
      document.ontouchend = () => oldX = 0;
    })
    return {
      oldX,realityX,store
    }
  }
})
</script>

<style scoped>
#cont {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  background-color: #f3f3f3;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  padding: 10px;
  position: relative;
}
#title {
  width: 28.5%;
  height: 30px;
  background-color: #1f1f1f;
  border-radius: 50px;
  transform: translate(-50%);
  position: absolute;
  left: 50%;
  top: 10px;
}
#btn {
  width: 100%;
  height: 20%;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
#btn_s {
  width: 30%;
  height: 20px;
  border: 0;
  border-radius: 50px;
  background-color: #1f1f1f;
  color: #f3f3f3;
  font-size: 25px;
  position: absolute;
}
</style>