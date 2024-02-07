<template>
  <el-row >
    <el-col :span="18">
      <Origin :originData="receivedVariable" :explainData="receivedExplainVariable"/>
    </el-col>
    <el-col :span="6">
      <el-container class="container">
          <el-header style="border: none; height: 5%; background-color: #FFFFFF; border-bottom: #000000 2px solid;">
            <el-col :span="24">
              <div class="m-header">
              <span class="span-header">Explanation Details</span>
            </div>
            </el-col>
          </el-header>
          <el-main style="background-color: #FAFAFA;">
            <el-row style="height: 41%;">
              <el-col :span="24" style="width: 100%;">
                <el-table :data="tableData_1" stripe style="width: 95%" :highlight-current-row="true" :row-style="{height:'20px'}" :cell-style="{fontSize:'1vw', textAlign: 'center'}"
              :header-cell-style="{fontSize:'1.2vw' , color: 'black', textAlign: 'center'}">
                <!-- <el-table-column prop="status" label="Status" width="100">
                  <template #default="scope">
                    <span>
                      <i class="dotClass" style="background-color: #67C23A"></i>
                    </span>
                  </template>
                </el-table-column>> -->
                <el-table-column prop="id" label="ID" width="45" />
                <el-table-column prop="label" label="Label" width="90" />
                <el-table-column prop="size" label="Size" width="60"/>
                <el-table-column label="Detail" width="70">
                    <template #default="scope">
                      <el-button type="primary" plain style="width: 100%;">Detail</el-button>
                    </template>
              </el-table-column>
              </el-table>
              </el-col>
            </el-row>
            <el-row style="height: 5vh; width: 100%;">
              <el-col :span="24" style="width: 100%;">
                <div class="d-header">
                  <span class="span-header">Baseline Explanations</span> 
                </div>
              </el-col>
            </el-row>
            <el-row style="height: 5%; margin-top: 5px; margin-bottom: 5px;">
              <el-col :span="8" style="width: 100%">
                <el-button type="primary" @click="showAlgorithm('subgraphx')" style="font-family: 'Times New Roman', Times, serif; color:black; width: 95%; margin: auto; font-weight: bold;" plain>
                <span style="font-size: 0.8vw; font-weight: bold; vertical-align: middle;"> SubgraphX </span></el-button>
              </el-col>
              <el-col :span="8" style="width: 100%">
                <el-button type="primary" @click="showAlgorithm('gnnexp')" style="font-family: 'Times New Roman', Times, serif; color:black; width: 95%; margin: auto; font-weight: bold;" plain>
                <span style="font-size: 0.8vw; font-weight: bold; vertical-align: middle;"> GNNExplainer </span></el-button>
              </el-col>
              <el-col :span="8" style="width: 100%">
                <el-button type="primary" @click="showAlgorithm('gstarx')" style="font-family: 'Times New Roman', Times, serif; color:black; width: 95%; margin: auto; font-weight: bold;" plain>
                <span style="font-size: 0.8vw; font-weight: bold; vertical-align: middle;"> GstarX </span></el-button>
              </el-col>
            </el-row>
            <el-row style="height: 45%; width:100%">
              <el-col :span="24">
                  <el-row style="height: 40%;">
                    <el-col :span="24" style="width: 100%; height: 100%;">
                      <div class="origin-graph" style="width: 100%;" id="origin">
                      </div>  
                    </el-col>

                  </el-row>
                  <el-row style="height: 5%;">
                    <el-col  :span="24" style="width: 100%; height: 100%;">
                      <el-divider style="border-top: 1px solid black;"/>
                    </el-col>
                  </el-row>
                  <el-row style="height: 40%;">
                    <el-col :span="24" style="width: 100%; height: 100%;">
                      <div class="explain-graph" style="width: 100%;" id="explain">
                      </div> 
                    </el-col>
                  </el-row>
              </el-col>

            </el-row>
          </el-main>
        </el-container>
    </el-col>
  </el-row>
</template>

