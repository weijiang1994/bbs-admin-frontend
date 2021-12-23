<template>
  <div>
    <el-dialog title="编辑图片" :visible.sync="isShow">
      <div>
        <VueCropper></VueCropper>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { VueCropper } from "vue-cropper";
export default {
  name: "CropImage",
  components: { VueCropper },
  data() {
    return {
      isShow: this.show,
    };
  },
  props: {
    show: { type: Boolean, default: false },
  },
};
</script>