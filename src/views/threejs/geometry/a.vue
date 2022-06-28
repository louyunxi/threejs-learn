
<template>
  <div id="baseContainer"></div>
</template>

<script>
/* eslint-disable no-unused-vars */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入dat.gui
import * as dat from "dat.gui";
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
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
