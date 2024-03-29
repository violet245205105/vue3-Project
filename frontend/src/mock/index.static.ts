export interface MockUserList {
  id: string;
  user: string;
  phone?: number | null;
  email?: string;
  profile?: string;
  password?: string;
  identity?: string;
  avatar?: string;
}

export interface MusicListType {
  music: string;
  singer: string;
  img: string;
  bofangFlag: boolean;
  musicName: string;
  id: string;
  ind?: number;
}

export const queryUrlPar = function (url: string) {
  url = url || window.location.href;
  var reg = /([^?=&]+)=([^?=&]+)/g;
  var obj: any = {};
  url.replace(reg, function (): any {
    obj[arguments[1]] = arguments[2];
  });
  return obj;
};

export interface resType {
  body: string;
  type: string;
  url: string;
}

let base_url: string = "";

switch (process.env.NODE_ENV) {
  case "dev":
    base_url = "http://127.0.0.1:5000/";
    break;
  case "int":
    base_url = "https://profile-dev.data.aws.bmwcn.cloud/";
    break;
  case "prod":
    base_url = "https://profile.data.aws.bmwcn.cloud/";
    break;
  default:
    base_url = "https://profile.data.aws.bmwcn.cloud/";
    break;
}

export { base_url };
