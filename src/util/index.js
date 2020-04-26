/**
 * @description 判断是否是promise
 * @param {Blob} obj 对象
 */
export const isPromise = obj => {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
};

/**
 * @description 无需表单，实现文件下载
 * @param {Blob} content
 * @param {String} filename
 */
export const fileDownload = (content, filename) => {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(content);
  a.href = url;
  a.download = filename;
  // 下面的appendChild及removeChild是为了兼容Firefox，Chrome不加这两个语句也可以实现下载
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

/**
 * @description 首字母大写
 * @param str
 * @return {string}
 */
export const upperFirstLetter = (str = '') => str.slice(0, 1).toUpperCase() + str.slice(1);