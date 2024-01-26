<template>
  <div>
    <el-row style="height: 575px; ">
      <el-card class="box-card no-shadow" style="height: 575px; margin-top:5px; margin-bottom: 10px; background-color: #F2F3F5;">
        <template #header>
          <div class="card-header">
            <span class="span-header" style="font-size: 30px; margin-left: 40px;">Quantitative Statistics</span>
            <el-icon><Menu/></el-icon>
          </div>
        </template>
        <el-row style="height: 25px;">
              <div class="d-header">
                <span class="span-header">Atom Percentage</span> 
              </div>
            </el-row>
        <el-row style="height: 220px;">
            <div id="static">
              
            </div>
          </el-row>
          <el-row style="height: 25px;">
              <div class="d-header">
                <span class="span-header">Pattern Percentage</span> 
              </div>
            </el-row>
        <el-row style="height: 220px;">
            <div  id="pattern-static">
              
            </div>
        </el-row>
      </el-card>
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
    chartContainer.style.width = '400px';
    chartContainer.style.height = '220px'; // 设置图表容器高度
    chartContainer.style.display = 'inline-block';
    document.getElementById('static').appendChild(chartContainer);

    const patternContainer = document.createElement('div');
    patternContainer.id = 'staticGraph2';
    patternContainer.style.width = '400px';
    patternContainer.style.height = '220px'; // 设置图表容器高度
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
            "fontSize": 18 }}
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
            "fontSize": 18 }}
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
    height: 25px;
    width:99.5%;
    text-align: center;
    line-height: 25px;
    background-color: #F2F3F5;
    border: #000000 2px solid;
  }
  .span-header{
    font-family: 'Times New Roman', Times, serif; 
    font-weight: bold;  
    font-size: 30px;
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
    height: 20px;
  }

  .span-header{
    font-family: 'Times New Roman', Times, serif; 
    font-weight: bold;  
    font-size: 24px;
  }


</style>