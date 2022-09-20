<template>
  <div id="cont">
    <!--title-->
    <div id="title_box">
      <div id="title_block" v-show="!srore">{{title_msg}}</div>
      <div id="title_block" class="sroce_block" v-show="srore"><p>上局分数:</p><a>{{store.state.currentScore}}</a></div>
    </div>
    <!--按钮-->
    <div  id="btn">
      <button @click="start">开始游戏</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted } from "vue";
import router from "../router";
import store from "../store";

export default defineComponent({
  name: "Home",
  setup() {
    //判断分数是否为0
    let srore: boolean = false;
    if (store.state.currentScore !== 0) {
      srore = true;
    } else {
      srore = false;
    }

    let flag: boolean = true;
    const title_msg: string = "灵动球";
    //开始游戏
    const start = (): void => {
      store.state.currentScore = 0;
      if (flag) {
        flag = false;
        //开启动画
        document.getElementById('title_block')!.className = "title_block";
        setTimeout(() => {
          console.log("ok");
          document.getElementById('btn')!.id = "btns";
          store.state.isPlaying = true;
          setTimeout(() => {router.push('/game')},300);
        },700);
      }
    }
    //挂载动画
    onMounted(() => {
      document.getElementById('title_block')!.className = "title_block2";
      setTimeout(() => {
        document.getElementById('title_block')!.className = "";
      },550);
    })
    return {
      title_msg,start,flag,store,srore
    }
  }
});
</script>

<style scoped>
#cont {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  background-color: #f3f3f3;
  padding: 10px;
  /*上下布局*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#title_box {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
}
#title_block {
  width: 80%;
  height: 80%;
  background-color: #1f1f1f;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*字体设置*/
  color: #f3f3f3;
  font-size: 60px;
  font-weight: bold;
  overflow: hidden;
  /*动画*/
  /*animation: Start 700ms ease-in-out 0s forwards;*/
}
.sroce_block {
  flex-direction: column;
}
#title_block>p {
  font-size: 40px;
}
.title_block2 {
  animation: ShowTitle_block 500ms ease-in-out forwards;
}
@keyframes ShowTitle_block {
  0% {
    font-size: 0;
    color: #1f1f1f;
    width: 30%;
    height: 30px;
    border-radius: 50px;
  }
  80% {
    width: 90%;
    height: 90%;
    border-radius: 12px;
  }
  100% {

  }
}
.title_block {
  animation: Start 700ms ease-in-out 0s forwards;
}
#btn {
  width: 100%;
  height: 20%;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#btn>button {
  width: 50%;
  height: 50px;
  border: 0;
  border-radius: 50px;
  background-color: #1f1f1f;
  color: #f3f3f3;
  font-size: 25px;
}
#btn>button:hover {
  animation: Btn_big 700ms ease;
}
/*按钮动画*/
@keyframes Btn_big {
  0% {
    width: 50%;
    height: 50px;
    font-size: 25px;
  }
  50% {
    width: 55%;
    height: 55px;
    font-size: 27px;
  }
  100% {
    width: 50%;
    height: 50px;
    font-size: 25px;
  }
}
/*开始动画*/
@keyframes Start {
  0% {

  }
  20% {
    width: 90%;
    height: 90%;
    border-radius: 12px;
  }
  100% {
    font-size: 0;
    color: #1f1f1f;
    width: 30%;
    height: 30px;
    border-radius: 50px;
  }
}
#btns {
  width: 100%;
  height: 20%;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#btns>button {
  width: 50%;
  height: 50px;
  border: 0;
  border-radius: 50px;
  background-color: #1f1f1f;
  color: #f3f3f3;
  font-size: 25px;
  animation: Btns 300ms ease-out forwards;
}
@keyframes Btns {
  0% {

  }
  100% {
    width: 30%;
    height: 20px;
    font-size: 0;
    color: #1f1f1f;
  }
}
</style>