//金额千分位 保留两位小数 已解决toFixed()不精确问题
export function numFormat(num) {
    let str = ""; //字符串累加
    str = (Math.round(num * 100) / 100)
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
        return $1 + ",";
      });
    return str; //字符串=>数组=>反转=>字符串
  }