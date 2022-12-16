<template>
    <el-dialog class="user-dialog" v-model="dialogFormVisible" :before-close="onChangeCancel" width="30%"
        :title="title">
        <el-form ref="ruleFormRef" label-position="left" label-width="auto" :model="form" :rules="rules">
            <el-form-item label="头像：" prop="avatar">
                <el-popover :width="300"
                    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
                    <template #reference>
                        <el-avatar :size="50" :src="form.avatar ? form.avatar : circleUrl" />
                    </template>
                    <template #default>
                        <div class="demo-rich-conent">
                            <el-space wrap>
                                <el-avatar class="selected-avatar" v-for="(item, index) in avatarList" :key="item"
                                    :size="35" :src="item" @click="onClickAvatar(index + 1)"
                                    :class="isActive - 1 === index ? 'active' : ''" />
                            </el-space>
                        </div>
                    </template>
                </el-popover>
            </el-form-item>

            <el-form-item label="用户权限：" prop="identity">
                <el-select v-model="form.identity" :value="form.identity" placeholder="请选择您的ID">
                    <el-option label="visitor" value="visitor" />
                    <el-option label="admin" value="admin" />
                </el-select>
            </el-form-item>

            <el-form-item label="用户名：" prop="user">
                <el-input v-model="form.user" autocomplete="off" :disabled="title==='编辑'" />
            </el-form-item>

            <el-form-item label="密码：" prop="password">
                <el-input v-model="form.password" autocomplete="off" />
            </el-form-item>

            <el-form-item label="手机号：" prop="phone">
                <el-input v-model="form.phone" autocomplete="off" />
            </el-form-item>

            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="onChangeCancel">取消</el-button>
            <el-button :loading="isButtonLoading" type="primary" @click="onChangeConfirm(ruleFormRef)"
                class="loginButton">确定</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from 'vue'
import { getAvatar } from "@/api";
import { loginStore } from "@/stores/index";
import type { FormInstance } from 'element-plus';
export default defineComponent({
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ""
        },
        form: {
            type: Object
        },
        circleUrl: {
            type: String,
            default: ""
        },
        isActive: {
            type: Number,
            default: 0
        },
        isButtonLoading: {
            type: Boolean,
            default: false
        }
    },
    setup(props, connext) {
        const dialogFormVisible: { value: boolean } = ref(props.dialogFormVisible);
        const title: { value: string } = ref(props.title);
        const form = ref(props.form);
        const avatarList = ref([]);
        const { rules } = loginStore();
        const ruleFormRef = ref<FormInstance>();
        const isButtonLoading = ref(false);
        watch(props, (newValue) => {
            dialogFormVisible.value = newValue.dialogFormVisible;
            title.value = newValue.title;
            form.value = newValue.form;
            isButtonLoading.value = newValue.isButtonLoading;
        });

        onMounted(async () => {
            const res = await getAvatar();
            avatarList.value = res.data.data
        })

        const onClickAvatar = (index: number) => {
            connext.emit("onClickAvatar", index);
        };
        const onChangeCancel = () => {
            connext.emit("onChangeCancel", false)
        }
        const onChangeConfirm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            formEl.validate(async (valid) => {
                if (valid) {
                    connext.emit("onChangeConfirm");
                } else {
                    return false;
                }
            });
        }
        return { onChangeCancel, onChangeConfirm, dialogFormVisible, title, form, onClickAvatar, avatarList, rules, ruleFormRef, isButtonLoading }
    }
})
</script>

<style scoped lang="less">
@import "./UserFrom.less";
</style>