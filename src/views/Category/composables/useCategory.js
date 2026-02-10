import { getCategoryAPI } from "@/apis/category.js"
import { ref,onMounted,watch } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate} from 'vue-router'

export function useCategory(){
  // 导入 VueRouter 的 useRoute 函数，
  // 作用是获取当前页面的路由信息（比如路由地址、路由参数 id 等）

  //后端给了数字(category.js) → 前端循环渲染成链接(RouterLink) → 路由配置识别并接收数字(index.js) → 组件拿到数字请求数据
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async(id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(()=>getCategory())

  onBeforeRouteUpdate((to)=>{
    getCategory(to.params.id)
  })

  // 2. 新增：监听路由参数id的变化，变化时重新请求数据
  watch(
    () => route.params.id, // 监听的目标：路由参数id
    (newId) => { // newId是变化后的新id
      if (newId) { // 确保id存在时再请求
        getCategory()
      }
    },
    { immediate: true } // 可选：立即执行（和onMounted效果重复，可二选一）
  )
  return {
    categoryData
  }
}