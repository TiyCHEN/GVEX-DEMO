<template>
  <el-container class="container">
    <el-header style="border: none; height: 42px; background-color: #FFFFFF; border-bottom: #000000 2px solid;">
      <el-col :span="24">
        <div class="m-header">
          <span class="span-header">Input Graphs</span> 
        </div>
      </el-col>
    </el-header>
    <el-main style="background-color: #FAFAFA;">
      <el-row style="height: 600px; border-bottom: #606266 4px solid;">
        <el-col :span="19">
          <!-- <el-pagination background layout="prev, pager, next" :total="20" style="margin: 3px;"/> -->
          <div class="main-page">
          </div>
        </el-col>
        <el-col :span="5">
          <div class="type-page">
            <el-card class="box-card no-shadow" style="height: 565px; background-color: #F2F3F5;">
              <template #header>
                <div class="card-header">
                  <span class="span-header">Dataset Information</span>
                  <el-icon><Menu /></el-icon>
                </div>
              </template>
              <div class="text item"><span style="font-weight: bold; font-size: 24px;">Dataset Name:</span> <span style="margin-left: 3px;font-size: 22px;">{{ dataset_info.dataset_name}}</span></div>
              <div class="text item"><span style="font-weight: bold; font-size: 24px;">Nodes (avg.):</span><span style="margin-left: 3px;font-size: 22px;">{{ dataset_info.nodes}}</span></div>
              <div class="text item"><span style="font-weight: bold; font-size: 24px;">Edges (avg.):</span><span style="margin-left: 3px;font-size: 22px;">{{ dataset_info.edges}}</span></div>
              <div class="text item"><span style="font-weight: bold; font-size: 24px;">Classes:</span><span style="margin-left: 3px;font-size: 22px;">{{ dataset_info.classes}}</span></div>
              <div class="text item"><span style="font-weight: bold; font-size: 24px;">Domain: </span><span style="margin-left: 3px;font-size: 22px;">{{ dataset_info.domain}}</span></div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row style="height: 600px;">
        <el-col :span="18">
          <el-row style="height: 40px;">
            <div class="d-header">
              <span class="span-header">Explanation Views</span> 
            </div>
          </el-row>
          <el-row style="height: 560px;">
            <div class="explain-page" id="explain">
              <el-row style="height: 180px;">
                <div class="explain-pattern-page" id="explain-pattern">
                </div>             
              </el-row>
              <el-divider style="border-top: 1px solid black;"/>
              <el-row style="height: 320px;">
                <div class="explain-subgraph-page" id="explain-subgraph">
                </div>
              </el-row>
            </div>
          </el-row>

        </el-col>
        <el-col :span="6">
            <Statistic :staticData="staticData"/>
        </el-col>        
      </el-row>
    </el-main>
 
  </el-container>
</template>



