
<template>
  <div id="baseContainer"></div>
</template>

<script>
/* eslint-disable no-unused-vars */

// 1.物体 平移 缩放 旋转
// 2.物体位移动画
//    a.每一帧的动画消耗时间是不一样的
//    b.用自带的 Clock 函数 实现动画
//    c.gsap动画

// npm install gsap -S
// 文档 https://greensock.com/docs/v3/GSAP
// https://greensock.com/get-started/#easing

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";  // 导入动画库
export default {
  name: "threejs",
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 10);
      scene.add(camera);

      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);   // 创建几何体
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });  // 基础网格材质
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      scene.add(cube); // 将几何体添加到场景中

      //平移 
      //cube.position.x=2;
      //cube.position.set(1,2,4);
      //缩放
      //cube.scale.set(3,2,1);
      //cube.scale.x=5;
      //旋转
      //cube.rotation.set(Math.PI/4,0,0,"XYZ"); // 没有度数 deg 360度 就是 2*Math.PI
      //cube.rotation.x=Math.PI/3;  //绕x轴旋转 60度

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("baseContainer").appendChild(renderer.domElement);

      const controls=new OrbitControls(camera, renderer.domElement);
      console.log(controls);

      const axesHelper = new THREE.AxesHelper(5); //入参坐标轴的长度
      scene.add(axesHelper);


      // 每一帧的动画消耗时间是不一样的
      var oldTime=0;
      function render(time) {
        console.log(time-oldTime);
        oldTime=time;
        renderer.render(scene, camera);
        //   渲染下一帧的时候就会调用render函数
        requestAnimationFrame(render);
      }


      // 用自带的 Clock 函数 实现动画
      /* const clock=new THREE.Clock();
      function render() {
        //let deltaTime=clock.getDelta();  //返回秒
        //console.log("两次获取时间的的间隔时间：",deltaTime*1000);
        //console.log("平均帧率：",parseInt(1000/(deltaTime*1000)));

        let time = clock.getElapsedTime();
        console.log("时钟运行总时长：", time);  // 1,2,3,4,5,6,7
        let t = time % 5;  //0,1,2,3,4,5,0,1,2,3,4
        cube.position.x = t * 1;  //x 轴上
        renderer.render(scene, camera);
        //   渲染下一帧的时候就会调用render函数
        requestAnimationFrame(render);
      } */

      // gsap 动画库 辅助动画
      /* var animate1 = gsap.to(cube.position, {
        x: 5,
        duration: 5,
        ease: "power1.inOut",
        //   设置重复的次数，无限次循环-1
        repeat: -1,
        //   往返运动
        yoyo: true,
        //   delay，延迟2秒运动
        delay: 2,
        onComplete: () => {
          console.log("动画完成");
        },
        onStart: () => {
          console.log("动画开始");
        },
      });
      //gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });

      window.addEventListener("dblclick", () => {
        if (animate1.isActive()) {
          //   暂停
          animate1.pause();
        } else {
          //   恢复
          animate1.resume();
        }
      });
      function render() {
        renderer.render(scene, camera);
        //   渲染下一帧的时候就会调用render函数
        requestAnimationFrame(render);
      } */

      render();

    },
  },
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
