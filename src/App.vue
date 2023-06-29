<template>
  <router-view/>
  <footerMusic v-show="$store.state.isFooterMusic"></footerMusic>
</template>

<script>
import footerMusic from '@/components/item/footerMusic'
export default{
  components:{footerMusic},
  setup() {
    
  },
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
}
a{
  color: black;
}
</style>
