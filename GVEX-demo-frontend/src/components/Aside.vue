<template>
  <el-row style="height: 250px; border-bottom: #606266 2px solid;">
    <el-container>
      <el-header class="aside-header"><el-icon :size="28" style="vertical-align: middle;"><Files /></el-icon> 
        <span style="font-size: 26px; font-weight: bold; vertical-align: middle;"> Graph Datasets </span>
      </el-header>
      <el-main class="aside-main">
        <el-row style="height: 50px; margin-top: 20px;">
          <el-button type="primary" @click="addDataset('Mutagenicity')" plain>
            <span style="font-size: 24px; font-weight: bold; vertical-align: middle;">MUT</span></el-button>
          <el-button type="primary" @click="addDataset('REDDIE-BINARY')" plain>
            <span style="font-size: 24px; font-weight: bold; vertical-align: middle;"> RED </span></el-button>
        </el-row>
        <el-row style="height: 50px;">
          <el-button type="primary" @click="addDataset('ENZYMES')" plain>
            <span style="font-size: 24px; font-weight: bold; vertical-align: middle;"> ENZ </span></el-button>
          <el-button type="primary" @click="addDataset('MALNET-TINY')" plain>
            <span style="font-size: 24px; font-weight: bold; vertical-align: middle;"> MAL </span></el-button>
        </el-row>
        <el-row style="height: 50px;">
          <el-button type="primary" @click="addDataset('PCQ')" plain>
            <span style="font-size: 24px; font-weight: bold; vertical-align: middle;"> PCQ </span></el-button>
          <el-button type="primary" @click="addDataset('SYN')" plain>
            <span style="font-size: 24px; font-weight: bold; vertical-align: middle;"> SYN </span></el-button>
        </el-row>
        <!-- <el-row style="height: 50px;">
          <el-button color="#626aef" style=" margin-top:30px; color:#606266" plain><el-icon><upload-filled /></el-icon>
            <span style="font-size: 24px; font-weight: bold; vertical-align: middle;"> Upload Dataset </span></el-button>
        </el-row> -->
      </el-main>
    </el-container>
  </el-row>

  <el-row style="height: 950px;">
    <el-container>
      <el-header class="aside-header"><el-icon :size="24" style="vertical-align: middle;"><Files /></el-icon> 
        <span style="font-size: 26px; font-weight: bold; vertical-align: middle;"> Algorithm Settings </span>
      </el-header>
      <el-main class="aside-main">
        <el-row style="height: 50px; margin-top: 20px;">
          <el-button type="warning" @click="addAlgorithm('AG')" style="font-family: 'Times New Roman', Times, serif; color:black; width: 200px; margin: auto; font-weight: bold; ">
            <el-icon :size="20" style="vertical-align: middle;"><Tools /></el-icon><span style="font-size: 18px; font-weight: bold; vertical-align: middle;"> 
              <span style="font-size: 26px; font-weight: bold; vertical-align: middle;"> ApproxGVEX </span> </span></el-button>
        </el-row>
        <el-row style="height: 50px;">
          <el-button type="danger" @click="showAlgorithm('SG')" style="font-family: 'Times New Roman', Times, serif; color:black; width: 200px; margin: auto; margin-top: 20px; font-weight: bold;">
            <el-icon :size="20" style="vertical-align: middle;"><Tools /></el-icon><span style="font-size: 18px; font-weight: bold; vertical-align: middle;"> 
              <span style="font-size: 26px; font-weight: bold; vertical-align: middle;"> StreamGVEX </span> </span></el-button>
        </el-row>
        <el-row>
          <el-form :model="form" label-width="90px" class="custom-label" label-position="left" size="large" style="padding: 10px; margin-top: 40px; margin-left: 5px; margin-right: 5px; text-align: left; font-weight: bold; font-family: 'Times New Roman', Times, serif; border: #f3d19e 3px solid;">
            <el-form-item label="Budget">
              <el-input v-model="form.budget" style="width: 110px;"/>
            </el-form-item>
            <el-form-item label="Classes">
                <!-- <el-button @click="openNestedForm" style="olor: #606266;" size="small">Ratio</el-button> -->
                <el-button @click="openNestedForm" size="small" type="info" style="color: white;" :icon="Edit" circle />
            </el-form-item>
            <el-form-item label="Influence">
              <el-input v-model="form.influence" style="width: 110px;"/>
            </el-form-item>
            <el-form-item label="Diversity">
              <el-input v-model="form.diversity" style="width: 110px;"/>
            </el-form-item>
            <el-form-item label="Trade-Off">
              <el-input v-model="form.gamma" style="width: 110px;"/>
            </el-form-item>
          </el-form>
          <el-dialog v-model="dialogVisible">
            <el-form :model="nestedFormData" label-width="80px">
              <el-form-item label="Ratio 1 (%)">
                <el-input v-model="nestedFormData.ratio_1" placeholder="Choose the ratio"></el-input>
              </el-form-item>
              <el-form-item label="Ratio 2 (%)">
                <el-input v-model="nestedFormData.ratio_2" placeholder="Choose the ratio"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveNestedForm">Save</el-button>
                <el-button @click="closeNestedForm">Cancel</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-row>
        <el-row style="height: 150px;">
          <el-progress type="dashboard" :percentage="percentage" :color="colors" style="padding-left: 60px; padding-top: 20px;">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
            </template>
          </el-progress>
          <el-button-group style="padding-left: 15px;">
            <el-button :icon="Minus" @click="decrease" />
            <el-button :icon="Plus" @click="increase" />
          </el-button-group>
          <el-button type="primary" @click="showOrigin()" style="font-family: 'Times New Roman', Times, serif; color:#FFFFFF; width: 200px; margin: auto; margin-top: 20px; font-weight: bold;"
          ><el-icon :size="20" style="vertical-align: middle;"><View /></el-icon><span style="font-size: 26px; font-weight: bold; vertical-align: middle;"> Show </span></el-button>
          
          <el-button type="success" @click="generateResult()" style="font-family: 'Times New Roman', Times, serif; color:#FFFFFF; width: 200px; margin: auto; margin-top: 20px; font-weight: bold;"
          ><el-icon :size="20" style="vertical-align: middle;"><SwitchButton /></el-icon><span style="font-size: 26px; font-weight: bold; vertical-align: middle;"> Generate </span></el-button>
        </el-row>
      </el-main>
    </el-container>
  </el-row>

