<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressBtnStart"
           @touchmove.prevent="progressBtnMove"
           @touchend="progressBtnEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created(){
      this.touch={}
    },
    methods: {
      progressClick(e){
        //点击小豆豆时e.offsetX获取不对
        // this._offsetWidth(e.offsetX)
        const rect=this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth=e.pageX - rect.left
        this._offsetWidth(offsetWidth)
        this._triggerPercent()
      },
      progressBtnStart(e){
        this.touch.initialled=true
        this.touch.startX=e.touches[0].pageX
        this.touch.left=this.$refs.progress.clientWidth
      },
      progressBtnMove(e){
        if(!this.touch.initialled){return}
        const delatex=e.touches[0].pageX-this.touch.startX
        const currentWidth=Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,delatex+this.touch.left))
        this._offsetWidth(currentWidth)
      },
      progressBtnEnd(){
        this.touch.initialled=false
        this._triggerPercent()
      },
      _triggerPercent(){
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent=this.$refs.progress.clientWidth/progressBarWidth
        this.$emit('percentChange', percent)
      },
      _offsetWidth(currentWidth){
        this.$refs.progress.style.width = `${currentWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${currentWidth}px,0,0)`
      }
    },
    watch: {
      percent(newValue) {
        if (newValue >= 0&&!this.touch.initialled) {
          const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const currentWidth = newValue * progressBarWidth
          this._offsetWidth(currentWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
