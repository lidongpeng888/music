<template>
  <div class="search" ref="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <Scroll class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" @click="addQuery(item)" v-for="item in hotKey"><span>{{item.k}}</span></li>
            </ul>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span>搜索历史</span>
              <span class="clear"><i class="icon-clear"></i></span>
            </h1>
            <!--<search-list :searchs="searchHistory" @delete="deleteOne" @select="selectItem"></search-list>-->
          </div>
        </div>
      </Scroll>
    </div>
    <div class="search-result" v-show="query">
      <Suggest :query="query" @listScroll="blurInput"></Suggest>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import SearchBox from 'base/search-box/search-box'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from "api/config"
  import Suggest from 'components/suggest/suggest'

  export default {
    data(){
      return {
        searchHistory:[],
        placeholder:'',
        hotKey:[],
        query:''
      }
    },
    created(){
      this._gethotkey()
    },
    methods:{
      blurInput(){
        this.$refs.searchBox.blur()
      },
      onQueryChange(query){
        this.query=query
      },
      _gethotkey(){
        getHotKey().then((res)=>{
          if(res.code===ERR_OK){
            this.hotKey=res.data.hotkey.slice(0,10)
          }
        })
      },
      addQuery(item){
        this.$refs.searchBox.setQuery(item.k)
      },
      deleteOne(){},
      selectItem(){},
    },
    components:{
      SearchBox,Scroll,Loading,Suggest
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
