import axios from 'axios'
import { Toast } from 'react-vant'

axios.defaults.baseURL = 'http://localhost:3000'
// 告诉浏览器，如果发送的是 post请求，那么后端一定会返回 json 格式的数据，让浏览器以解析 json 的方式来解析响应提体
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器 -- 所有的请求都会先被这个函数拦截下来
axios.interceptors.request.use(requset => {
  // 从浏览器的本地存储中获取令牌
  const access_token = localStorage.getItem('access_token')
  // 如果令牌存在，那么就将令牌添加到请求头中
  if (access_token) {
    requset.headers.Authorization = access_token
  }
  return requset  // 请求放行
})



// 响应拦截器
axios.interceptors.response.use(
  (response) => {  // http 的状态码为 200 时才走进第一个回调
    if (response.status == 200) {

      if (response.data.code !== '1') {  // 逻辑性错误
        console.log('被拦截');
        console.log(response.data);
        
        
        Toast.fail(response.data.msg);
        return Promise.reject(response)
      }

      return Promise.resolve(response.data)
    }
  },
  (res) => { // 状态码不为 2xx
    if (res.status === 401) {
      // toast.error(res.response.data.msg)
      // setTimeout(() => {
      //   window.location.href = '/login'
      // }, 2000)


      const originalRequest = res.config;

      // 重新请求新的短 token和长 token
      const refresh_token = localStorage.getItem('refresh_token')
      if (refresh_token) {
        axios.post('/user/refresh', {
          refresh_token: refresh_token
        }).then(res => {
          if (res.code === '1') {
            localStorage.setItem('access_token', res.access_token)
            localStorage.setItem('refresh_token', res.refresh_token)
            // 将之前没有发送成功的请求再次发送
            // 更新原始请求的 Authorization 头
            originalRequest.headers.Authorization = res.access_token;
            // 重新发送原始请求
            return axios(originalRequest);
          }
        })
      } else {
        Toast.fail(res.response.data.msg)
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
    } 
    if(res.status === 416) {
      Toast.fail(res.response.data.msg)
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
      return Promise.reject(res)
    }

  }

)


export default axios