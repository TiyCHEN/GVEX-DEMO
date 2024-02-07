<template>
  <div>
    <el-row style="height: 43vh">
      <el-col :span="24" style="width: 100%;">
        <el-card class="box-card no-shadow" style="height: 100%; background-color: #F2F3F5;">
        <template #header>
          <div class="card-header">
            <span class="span-header" style="font-size: 1.7vw;">Statistics</span>
          </div>
        </template>
        <el-row style="height: 4.3vh;">
              <div class="d-header">
                <span class="span-header" style="font-size: 1.2vw;">Atom</span> 
              </div>
        </el-row>
        <el-row style="height: 15vh;">
          <el-col :span="24" style="width: 100%;">
            <div id="static">
            </div>
          </el-col>

        </el-row>
          <el-row style="height: 4.3vh;">
              <div class="d-header" >
                <span class="span-header" style="font-size: 1.2vw;">Pattern</span> 
              </div>
            </el-row>
        <el-row style="height: 10vh">
            <el-col :span="24" style="width: 100%;">
              <div  id="pattern-static">
              </div>
            </el-col>
        </el-row>
      </el-card>
      </el-col>

    </el-row>
    <!-- <el-divider>
    </el-divider> -->
    <!-- <el-row style="height: 200px; margin-top:30px">
      <el-card class="box-card no-shadow" style="height: 200px; background-color: #F2F3F5; ">
        <template #header>
          <div class="card-header">
            <span class="span-header">Query Console</span>
            <el-icon><Menu/></el-icon>
          </div>
        </template>
      </el-card>
    </el-row> -->
  </div>

</template>

<script setup>
  import {Menu, StarFilled} from '@element-plus/icons-vue'
  import { defineProps, reactive, watch, ref} from 'vue';
  import * as echarts from 'echarts';
  const props = defineProps({
    staticData: Object
  });

  
  const showStatic = (data) => {
    console.log('hh')
    console.log(data)
    let labels_num = [0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0] 
    let other_num = 0
    for (let i = 0; i < data.length; i++) {
      other_num += data[i]['show_nodes']
      for (let j = 0; j < data[i]['category'].length; j++){
        labels_num[data[i]['category'][j]] += 1
        console.log(labels_num[data[i]['category'][j]])
      }
    }
    other_num -= (labels_num[0] + labels_num[1] + labels_num[3] + labels_num[4])
    const chartContainer = document.createElement('div');
    chartContainer.id = 'staticGraph1';
    chartContainer.style.width = '100%';
    chartContainer.style.height = '15vh'; // 设置图表容器高度
    chartContainer.style.display = 'inline-block';
    document.getElementById('static').appendChild(chartContainer);

    const patternContainer = document.createElement('div');
    patternContainer.id = 'staticGraph2';
    patternContainer.style.width = '100%';
    patternContainer.style.height = '15vh'; // 设置图表容器高度
    patternContainer.style.display = 'inline-block';
    document.getElementById('pattern-static').appendChild(patternContainer);

    // 使用ECharts渲染图表
    const chart = echarts.init(chartContainer);
    const patternChart = echarts.init(patternContainer);
  
    const option = {
      series: [
        {
          type: 'pie',
        data: [
            {
              value: labels_num[3],
              name: 'Hydrogen'
            },
            {
              value: labels_num[4],
              name: 'Nitrogen'
            },
            {
              value: labels_num[0],
              name: 'Carbon'
            },
            {
              value: labels_num[1],
              name: 'Oxygen'
            },
            {
              value: other_num,
              name: 'Other'
            }
          ],
          label: {
            "normal": {
            "show": true,
            "textStyle": {
            "fontSize": 10 }}
          },
          radius: '60%'
        }
      ]
    };
    chart.setOption(option);

    const patternOption = {
      series: [
        {
          type: 'pie',
        data: [
            {
              value: 1,
              name: 'NO₂',
              itemStyle: {color:'#FF0033'}
            },
            {
              value: 4,
              name: 'NH₂',
              itemStyle: {color:'#333399'}
            },
            {
              value: 5,
              name: 'C-Rring',
              itemStyle: {color:'#CCCC00'}
            },
          ],
          label: {
            "normal": {
            "show": true,
            "textStyle": {
            "fontSize": 10 }}
          },
          radius: '60%'
        }
      ]
    };
    patternChart.setOption(patternOption);
    
  }

  watch(() => props.staticData['length'], (newVal) => {
    showStatic(props.staticData['data'])
  })
</script>

<style scoped>
  .container{
    height: 90%;
    width: 80%;
    border-right: #606266 4px solid;
  }
  .m-header{
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #F2F3F5;
    border: none;
  }
  .d-header{
    height: 80%;
    width:98%;
    text-align: center;
    line-height: 100%;
    background-color: #F2F3F5;
    border: #000000 1px solid;
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
  .box-card.no-shadow {
    box-shadow: none; /* 移除阴影 */
  }

  .box-card {
    width: 98%; /* 占据100%宽度 */
    padding: 0; /* 移除内边距 */
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10px;
  }

  .span-header{
    font-family: 'Times New Roman', Times, serif; 
    font-weight: bold;  
    font-size: 1.7vw;
  }

  .el-card{
    --el-card-padding: 10px !important;
  }


</style>
