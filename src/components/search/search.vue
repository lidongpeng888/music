<template>
  <div class="search" ref="search">
    <div class="search-box-wrapper">
      <seaerch-box></seaerch-box>
    </div>
    <div class="shortcut-wrapper">
      <Scroll class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item"><span></span></li>
            </ul>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span>搜索历史</span>
              <span class="clear"><i class="icon-clear"></i></span>
            </h1>
            <search-list :searchs="searchHistory" @delete="deleteOne" @select="selectItem"></search-list>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
  export default {
    import SearchBox from 'base/search-box/search-box'
    methods:{
      deleteOne(){},
      selectItem(){},
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
