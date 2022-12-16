<template>
  <el-dialog v-model="dialogVisible" title="请选择你要更换的头像" width="30%" :before-close="onCloneAvatar">
    <el-space wrap>
      <el-avatar v-for="(item, index) in avatarList" :key="item" :size="60" :src="item"
        @click="onClickAvatar(index + 1)" :class="isActive - 1 === index ? 'active' : ''" />
    </el-space>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCloneAvatar">取消</el-button>
        <el-button @click="onEditAvatar" type="primary" :loading="avatarLodeing" :disabled="!isActive">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from "vue";
import { getAvatar } from "@/api";
export default defineComponent({
  props: {
    dialogVisible: {
      type: Boolean,
    },
    isActive: {
      type: Number,
    },
    avatarLodeing: {
      type: Boolean,
    },
  },
  setup(props, context) {
    const dialogVisible = ref(false);
    const isActive: { value: number | null } = ref(null);
    const avatarLodeing = ref(false);
    const avatarList = ref([])
    watch(props, (newVal) => {
      dialogVisible.value = newVal.dialogVisible;
      isActive.value = Number(newVal.isActive);
      avatarLodeing.value = newVal.avatarLodeing;
    });

    onMounted(async () => {
      const res = await getAvatar();
      if (res.data.code === 200) {
        avatarList.value = res.data.data
      }
    })

    const onCloneAvatar = () => {
      context.emit("onCloneAvatar");
    };

    const onClickAvatar = (index: number) => {
      context.emit("onClickAvatar", index);
    };

    const onEditAvatar = () => {
      context.emit("onEditAvatar", avatarList.value[Number(isActive.value) - 1]);
    };

    return {
      dialogVisible,
      onCloneAvatar,
      onClickAvatar,
      isActive,
      onEditAvatar,
      avatarLodeing,
      avatarList
    };
  },
});
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-avatar {
  cursor: pointer;
}

.active {
  border: 2px solid red;
}
</style>