<script setup>
  // const dataset_name = ref("Mutagenicity")
  import {Menu, StarFilled} from '@element-plus/icons-vue'
  import Statistic from '@/components/Statistic.vue'
  import { defineProps, reactive, watch, ref, computed} from 'vue';
  import axios from 'axios'
  import * as echarts from 'echarts';

  const currentPage = ref(1); // 当前页数
  const props = defineProps({
    originData: String,
    explainData: Object
  });

  const dataset_info = reactive({
    dataset_name: '',
    nodes: '',
    edges: '',
    classes: '',
    domain: ''
  })

  const staticData = reactive({
    length: 0,
    data: Object
  })
  const graphDataList = reactive([])

  let show_graphs = reactive([])


  const explainGraph = reactive([])
  
  const renderGraphs = () => {
    console.log(graphDataList)
    const categoryMap = ["#E49D1C","#FF5357","brown",'#90BEE0',"#4970C6","#29A329","#F0EA00", '#A9A9A9',
                          '#EDDDC3', "#A97AD8", '#4B74B2', '#BA55D3', '#7B68EE', '#DAA520']
    graphDataList.forEach((data, index) => {
      const chart = echarts.init(document.getElementById('graph' + index));
      const option = {
        series: [
          {
            type: 'graph',
            layout: 'force',
            data: data.nodes,
            links: data.links,
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
              repulsion: 50
            },
            animation: true, // 启用动画效果
            itemStyle: {
              color: function(params) {
                const category = params.data.category;
                return categoryMap[category] || 'gray'; // 默认颜色
              },
              borderColor: '#000', // 节点边框颜色
              borderWidth: 2, // 节点边框宽度
              symbolSize: 40 // 节点大小  
            },
            label: {
                  show: true,
                  position: 'inside', // 节点标签位置
                  fontSize: 20
            },
          }
        ]
      };
      chart.setOption(option);
    });
  };

  const clearChild = () => {
    const main_page = document.querySelector('.main-page')
    while (main_page.firstChild) {
      main_page.removeChild(main_page.firstChild)
    }
  }

  const renderOrigin = (graph_set, idx) => {
    const length = graph_set.length
    const categoryMap = ["#E49D1C","#FF5357","brown",'#90BEE0',"#4970C6","#29A329","#F0EA00", '#A9A9A9',
                          '#EDDDC3', "#A97AD8", '#4B74B2', '#BA55D3', '#7B68EE', '#DAA520']
    for (let i = 0; i < length; i++) {
      const data_show_nodes = parseInt(graph_set[i]['show_nodes']);
      const category = graph_set[i]['category'];
      const node_list = Array.from({ length: data_show_nodes }, (_, index) => ({ id: index, category: category[index]}));
      const edge_index = graph_set[i]['show_edges'];
      const edge_list = [];
      const len = edge_index[0].length;
      for (let j = 0; j < len; j++) {
        edge_list.push({ 'source': edge_index[0][j], 'target': edge_index[1][j]});
      }
    
      const chartContainer = document.createElement('div');
      chartContainer.id = 'originGraph' + idx + '-' + i;
      console.log(chartContainer.id)
      // chartContainer.style.width = sigle_length + '%';
      chartContainer.style.width = '180px';
      chartContainer.style.height = '210px'; // 设置图表容器高度
      chartContainer.style.display = 'inline-block';
      const set_name = '.main-page-' + idx
      console.log(set_name)
      document.querySelector('.main-page').appendChild(chartContainer);

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
                fontSize: 5
              }
            },
            roam: true,
            force: {
              repulsion: 15
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
              symbolSize: 5
            },
            label: {
              show: true,
              position: 'inside',
              fontSize: 5
            },
          }
        ]
      };
      chart.setOption(option);
    }
  }

  const displayOrigin = () => {
    const current_graphs = show_graphs.slice((currentPage.value - 1) * 14, currentPage.value * 14)
    const current_graphs_1 = current_graphs.slice(0, 7)
    const current_graphs_2 = current_graphs.slice(7, 14)
    clearChild()
    console.log(current_graphs)
    renderOrigin(current_graphs_1, 1)
    renderOrigin(current_graphs_2, 2)
  }
  
  const getDatasetInfo = (dataset_name) => {
    console.log('getDatasetInfo')
    console.log(dataset_name)
    axios.post('http://localhost:5000/getdataset', {dataset_name: dataset_name})
    .then(response => {
      // 处理后端的响应数据
      dataset_info.dataset_name = response.data['dataset_name'];
      dataset_info.nodes = parseInt(response.data['num_nodes']);
      dataset_info.edges = parseInt(response.data['num_edges']);
      dataset_info.classes = response.data['num_classes'];
      dataset_info.domain = response.data['domain'];
      show_graphs = response.data['show_graphs'];
      displayOrigin()
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }

  const getExplain = (explain_config) => {
    axios.post('http://localhost:5000/config', explain_config)
    .then(response => {
      // 处理后端的响应数据
      console.log(response.data)
      let subgraph_data = response.data[0]
      let pattern_data = response.data[1]
      const length = subgraph_data.length
      staticData.length = response.data[0].length
      staticData.data = response.data[0]
      const categoryMap = ["#E49D1C","#FF5357","brown",'#90BEE0',"#4970C6","#29A329","#F0EA00", '#A9A9A9',
                          '#EDDDC3', "#A97AD8", '#4B74B2', '#BA55D3', '#7B68EE', '#DAA520']
      for (let i = 0; i < length; i++) {
        // explainGraph.push(response.data[i])
        const data_show_nodes = parseInt(subgraph_data[i]['show_nodes']);
        const category = subgraph_data[i]['category'];
        const node_list = Array.from({ length: data_show_nodes }, (_, index) => ({ id: index, category: category[index]}));
        const edge_index = subgraph_data[i]['show_edges'];
        const edge_list = [];
        const len = edge_index[0].length;
        for (let j = 0; j < len; j++) {
          edge_list.push({ 'source': edge_index[0][j], 'target': edge_index[1][j]});
        }
        explainGraph.push({nodes: node_list, links: edge_list})
      
        const chartContainer = document.createElement('div');
        chartContainer.id = 'explainGraph' + i;
        const sigle_length = 100 / length;
        chartContainer.style.width = sigle_length + '%';
        chartContainer.style.height = '220px'; // 设置图表容器高度
        chartContainer.style.display = 'inline-block';
        document.getElementById('explain-subgraph').appendChild(chartContainer);

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
                repulsion: 50
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
      const pattern_length = pattern_data.length
      for (let i = 0; i < pattern_length; i++) {
        // explainGraph.push(response.data[i])
        const data_show_nodes = parseInt(pattern_data[i]['show_nodes']);
        const category = pattern_data[i]['category'];
        const node_list = Array.from({ length: data_show_nodes }, (_, index) => ({ id: index, category: category[index]}));
        const edge_index = pattern_data[i]['show_edges'];
        const edge_list = [];
        const len = edge_index[0].length;
        for (let j = 0; j < len; j++) {
          edge_list.push({ 'source': edge_index[0][j], 'target': edge_index[1][j]});
        }
        // explainGraph.push({nodes: node_list, links: edge_list})
      
        const chartContainer = document.createElement('div');
        chartContainer.id = 'explainPattern' + i;
        const sigle_length = 100 / length;
        chartContainer.style.width = sigle_length + '%';
        chartContainer.style.height = '140px'; // 设置图表容器高度
        chartContainer.style.display = 'inline-block';
        document.getElementById('explain-pattern').appendChild(chartContainer);

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
                repulsion: 150
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

    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }


  watch(() => props.originData, (newVal) => {
    // 在属性变化时触发你想要执行的函数
    console.log('Origin Data changed to', newVal);
    // 在这里执行你的新函数
    getDatasetInfo(newVal);

  });

  watch(() => props.explainData['budget'], (newVal) => {
    getExplain(props.explainData)
  })
</script>

<style scoped>
  .container{
    height: 94.2vh;
    border-right: #606266 4px solid;
  }
  /* .m-header{
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #F2F3F5;
    border-right: #000000 2px solid;
  } */

  .m-header{
    height: 40px;
    width:100%;
    text-align: center;
    line-height: 40px;
    background-color: #F2F3F5;
    /* border-right: #000000 2px solid; */
    border-bottom: #000000 2px solid;
  }

  .d-header{
    height: 40px;
    width:99.5%;
    text-align: center;
    line-height: 40px;
    background-color: #F2F3F5;
    border-right: #000000 2px solid;
    border-bottom: #000000 2px solid;
  }
  .span-header{
    font-family: 'Times New Roman', Times, serif; 
    font-weight: bold;  
    font-size: 30px;
  }
  .main-page{
    margin:10px 4px;
    height: 95%;
    width: 99%;
    background-color: #F2F3F5;
    border: #000000 2px solid;
    border-radius: 10px;
  }

  .main-page-1{
    margin:4px auto;
    height: 95%;
    width: 98%;
    background-color: #F2F3F5;
  }
  .main-page-2{
    margin:4px auto;
    height: 95%;
    width: 98%;
    background-color: #F2F3F5;
  }

  .main-page-3{
    margin:4px auto;
    height: 95%;
    width: 98%;
    background-color: #F2F3F5;
  }

  .type-page{
    height: 95%;
    margin: 10px auto;
  }

  .explain-page{
    height: 95%;
    width: 99%;
    margin: 10px auto;
    background-color: #F2F3F5;
    border: #000000 2px solid;
    border-radius: 10px;
    overflow: hidden;
  }
  .explain-pattern-page{
    height: 95%;
    width: 98%;
    margin: 10px auto;
    background-color: #F2F3F5;
    overflow: hidden;
  }

  .explain-subgraph-page{
    height: 95%;
    width: 98%;
    margin: 10px auto;
    background-color: #F2F3F5;
    overflow: hidden;
  }
  
  .statistic-page{
    height: 95%;
    margin: 10px auto;
    background-color: #F2F3F5;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
  }

  .text {
    font-size: 20px;
    height: 80px; /* 设置每个item的高度为40px */
    line-height: 80px; /* 垂直居中文本内容 */
    text-align: left;
    
    font-family: 'Times New Roman', Times, serif;
  }

  .item {
    margin: 10px;
    padding-left: 5px;
    border: #eebe77 3px solid ;
    border-radius: 10px;
    height: 80px;
  }

  .box-card.no-shadow {
    box-shadow: none; /* 移除阴影 */
  }

  .box-card {
    width: 98%; /* 占据100%宽度 */
    padding: 0; /* 移除内边距 */
  }

  .small-text {
    position: absolute;
    top: 0; /* 顶部位置 */
    left: 0; /* 左侧位置 */
    height: 10px;
    font-size: 10px; /* 文字大小 */
    margin: 0; /* 去除默认的外边距 */
    padding: 0; /* 去除默认的内边距 */
  }
</style>