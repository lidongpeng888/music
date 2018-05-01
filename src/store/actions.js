import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from "common/js/util"


function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCELIST, list)
  let randomList=shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong =function({commit,state},song){
  let playList=state.playList.slice()//返回副本
  let sequenceList=state.sequenceList.slice()//返回副本
  let currentIndex=state.currentIndex
  //记录当前歌曲
  let currentSong=playList[currentIndex]
  //查找当前歌曲index
  let fpIndex= findIndex(playList,song)
  //插入歌曲索引加1
  currentIndex++
  //插入这首歌到当前索引
  playList.splice(currentIndex,0,song)
  //已经包含这首歌，删掉他
  if(fpIndex>-1){
    //当前插入的序号大于列表中的序号
    if(currentIndex>fpIndex){
      playList.splice(fpIndex,1)
      currentIndex--
    }else{
      playList.splice(fpIndex+1,1)
    }
  }
  //需要插入的位置
  let currentSIndex=findIndex(sequenceList,currentSong)+1
  //
  let fsIndex=findIndex(sequenceList,song)
  sequenceList.splice(currentSIndex,0,song)
  if(fsIndex>-1){
    //当前插入的序号大于列表中的序号
    if(currentSIndex>fsIndex){
      sequenceList.splice(fsIndex,1)
    }else{
      sequenceList.splice(fsIndex+1,1)
    }
  }
  commit(types.SET_PLAYLIST,playList)
  commit(types.SET_SEQUENCELIST,sequenceList)
  commit(types.SET_CURRENTINDEX,currentIndex)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
