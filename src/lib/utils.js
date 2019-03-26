/* eslint-disable */
export const getCookies = (cname) => {                    //  获取cookie方法
  const name = `${cname}=`;                               //  拼接参数字符串
  const ca = document.cookie.split(';');                  //  分割cookies为数组
  for (let i = 0; i < ca.length; i += 1) {                //  循环cookie数组
    let c = ca[i];                                        //  选取数组中一个元素
    while (c.charAt(0) === ' ') c = c.substring(1);       //  若第一位为空，则去掉空格
    //  判断当前元素中是否含有参数，若有，返回等于号后面的内容
    if (c.includes(name)) return decodeURIComponent(c.substring(name.length, c.length));
  }
  return '';
};

export const a = 123;
