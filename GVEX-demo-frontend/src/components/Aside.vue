<template>
  <el-row style="height: 25%; border-bottom: #606266 2px solid;" class="custom-row">
  <el-container style="height: 100%;">
    <el-header class="aside-header">
      <span style="font-size: 1.7vw; font-weight: bold; height: 100%; padding: 0; display: flex;justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */"> Graph Datasets </span>
    </el-header>
    <el-main class="aside-main">
      <el-row style="height: 33%;" class="custom-row">
          <el-button type="primary" @click="addDataset('Mutagenicity')" plain style="width: 40%; margin: auto">
            <span style="font-size: 1.3vw; font-weight: bold; vertical-align: middle;">MUT</span>
          </el-button>           
          <el-button type="primary" @click="addDataset('REDDIE-BINARY')" plain style="width: 40%; margin: auto">
            <span style="font-size: 1.3vw; font-weight: bold; vertical-align: middle;"> RED </span>
          </el-button>
      </el-row>
      <el-row style="height: 33%;" class="custom-row">
          <el-button type="primary" @click="addDataset('ENZYMES')" plain style="width: 40%; margin: auto ">
            <span style="font-size: 1.3vw; font-weight: bold; vertical-align: middle;"> ENZ </span>
          </el-button>
          <el-button type="primary" @click="addDataset('MALNET-TINY')" plain style="width: 40%; margin: auto "> 
            <span style="font-size: 1.3vw; font-weight: bold; vertical-align: middle;"> MAL </span>
          </el-button>
      </el-row>
      <el-row style="height: 33%;" class="custom-row">
          <el-button type="primary" @click="addDataset('PCQ')" plain style="width: 40%; margin: auto ">
            <span style="font-size: 1.3vw; font-weight: bold; vertical-align: middle;"> PCQ </span>
          </el-button>
          <el-button type="primary" @click="addDataset('SYN')" plain style="width: 40%; margin: auto ">
            <span style="font-size: 1.3vw; font-weight: bold; vertical-align: middle;"> SYN </span>
          </el-button>
      </el-row>
    </el-main>
  </el-container>
</el-row>

  <el-row style="height: 75%;">
    <el-container>
      <el-header class="aside-header">
        <span style="font-size: 1.7vw; font-weight: bold; height: 100%; padding: 0; display: flex;justify-content: center; /* 水平居中 */
        align-items: center;"> Algorithm Settings </span>
      </el-header>
      <el-main class="aside-main">
        <el-row style="height: 8%;">
            <el-button type="warning" @click="addAlgorithm('AG')" style="font-family: 'Times New Roman', Times, serif; color:black; width: 90%; margin: auto; font-weight: bold; ">
              <span style="font-size: 1.5vw; font-weight: bold; vertical-align: middle;"> ApproxGVEX </span> </el-button>
        </el-row>
        <el-row style="height: 8%;">
            <el-button type="danger" @click="showAlgorithm('SG')" style="font-family: 'Times New Roman', Times, serif; color:black; width: 90%; margin: auto; font-weight: bold;">
            <span style="font-size: 1.5vw; font-weight: bold; vertical-align: middle;"> StreamGVEX </span></el-button>
        </el-row>
        <el-row style="margin-top: 1vh; height: 52%;">
          <el-col :span="24" style="height: 100%;" class="custom-col">
            <el-form :model="form" label-width="6vw" size="large" style="text-align: center; font-weight: bold; font-family: 'Times New Roman', Times, serif; border: #f3d19e 3px solid; width: 96%;">
              <el-form-item label="Budget" class="custom-form-item">
                <el-input v-model="form.budget" style="width: 90%; height: 5vh;" />
              </el-form-item>
              <el-form-item label="Classes" class="custom-form-item">
                  <!-- <el-button @click="openNestedForm" style="olor: #606266;" size="small">Ratio</el-button> -->
                  <el-button @click="openNestedForm" size="small" type="info" style="color: white;" :icon="Edit" circle />
              </el-form-item>
              <el-form-item label="Influence" class="custom-form-item">
                <el-input v-model="form.influence" style="width: 90%; height: 5vh;"/>
              </el-form-item>
              <el-form-item label="Diversity" class="custom-form-item">
                <el-input v-model="form.diversity" style="width: 90%; height: 5vh;"/>
              </el-form-item>
              <el-form-item label="Balance" class="custom-form-item">
                <el-input v-model="form.gamma" style="width: 90%; height: 5vh;"/>
              </el-form-item>
            </el-form>
          </el-col>
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
        <!-- <el-row style="height: 16%;">
          <el-col :span="24" style="height: 100%;" class="custom-col">
            <el-progress type="dashboard" :percentage="percentage" :color="colors" style="padding-left: auto">
              <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}%</span>
              </template>
            </el-progress>
            <el-button-group style="padding-left: auto">
              <el-button :icon="Minus" @click="decrease" />
              <el-button :icon="Plus" @click="increase" />
            </el-button-group>
          </el-col>
        </el-row> -->
        <el-row style="height: 20%;">
          <el-button type="primary" @click="showOrigin()" style="font-family: 'Times New Roman', Times, serif; color:#FFFFFF; width: 200px; margin: auto; margin-top: 20px; font-weight: bold;"
          ><span style="font-size: 1.5vw; font-weight: bold; vertical-align: middle;"> Show </span></el-button>
          
          <el-button type="success" @click="generateResult()" style="font-family: 'Times New Roman', Times, serif; color:#FFFFFF; width: 200px; margin: auto; margin-top: 20px; font-weight: bold;"
          ><span style="font-size: 1.5vw; font-weight: bold; vertical-align: middle;"> Generate </span></el-button>
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
    if (dataset != "Mutagenicity") {
      alert("Please use MUT dataset for demonstration.")
    } 
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
.aside-header {
  border: none;
  height: 5vh; 
  border-bottom: #333 2px solid;
}

.aside-main {
  background-color: #f2f3f5;
  color: #333;
  height: 16vh;
  width: 100%;
}

.custom-row {
  margin-left: 0;
  margin-right: 0;
}

.custom-col {
  margin: 0;
}

.el-button {
  margin-left: 0; 
  margin-right: 0; 
  padding-top: auto; 
  color: #337ecc;
}

.custom-form-item {
  margin-top: 0.6vh;
  height: 3.2vh !important;
  font-weight: bold; 
}

.demo-progress .percentage-value {
  margin-top: 1.5vw; 
  margin-left: 4vw; 
  font-size: 3.5vw;
}

</style>
