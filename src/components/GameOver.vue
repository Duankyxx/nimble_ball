<template>
  <div id="panel">
    <div id="panel_cont">

      <div id="btn"><button @click="toHome">主页</button><button @click="settlement">结算</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import router from "../router";
import store from "../store";

export default defineComponent({
  name: "GameOver",
  setup() {
    const toHome = (): void => {
      setTimeout(() => {
        router.push('/home');
      },300)
    }
    const settlement = (): void => {
      setTimeout(() => {
        router.push('/settlement');
      },300)
    }
    return {
      toHome,settlement
    }
  }
});
</script>

<style scoped>
#panel {
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ShowPanel 300ms ease forwards;
  background-color: rgba(211, 211, 211, 0);
}
@keyframes ShowPanel {
  0% {
    background-color: rgba(211, 211, 211, 0);
  }
  100% {
    background-color: rgba(211, 211, 211, 0.5);
  }
}
#panel_cont {
  width: 80%;
  background-color: #f1f1f1;
  border-radius: 30px;
  margin-bottom: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  animation: SHowPanel_cont 500ms ease forwards;
  height: 0%;
}
@keyframes SHowPanel_cont {
  0% {
    height: 0%;
  }
  100% {
    height: 15%;
  }
}
#btn {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#btn>button {
  border: 0;
  border-radius: 40px;
  width: 35%;
  height: 35px;
  font-size: 20px;
  font-weight: bold;
  color: #3f3f3f;
  transition: 500ms;
}
#btn>button:nth-child(1) {
  background-color: aquamarine;
}
#btn>button:hover {
  font-size: 14px;
}
#btn>button:nth-child(2) {
  background-color: pink;
}
</style>