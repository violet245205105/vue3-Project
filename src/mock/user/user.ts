import type { MockUserList, resType } from "../index.static";
import Mock from "mockjs";
import { createToken } from "./user.static.js";
import { queryUrlPar } from "../index.static";
import { encode, decode } from "js-base64";

let mockUserList: MockUserList[] = localStorage.getItem("mockUserList")
  ? JSON.parse(decode(localStorage.getItem("mockUserList") as string))
  : [];
if (!(mockUserList && mockUserList.length)) {
  const count = 100;
  for (let i = 0; i < count; i++) {
    mockUserList.push(
      Mock.mock({
        id: "@id",
        user: /^[a-zA-Z][-_a-zA-Z0-9]{5,15}$/,
        "phone|1": /^1[0-9]{10}$/,
        email: "@email",
        password: /^[A-Za-z0-9]{5,15}$/,
        "identity|1": ["admin", "visitor"],
      })
    );
  }
}

export const getUserList = (): MockUserList[] => {
  if (!localStorage.getItem("mockUserList")) {
    localStorage.setItem("mockUserList", encode(JSON.stringify(mockUserList)));
  }

  console.log(
    JSON.parse(decode(localStorage.getItem("mockUserList") as string))
  );
  return JSON.parse(decode(localStorage.getItem("mockUserList") as string));
};

export const getUserData = (res: resType) => {
  const obj = queryUrlPar(res.url);
  const start = (Number(obj.startPage) - 1) * Number(obj.totalPage);
  const end = Number(obj.totalPage) * Number(obj.startPage);
  const newArr = getUserList().filter(
    (data) =>
      !obj.search || data.user.toLowerCase().includes(obj.search.toLowerCase())
  );
  const total = Math.ceil(newArr.length / obj.totalPage);
  const sum = newArr.length;
  const data = newArr.slice(start, end);
  return {
    code: 200,
    data,
    total,
    sum,
  };
};

export const login = (res: resType) => {
  const user = JSON.parse(res.body);
  const item = getUserList().find((value) => value.user === user.user);
  if (item) {
    if (item.password === user.password) {
      localStorage.setItem("user_token", createToken(item.id as string));
      return {
        code: 2000,
        message: "登录成功",
      };
    } else {
      return {
        code: 2001,
        message: "账号或密码错误",
      };
    }
  } else {
    return {
      code: 2002,
      message: "用户不存在",
    };
  }
};

export const register = (res: resType) => {
  const user = JSON.parse(res.body);
  const item = getUserList().find((value) => value.user === user.user);
  if (!item) {
    const obj: MockUserList = {
      user: user.user,
      password: user.password,
      id: String(+new Date()),
      identity: user.identity ? user.identity : "visitor",
      phone: user.phone,
      email: user.email,
      avatar: user.avatar,
    };
    mockUserList.unshift(obj);
    localStorage.setItem("mockUserList", encode(JSON.stringify(mockUserList)));
    return {
      code: 2000,
      message: "注册成功",
    };
  } else {
    return {
      code: 2002,
      message: "用户已存在",
    };
  }
};

export const getUser = (id: { body: string }) => {
  const item = getUserList().find((item) => item.id === id.body);
  if (item) {
    return {
      code: 200,
      data: item,
      message: "获取用户信息成功",
    };
  } else {
    return {
      code: 201,
      data: null,
      message: "获取用户信息失败",
    };
  }
};

export const changeAvatarEl = (state: { body: string }) => {
  try {
    const body = JSON.parse(state.body);
    const newArr = getUserList().map((item) => {
      if (item.id === body.userId) {
        item.avatar = body.url;
      }
      return item;
    });
    localStorage.setItem("mockUserList", encode(JSON.stringify(newArr)));
    return {
      code: 200,
      message: "更换头像成功",
    };
  } catch (e) {
    return {
      code: 400,
      message: "更换头像失败，请重试",
    };
  }
};

export const onEditUser = (res: resType) => {
  const user = JSON.parse(res.body);
  mockUserList.forEach((value) => {
    if (value.id === user.id) {
      value.user = user.user;
      value.phone = user.phone;
      value.email = user.email;
      value.profile = user.profile;
      value.password = user.password;
      value.identity = user.identity;
      value.avatar = user.avatar;
    }
  });
  localStorage.setItem("mockUserList", encode(JSON.stringify(mockUserList)));
  return {
    code: 2000,
    message: "编辑成功",
  };
};

export const delUser = (res: resType) => {
  const user = JSON.parse(res.body);
  mockUserList = mockUserList.filter(
    (item) => !user.id.some((value: string) => item.id === value)
  );
  localStorage.setItem("mockUserList", encode(JSON.stringify(mockUserList)));
  return {
    code: 200,
    message: "删除成功",
  };
};
