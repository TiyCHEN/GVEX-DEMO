<template>
  <div>
    <el-container>
      <el-header >
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <Aside @receivedDatasetInfo="receivedDatasetInfoHandler" @receivedExplainData="receivedExplainDataHandler"/>
        </el-aside>
        <el-main>
          <Main :received-variable="receivedDatasetInfo" :received-explain-variable="receivedExplainData"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
  import Header from '@/components/Header.vue'
  import Main from '@/components/Main.vue'
  import Aside from '@/components/Aside.vue'
  import { reactive, ref } from 'vue';

  const receivedDatasetInfo = ref('');
  const receivedExplainData = reactive({
    dataset_name: '',
    algorithm_name: '',
    budget: '',
    labels: [],
    influence: '',
    diversity: '',
    gamma: ''
  })

// 监听来自 Aside 组件的事件，接收传递过来的 dataset_info
  const receivedDatasetInfoHandler = (dataset_info) => {
    receivedDatasetInfo.value = dataset_info
    console.log(receivedDatasetInfo.value)
  }

  const receivedExplainDataHandler = (config_setting) => {
    receivedExplainData.dataset_name = config_setting.dataset_name
    receivedExplainData.algorithm_name = config_setting.algorithm_name
    receivedExplainData.budget = config_setting.budget
    receivedExplainData.influence = config_setting.influence
    receivedExplainData.diversity = config_setting.diversity
    receivedExplainData.gamma = config_setting.gamma
    console.log('hh')
  }

</script>


<style>
.el-header,
.el-aside,
.el-main {
  margin: 0 !important;
  padding: 0 !important;
}

.el-header{
        background-color: #F2F3F5;
        color: #333;
        text-align: center;
        line-height: 60px;
        height:100vh;
        border: #606266;
        border-style:dashed;
        border-width: 2px;
    }

.el-aside {
    background-color: #F2F3F5;
    color: #333;
    text-align: center;
    line-height: 94.2vh;
    border-right: #606266 4px solid;
  }

.el-main {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 160px;
}
body {
  font-family:'Times New Roman', Times, serif;
}
</style>