</template>



<script setup>
  import {Files} from '@element-plus/icons-vue'
  import { ref, reactive } from 'vue'
  import axios from 'axios'
  import { UploadFilled, View, SwitchButton,Tools,Edit, Minus, Plus} from '@element-plus/icons-vue'
  import { defineEmits } from 'vue';

  const emit = defineEmits(['receivedDatasetInfo', 'receivedExplainData']);
  const form = reactive({
    budget: '',
    labels: [],
    influence: '',
    diversity: '',
    gamma: ''
  })

  const label_list = reactive(['1', '2', '3', '4', '5', '6'])

  const percentage = ref(100)

  const config_setting = reactive({
    dataset_name: '',
    algorithm_name: '',
    budget: '',
    labels: [],
    influence: '',
    diversity: '',
    gamma: ''
  })


  const nestedFormData = ref({
    ratio_1: '',
    ratio_2: ''
  });

  const dialogVisible = ref(false);

  const openNestedForm = () => {
    console.log("open nested form")
    dialogVisible.value = true;
    console.log(dialogVisible.value)
  };

  const closeNestedForm = () => {
    dialogVisible.value = false;
    console.log(dialogVisible)
  };

  const saveNestedForm = () => {
    closeNestedForm();
  };

  const colors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 },
  ]

  const addDataset = (dataset) => {
    config_setting.dataset_name = dataset
    console.log(config_setting.dataset_name)
  }

  const addAlgorithm = (algorithm_name) => {
    config_setting.algorithm_name = algorithm_name
    console.log(config_setting.algorithm_name)
  }

  const generateResult = () => {
    config_setting.budget = form.budget
    config_setting.labels = form.labels
    config_setting.influence = form.influence
    config_setting.diversity = form.diversity
    config_setting.gamma = form.gamma

    emit('receivedExplainData', config_setting)
  }

  const showOrigin = () => {
    console.log("show origin");
    // 使用 this.$emit 触发自定义事件，传递 dataset_info 给父组件
    emit('receivedDatasetInfo', config_setting.dataset_name);
  };

  const increase = () => {
    percentage.value += 20
    if (percentage.value > 100) {
      percentage.value = 100
    }
  }
  const decrease = () => {
    percentage.value -= 20
    if (percentage.value < 0) {
      percentage.value = 0
    }
  }
</script>



<style scoped>
  .aside-header{
    border: none;
    height: 60px;
    border-bottom: #333 2px solid;
  }

  .aside-main{
    background-color: #F2F3F5;
    color: #333;
    font-size: 24px;
  }
  .dataset{
    margin-top: 0px;
    border: #333 2px solid;
  }
  
  .el-button{
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 10px;
    color: #337ecc;
    size: "large";
    min-height: 45px;
    min-width: 100px;
    font: 18px bold;
  }
  .custom-label-item .el-form-item__label {
  font-size: 30px !important; /* 覆盖默认样式 */
  font-weight: bold; /* 修改字体粗细 */
}

  .demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
  }
  .demo-progress .el-progress--circle {
    margin-right: 15px;
  }
  .percentage-value {
    display: block;
    margin-top: 10px;
    margin-left: 60px;
    font-size: 28px;
  }

</style>