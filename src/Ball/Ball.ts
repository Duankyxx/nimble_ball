import store from "../store";

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
        this.clock = setInterval((): void => {
            this.virtualToReal(this.X+this.initial_x, this.Y+this.initial_y);
        }, this.speed);
    }

    //虚拟定位转换真实定位
    virtualToReal = (x: number, y: number): void => {
        //处理碰到边缘时
        this.Margin(x, y);

        //触碰到平台时
        this.drawEntity(store.state.platform, x, y);
        //碰到记分板
        if (this.drawEntity(store.state.baffle, x, y)) this.touchBaffle();

        const ball = document.getElementById('Ball')!;
        this.X = x;
        this.Y = y;
        ball.style.top = this.Y + "px";
        ball.style.left = this.X + "px";
    }

    //碰到边缘处理函数
    Margin = (x: number, y: number): void => {
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


    //碰到title栏及其加分
    touchBaffle = (): void => {
        const score = document.getElementById("score")!;
        //得分+动画
        store.state.currentScore++;
        score.className = "score";
        setTimeout((): void => {
            score.className = "";
        },300)
    }

    //根据三个位置去绘制及其判断触碰
    drawEntity = (coordinate: Array<number>, x: number, y: number): boolean => {
        /*
                a --> c
                c --> a
                d --> b
                b --> d
         */
        // console.log(x,y,coordinate)
        //a --> c   c --> a
        if ((coordinate[1]<y && y<(coordinate[1]+coordinate[3])) || (coordinate[1]<(y+30) && (y+30)<(coordinate[1]+coordinate[3]))) {
            if ((coordinate[0]<x && x<(coordinate[0]+coordinate[2])) || (coordinate[0]<(x+30) && (x+30)<(coordinate[0]+coordinate[2]))) {
                this.initial_y = -this.initial_y;
                return true;
            }
        }
        return false;
    }

    //组件卸载时
    Unmounted = (): void => {
        //停止游戏
        clearInterval(this.clock);
        store.state.isPlaying = false;
    }
}