<script setup>
  import Origin from '@/components/Origin.vue'
  import { defineProps, reactive, watch } from 'vue';
  import axios from 'axios'
  import * as echarts from 'echarts';
  let tableData_1 = reactive([])
  const tableData = [
  {
    id: 1,
    label: 'Mutagen',
    socre: 1.53,
    size: 13
  },
  {
    id: 2,
    label: 'Mutagen',
    socre: 1.36,
    size: 11
  },
  {
    id: 3,
    label: 'Mutagen',
    socre: 1.14,
    size: 13
  },  
  {
    id: 4,
    label: 'Mutagen',
    socre: 0.97,
    size: 13
  },  
  {
    id: 5,
    label: 'Mutagen',
    socre: 0.86,
    size: 13
  }
]

  const props = defineProps({
    receivedVariable: String,
    receivedExplainVariable: Object
  });

  watch(() => props.receivedExplainVariable['budget'], (value) => {
    console.log('change list')
    tableData_1.splice(0, tableData_1.length, ...tableData);
    console.log(tableData_1)
  })

  const clearChild = () => {

  }

  const displayExplain = (show_data) => {
    console.log(show_data)
    const categoryMap = ["#E49D1C","#FF5357","brown",'#90BEE0',"#4970C6","#29A329","#F0EA00", '#A9A9A9',
                          '#EDDDC3', "#A97AD8", '#4B74B2', '#BA55D3', '#7B68EE', '#DAA520']
        const data_show_nodes = parseInt(show_data['show_nodes']);
        const category = show_data['category'];
        const node_list = Array.from({ length: data_show_nodes }, (_, index) => ({ id: index, category: category[index]}));
        const edge_index = show_data['show_edges'];
        const edge_list = [];
        const len = edge_index[0].length;
        for (let j = 0; j < len; j++) {
          edge_list.push({ 'source': edge_index[0][j], 'target': edge_index[1][j]});
        }
      
        const chartContainer = document.createElement('div');
        chartContainer.id = 'explainGraph_baselines';
        chartContainer.style.width = '90%';
        chartContainer.style.height = '15vh'; // 设置图表容器高度
        chartContainer.style.display = 'inline-block';
        document.getElementById('origin').appendChild(chartContainer);

        // 使用ECharts渲染图表
        const chart = echarts.init(chartContainer);
        const option = {
          series: [
            {
              type: 'graph',
              layout: 'force',
              data: node_list,
              links: edge_list,
              emphasis: {
                focus: 'adjacency',
                label: {
                  show: true,
                  position: 'right',
                  fontSize: 16
                }
              },
              roam: true,
              force: {
                repulsion: 10
              },
              animation: true,
              itemStyle: {
                // 设置节点颜色、边框颜色等样式
                color: function(params) {
                  const category = params.data.category;
                  return categoryMap[category] || 'gray';
                },
                borderColor: '#000',
                borderWidth: 2,
                symbolSize: 40
              },
              label: {
                show: true,
                position: 'inside',
                fontSize: 20
              },
            }
          ]
        };
        chart.setOption(option);                            
  }

  const showAlgorithm = (algorithm_name) => {
    console.log(algorithm_name)
    axios.post('http://localhost:5000/baselines', {algorithm_name: algorithm_name})
    .then(response => {
      // 处理后端的响应数据
      const categoryMap = ["#E49D1C","#FF5357","brown",'#90BEE0',"#4970C6","#29A329","#F0EA00", '#A9A9A9',
                          '#EDDDC3', "#A97AD8", '#4B74B2', '#BA55D3', '#7B68EE', '#DAA520']
      const show_data = response.data
      const data_show_nodes = parseInt(show_data[0]['show_nodes']);
        const category = show_data[0]['category'];
        const node_list = Array.from({ length: data_show_nodes }, (_, index) => ({ id: index, category: category[index]}));
        const edge_index = show_data[0]['show_edges'];
        const edge_list = [];
        const len = edge_index[0].length;
        for (let j = 0; j < len; j++) {
          edge_list.push({ 'source': edge_index[0][j], 'target': edge_index[1][j]});
        }
      
        const chartContainer = document.createElement('div');
        chartContainer.id = 'originGraph';
        chartContainer.style.width = '98%';
        chartContainer.style.height = '15vh'; // 设置图表容器高度
        chartContainer.style.display = 'inline-block';
        while (document.getElementById('origin').firstChild) {
          document.getElementById('origin').removeChild(document.getElementById('origin').firstChild);
        }
        document.getElementById('origin').appendChild(chartContainer);

        // 使用ECharts渲染图表
        const chart = echarts.init(chartContainer);
        const option = {
          series: [
            {
              type: 'graph',
              layout: 'force',
              data: node_list,
              links: edge_list,
              emphasis: {
                focus: 'adjacency',
                label: {
                  show: true,
                  position: 'right',
                  fontSize: 16
                }
              },
              roam: true,
              force: {
                repulsion: 5
              },
              animation: true,
              itemStyle: {
                // 设置节点颜色、边框颜色等样式
                color: function(params) {
                  const category = params.data.category;
                  return categoryMap[category] || 'gray';
                },
                borderColor: '#000',
                borderWidth: 2,
                symbolSize: 40
              },
              label: {
                show: true,
                position: 'inside',
                fontSize: 20
              },
            }
          ]
        };
        chart.setOption(option);
        displayExplain(show_data[1])
    })
    .catch(error => {
      // 处理请求错误
      alert('Please support the algorithm first')
      console.error(error);
    });
  }




</script>

<style scoped>
  .container{
    border-right: #606266 4px solid;
  }
  .m-header{
    height: 4.6vh;
    width:100%;
    text-align: center;
    line-height: 4.6vh;
    background-color: #F2F3F5;
    /* border-right: #000000 1px solid; */
  }
  .d-header{
    width:100%;
    height: 100%;
    text-align: center;
    line-height: 100%;
    background-color: #F2F3F5;
    /* border-right: #000000 2px solid; */
    border-bottom: #000000 2px solid;
  }

  .span-header{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 100%;
    height: 100%;
    font-family: 'Times New Roman', Times, serif; 
    font-weight: bold;  
    font-size: 1.7vw;
    line-height: 100%;
    margin: auto
  }
  .dotClass {
    width:12px;
    height:12px;
    border-radius: 50%;
    display: block;
    margin-left: 30px;  
  }

  /* .explain-graph{
    height: 95%;
    width: 99%;
    margin: 10px auto;
    background-color: #F2F3F5;
    border: #000000 2px solid;
    border-radius: 10px;
    overflow: hidden;
  } */
</style>
```
