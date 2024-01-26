<template>
  <el-row>
    <el-col :span="2"><div class="grid-content ep-bg-purple" />
        <span style="font-size: 32px; font-weight: bold;"> GVEX </span>
    </el-col>
    <el-col :span="20"><div class="grid-content ep-bg-purple-light" /></el-col>
    <el-col :span="2"><div class="grid-content ep-bg-purple" />
      <el-icon :size="36" style="vertical-align: middle; padding-left: 70%;"><User /></el-icon>
    </el-col>
  </el-row>
</template>

<script setup>
  import {User} from '@element-plus/icons-vue'
</script>

<style scoped>

</style>