import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Recommend =(resolve)=>{
  import('components/recommend/recommend').then((moudle)=>{
    resolve(moudle)
  })
}
const Singer =(resolve)=>{
  import('components/singer/singer').then((moudle)=>{
    resolve(moudle)
  })
}
const Rank =(resolve)=>{
  import('components/rank/rank').then((moudle)=>{
    resolve(moudle)
  })
}
const Search =(resolve)=>{
  import('components/search/search').then((moudle)=>{
    resolve(moudle)
  })
}
const SingerDetail =(resolve)=>{
  import('components/singer-detail/singer-detail').then((moudle)=>{
    resolve(moudle)
  })
}
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children:[
        {
          path: ':id',
          component:SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path:'/user',
      // component:UserCenter
    }
  ]
})
