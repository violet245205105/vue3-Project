import { defineStore } from "pinia";
import { reactive, ref, onMounted } from "vue";
import { getUserList, getUserData, register } from "@/api";
import { getAvatar, onEditUser, delUser } from "@/api";
import { ElMessage } from "element-plus";

export interface User {
  id: string;
  identity: string;
  user: string;
  password: string;
  phone?: string;
  email?: string;
  avatar?: string;
}

export default defineStore("RoleManagement", () => {
  const state = reactive({
    start: 1,
    totalPage: 10,
    total: 0,
    search: "",
    sum: 0,
    isActive: 0,
    userList: [],
    loading: true,
    tableLoading: false,
    dialogFormVisible: false,
    title: "",
    isButtonLoading: false,
    selectedArr: [],
  });

  const avatarList = ref([]);

  onMounted(async () => {
    const res = await getAvatar();
    if (res.data.code === 200) {
      avatarList.value = res.data.data;
    }
  });

  const form = reactive<User>({
    id: "",
    identity: "",
    user: "",
    password: "",
    phone: "",
    email: "",
    avatar: "",
  });

  const handleEdit = (index: number, row: User) => {
    const findIndex = avatarList?.value?.findIndex(
      (item) => item === row.avatar
    );
    state.isActive = findIndex + 1;
    state.dialogFormVisible = true;
    state.title = "编辑";
    form.id = row.id;
    form.user = row.user;
    form.identity = row.identity;
    form.password = row.password;
    form.email = row.email ? row.email : "";
    form.avatar = row.avatar ? row.avatar : "";
    form.phone = row.phone ? row.phone : "";
  };
  const handleDelete = async (index: number, row: User) => {
    const res = await delUser({ id: [row.id] });
    if (res.data.code === 200) {
      await init();
      ElMessage.success(res.data.message);
    }
  };
  const changePage = async (value: string) => {
    state.start = Number(value);
    await init({ start: state.start });
  };
  const changePageSize = async (value: number) => {
    state.totalPage = value;
    await init();
  };
  const onChangeSearch = async (value: string) => {
    await init({ search: value });
  };
  const onChangeRoleDialog = () => {
    state.dialogFormVisible = true;
    state.title = "新增";
    form.identity = "visitor";
    form.avatar = "";
    state.isActive = 0;
    form.user = "";
    form.password = "";
    form.email = "";
    form.phone = "";
  };
  const onChangeCancel = (value: boolean) => {
    state.dialogFormVisible = value;
  };

  const init = async (props?: {
    start?: number;
    totalPage?: number;
    search?: string;
  }) => {
    state.loading = true;
    
    try {
      const res = await getUserData({
        startPage: props?.start ? props.start : state.start,
        totalPage: props?.totalPage ? props.totalPage : state.totalPage,
        search: props?.search ? props.search : state.search,
      });

      state.loading = false;
      if (res.data.code === 200) {
        state.userList = res.data.data;
        state.loading = false;
        state.total = res.data.total;
        state.sum = res.data.sum;
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const onClickAvatar = (index: number) => {
    state.isActive = index;
    form.avatar = avatarList.value[index - 1];
  };

  const onChangeConfirm = async () => {
    state.isButtonLoading = true;
    if (state.title === "新增") {
      try {
        const res = await register(form);
        if (res.data.code === 2000) {
          state.dialogFormVisible = false;
          await init();
          ElMessage.success("创建成功");
        } else if (res.data.code === 2002) {
          ElMessage.error(res.data.message);
        }
      } catch (e) {
        console.log("error", e);
        ElMessage.error("创建失败");
      }
    } else {
      try {
        const res = await onEditUser(form);
        if (res.data.code === 2000) {
          state.dialogFormVisible = false;
          await init();
          ElMessage.success("编辑成功");
        }
      } catch (e) {
        console.log("error", e);
        ElMessage.error("编辑失败");
      }
    }
    state.isButtonLoading = false;
  };

  const handleSelectionChange = (val: never[]) => {
    state.selectedArr = val;
  };
  
  const handleDeleteArr = async () => {
    const newArr = state.selectedArr.map((item: { id: string }) => item.id);
    const res = await delUser({ id: newArr });
    if (res.data.code === 200) {
      await init();
      ElMessage.success(res.data.message);
    }
  };

  return {
    handleEdit,
    handleDelete,
    getUserList,
    getUserData,
    state,
    init,
    changePage,
    changePageSize,
    onChangeSearch,
    onChangeRoleDialog,
    onChangeCancel,
    form,
    onClickAvatar,
    avatarList,
    onChangeConfirm,
    handleSelectionChange,
    handleDeleteArr,
  };
});
