<template>
  <div class="container">
    <base_1></base_1>
  </div>
</template>

<script>
import '@/assets/js/flexible'
export default {
  name: 'threejs',
  components: {
    base_1:() => import('./component/base_1.vue')
  },
  data() {
  	return {
      
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
