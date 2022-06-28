<template>
  <div id="baseContainer"></div>
</template>

<script>

// 1.使用轨道控制器  orbit controls 轨道控制器 可以使得相机围绕目标进行轨道运动
// 2.坐标辅助器 AsesHelper 模拟3个坐标轴的对象 红色 X 轴 绿色 Y轴 蓝色 Z轴  入参坐标轴长度


import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
      //场景+相机+物体+渲染器
      // 1、创建场景
      const scene = new THREE.Scene();

      // 2、创建相机 Perspective 透视
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // 设置相机位置
      camera.position.set(0, 0, 10);
      scene.add(camera);

      // 添加物体
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);   // 创建几何体
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });  // 基础网格材质

      // 根据几何体和材质创建物体
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      scene.add(cube); // 将几何体添加到场景中

      // 初始化渲染器
      const renderer = new THREE.WebGLRenderer();
      // 设置渲染的尺寸大小
      renderer.setSize(window.innerWidth, window.innerHeight);

      // 将webgl渲染的canvas内容添加到body
      document.getElementById("baseContainer").appendChild(renderer.domElement);

      // 创建轨道控制器
      const controls=new OrbitControls(camera, renderer.domElement);
      //设置控制器阻尼，让控制器硬有真实效果，必须在动画循环里调用。update().
      controls.enableDamping =true;
      console.log(controls);

       // 添加坐标轴辅助器
      const axesHelper = new THREE.AxesHelper(5); //入参坐标轴的长度
      scene.add(axesHelper);

      // 使用渲染器，通过相机将场景渲染进来
      //renderer.render(scene, camera);

      function render() {
        controls.update();
        renderer.render(scene, camera);
        //   渲染下一帧的时候就会调用render函数
        requestAnimationFrame(render);
      }

      render();
    },

    
  },
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
