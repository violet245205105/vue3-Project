import { defineStore } from "pinia";
import { reactive, ref } from "vue";
export default defineStore("UserInformation", () => {
  const state = reactive({
    userToken: null,
    user: null,
  });
  const formLabelAlign = reactive({
    id: "",
    user: "",
    password: "",
    identity: "",
    phone: "",
    email: "",
    profile: "",
  });
  return {
    state,
    formLabelAlign,
  };
});
