import httpInstance from "@/utils/http";

export function getBannerAPI(){
  return httpInstance({
    url: '/home/banner'
  })
}

// JSDoc 注释（一种标准化的代码注释格式），作用是说明函数的用途
/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url:'/home/new'
  })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
// export const getHotAPI = () => {
//   return  httpInstance('home/hot', 'get', {})
// }
// 正确写法（home.js）
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot', // 接口路径
    method: 'GET'     // 请求方法（大写/小写都可以，建议大写）
  })
}

export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods', // 接口路径
    method: 'GET'     // 请求方法（大写/小写都可以，建议大写）
  })
}