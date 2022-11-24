<template>
  <Header/>
  <router-view class="view-rout"/>
  <Footer class="footer"/>
</template>
<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
export default{

  components:{
    Header,Footer
  },
  setup(){
    
  },
  created () {

}
}
</script>
<style>
.view-rout{
  min-height: 55vh;
}
.footer{
  position: relative;
  top:20vh
}
</style>
