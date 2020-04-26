const checkStatus = (response, reject) => {
  console.log(response)
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  } else {
    window.history.replace('/')
    reject("error");
  }
};

const formatResponse = (response, resolve, reject, newOptions) => {
  // 处理文件
  if (newOptions.isBlob) {
    const re = /filename="(.*)"/gi; // 必须确保response headers下content-disposition字段的filename格式正确（filename="文件名.扩展名"），否则导出文件会有问题
    const match = re.exec(response.headers.get("content-disposition"));
    if (match !== null) {
      resolve({
        content: response.blob(),
        filename: decodeURI(match[1])
      });
    } else {
      reject("错误的文件或文件格式");
    }
  } else {
    resolve(response.json());
  }
};

const catchError = e => {
  console.error(`request error: \n${e}`);
};

/**
 * @param  {string} url
 * @param  {object} [options]
 * @return {object}
 */
const request = (url, options) => {
  return new Promise((resolve, reject) => {
    // 携带body的请求类型
    const hasBody = ["POST", "PUT", "DELETE", "PATCH"];
    // 携带cookie
    const defaultOptions = {
      credentials: "include"
    };
    // option
    const newOptions = { ...defaultOptions, ...options };
    // 设置请求头
    if (hasBody.includes(newOptions.method)) {
      // newOptions.body 不是 FormData
      if (!(newOptions.body instanceof FormData)) {
        newOptions.headers = {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          ...defaultOptions.headers,
          ...options.headers
        };
        newOptions.body = JSON.stringify(newOptions.body);
      } else {
        // newOptions.body 是 FormData
        newOptions.headers = {
          Accept: "application/json",
          ...defaultOptions.headers,
          ...options.headers
        };
      }
    }
    // 发起请求
    fetch(url, newOptions)
      .then(response => checkStatus(response, reject))
      .then(response => formatResponse(response, resolve, reject, newOptions))
      .catch(catchError);
  });
};

export default request;
