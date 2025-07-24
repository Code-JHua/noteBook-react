import axios from 'axios'
import {Toast} from 'react-vant'

axios.defaults.baseURL = 'http://localhost:3000'
// 告诉浏览器, 如果发送的是 post 请求, 那么后端一定会返回 json 格式的数据, 让浏览器以解析 json 的方式来解析响应体
axios.defaults.headers.post['Content-Type'] = 'application/json'


// 响应拦截器
axios.interceptors.response.use(response => {
  console.log(response);
  if (response.status !== 200) {
    Toast.fail('服务器异常')
    return Promise.reject(response) // 方便在页面上捕获异常
  } else {
    if (response.data.code !== '1') { 
      Toast.fail(response.data.msg)
      return Promise.reject(response)
    }
  }
  return response.data
})
export default axios