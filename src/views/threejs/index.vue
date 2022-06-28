<template>
  <div class="container">
    <component :is="comName"></component>
  </div>
</template>

<script>
import '@/assets/js/flexible'
export default {
  name: 'threejs',
  components: {
    base_1:() => import('./base/base_1.vue'),
    base_2:() => import('./base/base_2.vue'),
    base_3:() => import('./base/base_3.vue'),
    base_4:() => import('./base/base_4.vue'),
  },
  data() {
  	return {
      comName:'base_4'
  	}
  },
  computed: {
  	
  },
  created() {
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.container {

}
  
</style>
