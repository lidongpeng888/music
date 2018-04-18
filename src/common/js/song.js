import {getSongUrlVkey} from 'api/singer'
import {ERR_OK} from 'api/config'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    // url: `http://isure.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=32`
    url: ''
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) return ''
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function getSongUrl(song, mid) {
  getSongUrlVkey(mid)
    .then((res) => {
      if (res.code === ERR_OK) {
        if (res.data.items) {
          let item = res.data.items[0]
          song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=4300126822&fromtag=66`
        }
      }
    })
    .catch((e)=>{
      console.log(e)
    })
}
