import { defineStore } from "pinia";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { ref, onMounted, onUpdated, reactive } from "vue";
import { login, getUserList, register } from "@/api/index";
export interface StateType {
  code?: string;
  flag?: boolean;
  routes?: {
    path?: string;
  };
  title?: string;
}

export interface RuleForm {
  user: string;
  password: string;
  Captcha?: string;
  repeatPassword?: string;
  phone?: number | null;
  email?: string | null;
  identity?: string;
  avatar?: string;
}

export default defineStore("login", () => {
  const state: StateType = reactive({
    code: "",
    flag: false,
    routes: {},
    title: "",
  });

  const handleChange = (code: string) => {
    state.code = code;
  };
  const router = useRouter();

  const ruleFormRef = ref<FormInstance>();

  const ruleForm = reactive<RuleForm>({
    user: "",
    password: "",
    Captcha: "",
    repeatPassword: "",
  });
  const validate = (
    rule: { field: string },
    value: string,
    callback: (arg0?: Error | undefined) => void
  ) => {
    const reg = /^[\w-]{6,16}$/;
    if (rule.field && rule.field === "user") {
      if (value) {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("用户名至少6-16位之间"));
        }
      } else {
        callback(new Error("请输入用户名"));
      }
    } else if (rule.field && rule.field === "password") {
      if (value) {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("密码至少6-16位之间"));
        }
      } else {
        callback(new Error("请输入密码"));
      }
    } else if (rule.field && rule.field === "Captcha") {
      if (value) {
        callback();
      } else {
        callback(new Error("请输入验证码"));
      }
    } else if (rule.field && rule.field === "repeatPassword") {
      if (value) {
        if (reg.test(value)) {
          if (ruleForm.password === ruleForm.repeatPassword) {
            callback();
          } else {
            callback(new Error("密码不一致，请重新输入"));
          }
        } else {
          callback(new Error("密码至少6-16位之间"));
        }
      } else {
        callback(new Error("请重复输入密码"));
      }
    } else if (rule.field && rule.field === "identity") {
      if (value) {
        callback();
      } else {
        callback(new Error("请选择用户权限"));
      }
    }
  };
  const rules = reactive({
    user: [{ validator: validate, trigger: "blur" }],
    password: [{ validator: validate, trigger: "blur" }],
    Captcha: [{ validator: validate, trigger: "blur" }],
    repeatPassword: [{ validator: validate, trigger: "blur" }],
  });
  const init = () => {
    state.routes = router?.currentRoute?.value;
    if (state?.routes?.path === "/login") {
      state.title = "登录";
    } else if (state?.routes?.path === "/register") {
      state.title = "注册";
    }
  };

  onUpdated(() => {
    init();
  });
  onMounted(async () => {
    init();
    // await getUserList();
  });
  return {
    state,
    handleChange,
    ruleFormRef,
    ruleForm,
    router,
    init,
    login,
    register,
    rules,
  };
});
