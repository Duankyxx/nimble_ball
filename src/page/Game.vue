<template>
  <div id="cont">
    <div id="box_score"><div id="score"></div></div>
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
      const title = document.getElementById("title")!;
      let Max_X = (cont.clientWidth-20) - btn.clientWidth;

      //提供真实的值
      realityX.value = (cont.clientWidth/2)-btn.clientWidth/2;

      //设置需要绘制的三个点
      const vHeight = window.innerHeight;
      store.state.platform = [realityX.value, (vHeight - (btn.offsetTop + 75)), btn.clientWidth, btn.clientHeight];
      const a = (cont.clientWidth/2)-(title.clientWidth/2);
      store.state.baffle = [a, title.offsetTop, title.clientWidth, title.clientHeight];

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
            store.state.platform[0] = 0;
          } else {
            realityX.value = Max_X;
            store.state.platform[0] = Max_X;
          }
          return;
        }
        //更改store
        store.state.platform[0] = realityX.value;
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
/*得分动画*/
#box_score {
  width: calc(100% - 20px);
  position: fixed;
  top: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#score {
  width: 28.5%;
  height: 30px;
  background-color: #1f1f1f;
  border-radius: 50px;
}
.score {
  animation: Score 300ms ease-in-out 0s forwards;
}
@keyframes  Score{
  0% {

  }
  50% {
    width: 40%;
    height: 40px;
  }
  100% {

  }
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