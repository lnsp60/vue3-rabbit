<script setup>
import { getDetail } from "@/apis/detail"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { ElMessage } from 'element-plus'

const goods = ref({})
const loading = ref(true)
// 获取路由实例
const route = useRoute()

// 获取商品详情的核心函数
const getGoods = async () => {
  try {
    loading.value = true
    // 1. 提取路由中的商品ID
    let goodsId = route.params.id
    // 2. 强制转成数字，避免字符串ID导致400
    goodsId = Number(goodsId)
    
    // 3. 校验ID是否有效
    if (isNaN(goodsId) || goodsId <= 0) {
      ElMessage.error('无效的商品ID，请检查访问链接')
      return
    }

    // 4. 调用接口（传入纯数字ID）
    const res = await getDetail(goodsId)
    
    // 5. 校验接口返回数据
    if (res.code !== 200 || !res.result) {
      ElMessage.error('商品详情加载失败')
      return
    }
    goods.value = res.result
  } catch (error) {
    ElMessage.error(`请求失败：${error.message}`)
    console.error('接口错误详情：', error)
  } finally {
    loading.value = false
  }
}

// 页面挂载后执行
onMounted(() => getGoods())
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="!loading && goods.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item 
            v-if="goods.categories?.[1]?.id" 
            :to="{ path: `/category/${goods.categories[1].id}` }"
          >
            {{ goods.categories[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item 
            v-if="goods.categories?.[0]?.id" 
            :to="{ path: `/category/sub/${goods.categories[0].id}` }"
          >
            {{ goods.categories[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ goods.name || '商品详情' }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div v-else class="loading">加载中...</div>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 100px 0;
  color: #666;
}
</style>