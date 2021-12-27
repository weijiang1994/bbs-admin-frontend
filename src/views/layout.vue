<template>
  <el-container>
    <!-- header部分 -->
    <el-header>
      <navtop></navtop>
    </el-header>
    <el-container>
       <!-- aside部分 -->
      <leftNav :isCollapse="leftMenu.collapse"
               :menuWidth="leftMenu.width"></leftNav>
      
      <el-main>
        <bread @collapse-left="collapseLeft" :iconName="breadIcon"></bread>
         <!-- main部分 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


 <script>
import navtop from "@/components/NavTop.vue";
import leftNav from "@/components/LeftMenu.vue";
import Bread from '@/components/Bread.vue';
export default {
  components: {
    navtop,
    leftNav,
    Bread
  },
  data() {
    return {
        leftMenu:{
            collapse: false,
            width: '220px'
        },
        breadIcon: 'el-icon-s-unfold'
    };
  },
  methods: {
      collapseLeft(toggle){
          this.leftMenu.collapse = toggle
          if (toggle) {
              this.leftMenu.width = '65px'
              this.breadIcon = 'el-icon-s-fold'
          }
          else {
              this.leftMenu.width = '220px'
              this.breadIcon = 'el-icon-s-unfold'
          }
      }
  }
};
</script>

 <style>
     .el-main {
         background-color: #f5f7f9;
     }

     .el-header,
     .el-footer {
         background-color: white;
         box-sizing: border-box;
         border-bottom: 1px solid #f5f1f1;
     }

     .el-container {
         height: 100%;
     }
 </style>
