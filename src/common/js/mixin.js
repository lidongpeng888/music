
import {mapGetters} from 'vuex'
export const playListMixin = {
  computed:{
    ...mapGetters([
      'playList'
    ])
  },
  mounted(){
    this.handlePlaylist(this.playList)
  },
  activated(){
    this.handlePlaylist(this.playList)
  },
  watch:{
    playList(newVal){
      this.handlePlaylist(newVal)
    }
  },
  methods:{
    handlePlaylist(){}
  }
}
