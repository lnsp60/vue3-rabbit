import { getBannerAPI } from '@/apis/home.js'
import { ref,onMounted } from 'vue'

//轮播图
export function useBanner(){
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({distributionSite : '2'})
    // console.log(res)
    bannerList.value = res.result
  }
  onMounted(() => getBanner())
  return {
    bannerList
  }
}