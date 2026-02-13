//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
  install (app) {
    //定义全局指令
    app.directive('img-lazy',{
      mounted(el, binding){
        const {stop} = useIntersectionObserver(
          el,//指令绑定的那个元素 img
          ([{isIntersecting}]) => {
            //是否进入视口
            // console.log(isIntersecting)
            if(isIntersecting){
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}