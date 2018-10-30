import axios from 'axios';

/**
 * request 请求函数
 * url: "" ---接口地址
 * params:{  ---参数，不传默认get, 无参数。
 *   method: "",
 *   body: {
 *     "", "",
 *     "", "" 
 *   }
 * }
 * --------使用方式--------------------------
 * 1. 引入组件
 * 2. request(url, params)
 *     .then(function(response) {
 *       console.log(response); //返回结果
 *     })
 * --------500错误-----------------------------------
 * 注：真正的接口报错500， 实际status:500 code:1
 * 业务异常，status:500 code>1
 */


function request(url, params) {

  if(!params) {
    params = {};
  }

  if(!params.method) {
    params.method = "get";
  }
  
  if(!params.body) {
    params.body = {};
  }

  if (params.method && (params.method === "get" || params.method === "GET")) {
    let getParams = params.body; //获取参数
    return axios.get(url, {
        params: getParams
      })
      .then(function (response) {
        return response.data;  
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (params.method && (params.method === "post" || params.method === "POST")) {
    let postParams = params.body; //获取参数
    return axios.post(url, postParams)
      .then(function (response) {
        return response.data;  
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default request;