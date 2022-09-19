import store from "../store";
import {onUnmounted} from "vue";

export default class Ball {
    //运动速度
    speed: number = 1000/60;
    //移动定时器
    clock: number | undefined = undefined;
    //边界XY
    boundaryX: number = 0;
    boundaryY: number = 0;
    //小球位置信息
    X: number= 0;
    Y: number = 0;
    //初始方向及其运动
    initial_x: number = 2;
    initial_y: number = 2;

    //构造器及其初始化
    constructor(X: number = 0, Y: number = 0) {
        const cont = document.getElementById('cont')!;
        const ball = document.getElementById('Ball')!;
        this.boundaryX = cont.clientWidth - ball.clientWidth;
        this.boundaryY = cont.clientHeight - ball.clientHeight;
        this.virtualToReal(X, Y);
    }

    //start
    start = () => {
        this.clock = setInterval(() => {
            this.virtualToReal(this.X+this.initial_x, this.Y+this.initial_y);
        }, this.speed);
    }

    //虚拟定位转换真实定位
    virtualToReal = (x: number, y: number) => {
        //处理碰到边缘时
        this.Margin(x, y);

        //触碰到平台时
        this.touchPlatform(x, y);

        const ball = document.getElementById('Ball')!;
        this.X = x;
        this.Y = y;
        ball.style.top = this.Y + "px";
        ball.style.left = this.X + "px";
    }

    //碰到边缘处理函数
    Margin = (x: number, y: number) => {
        if (x<0 || x>this.boundaryX) {
            if(x>this.boundaryX) {
                this.initial_x = -2;
            }
            if (x<0) {
                this.initial_x = 2;
            }
            return;
        }
        if (y<0 || y>this.boundaryY) {
            if (y>this.boundaryY) {
                //停止游戏
                clearInterval(this.clock);
                store.state.isPlaying = false;
            }
            if (y<0) {
                this.initial_y = 2;
            }
            return;
        }
    }

    //碰到平台处理函数
    touchPlatform = (x: number, y: number) => {
        let cont = document.getElementById('cont')!;
        let btn_s = document.getElementById('btn_s')!;
        let platformMinY = cont.clientHeight - btn_s.offsetTop - btn_s.clientHeight - 60 - document.getElementById('Ball')!.clientHeight;
        let platformMaxY = platformMinY+20;
        // 73<y<93
        if (platformMinY<y && y<platformMaxY) {
            let { platform } = store.state;
            if (platform[0]<x && x<(platform[0]+platform[1])) {
                this.initial_y = -2;
            }
        }
    }

    //组件卸载时
    Unmounted = () => {
        //停止游戏
        clearInterval(this.clock);
        store.state.isPlaying = false;
    }
}