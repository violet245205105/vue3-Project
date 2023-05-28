class CookieUtils {
  // 设置 Cookie
  public static setCookie(name: string, value: string): void {
    document.cookie = `${name}=${value}`;
  }

  // 获取 Cookie
  public static getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ")
        cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) === 0)
        return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
  }

  // 删除 Cookie
  public static deleteCookie(name: string): void {
    this.setCookie(name, "");
  }
}

export default CookieUtils;
