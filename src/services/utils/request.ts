import Axios from "./axios";

const request = new Axios({
  baseUrl: "https://cnodejs.org/api/v1",
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  console.log('request',config);
  return config;
});

request.interceptors.respond.use((respond:UniApp.RequestSuccessCallbackResult) => {
  console.log('respond',respond);
  return respond.data;
});

export default request;
