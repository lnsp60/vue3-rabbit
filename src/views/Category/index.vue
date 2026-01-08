<script setup>
import { getCategoryAPI } from "@/apis/category.js"
import { ref,onMounted,watch } from 'vue'
import { useRoute } from 'vue-router'
// 导入 VueRouter 的 useRoute 函数，
// 作用是获取当前页面的路由信息（比如路由地址、路由参数 id 等）

//后端给了数字(category.js) → 前端循环渲染成链接(RouterLink) → 路由配置识别并接收数字(index.js) → 组件拿到数字请求数据
const categoryData = ref({})
const route = useRoute()
const getCategory = async() => {
  const res = await getCategoryAPI(route.params.id)
  categoryData.value = res.result
}
onMounted(()=>getCategory())

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
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>