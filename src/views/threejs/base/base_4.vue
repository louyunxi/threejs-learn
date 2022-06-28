
<template>
  <div id="baseContainer"></div>
</template>

<script>
/* eslint-disable no-unused-vars */

// 1. GUI 交互式参数调节工具 
//    npm install --save dat.gui
// 2. resize 动态渲染窗口
// 3. 全屏 退出全屏


import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入dat.gui
import * as dat from "dat.gui";
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


      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("baseContainer").appendChild(renderer.domElement);

      const controls=new OrbitControls(camera, renderer.domElement);
      console.log(controls);

      const axesHelper = new THREE.AxesHelper(5); //入参坐标轴的长度
      scene.add(axesHelper);

      function render() {
        renderer.render(scene, camera);
        //   渲染下一帧的时候就会调用render函数
        requestAnimationFrame(render);
      }
      render();

      // gui 
      this.initGui(cube);
      // 监听resize 动态更新窗口
      this.listenResize(camera,renderer);
      // 监听双击 全屏和 退出全屏
      this.initFullScreen(renderer);
    },
    initGui(cube){
      const gui = new dat.GUI();
      gui
        .add(cube.position, "x")
        .min(0)
        .max(5)
        .step(0.01)
        .name("移动x轴")
        .onChange((value) => {
          console.log("值被修改：", value);
        })
        .onFinishChange((value) => {
          console.log("完全停下来:", value);
        });

      //   修改物体的颜色
     /*  const params = {
        color: "#ffff00",
        fn: () => {
          //   让立方体运动起来
          gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
        },
      };
      gui.addColor(params, "color").onChange((value) => {
        console.log("值被修改：", value);
        cube.material.color.set(value);
      }); */

      // 设置选项框
      /* gui.add(cube, "visible").name("是否显示");
      // 显示为线框
      var folder = gui.addFolder("设置立方体");
      folder.add(cube.material, "wireframe");

      // 设置按钮点击触发某个事件
      folder.add(params, "fn").name("立方体运动"); */
    },
    listenResize(camera,renderer){
      const resizefn=() => {
        //   console.log("画面变化了");
        // 更新摄像头
        camera.aspect = window.innerWidth / window.innerHeight;
        //   更新摄像机的投影矩阵
        camera.updateProjectionMatrix();

        //   更新渲染器
        renderer.setSize(window.innerWidth, window.innerHeight);
        //   设置渲染器的像素比
        renderer.setPixelRatio(window.devicePixelRatio);
      }
      // 监听画面变化，更新渲染画面
      window.addEventListener("resize", resizefn);
      this.$once("hook:beforeDestroy", function() {
        window.removeEventListener("resize", resizefn);
      });
    },
    initFullScreen(renderer){
      const fullScreen=() => {
        const fullScreenElement = document.fullscreenElement;
        if (!fullScreenElement) {
          //   双击控制屏幕进入全屏，退出全屏
          // 让画布对象全屏
          renderer.domElement.requestFullscreen();
        } else {
          //   退出全屏，使用document对象
          document.exitFullscreen();
        }
        //   console.log(fullScreenElement);
      };
      // 监听画面变化，更新渲染画面
      window.addEventListener("dblclick", fullScreen);
      this.$once("hook:beforeDestroy", function() {
        window.removeEventListener("dblclick", fullScreen);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
