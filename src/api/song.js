import {commonParams} from './config'
import axios from 'axios'

export const getLyric = (mid) => {
  const url = '/api/getLyric'
  const data = Object.assign({}, commonParams, {
    songmid:mid,
    pcachetime:+new Date(),
    loginUin: 0,
    platform: 'yqq',
    hostUin: 0,
    format: 'json',
    needNewCode: 0,
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
