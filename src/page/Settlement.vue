<template>
  <div id="cont">
    <!--title-->
    <div id="title_box">
      <div id="title_block">{{title_msg}}</div>
    </div>
    <!--按钮-->
    <div  id="btn">
      <button @click="start">开始游戏</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settlement"
}
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
</style>