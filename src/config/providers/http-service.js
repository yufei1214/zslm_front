import axios from 'axios';

axios.defaults.timeout = 5000;

axios.defaults.baseURL = 'http://localhost:81/zslm_back/public';

axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


axios.interceptors.response.use(response => {
    return response;
}, err => {
    if(err && err.response) {
        switch(err.response.status)
        {
            case 400 :
                console.log('请求错误');
            case 401 :
                console.log('未授权，请重新登录');
            case 403 :
                console.log('拒绝访问');
            case 404 :
                console.log('请求错误，未找到该资源');
            case 405 :
                console.log('请求方法未允许');
            case 408 :
                console.log('请求超时');
            case 500 :
                console.log('服务器端出错');
            case 501 :
                console.log('网络未实现');
            case 502 :
                console.log('网络错误');
            case 503 :
                console.log('服务不可用');
            case 504 :
                console.log('网络超时');
            case 505 :
                console.log('http版本不支持该请求');
            default :
                console.log(`连接错误${err.response.status}`)
        }
    }
    else {
        console.log('连接到服务器失败');
    }

    return Promise.resolve(err.response);
})

// this.fetch('/test',{
//     'id':2,
//     'test':'aaaa'
// })
export default {
    //get
    fetch: function(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params:params
            })
            .then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err);
            })
        })
    },

    //post
    post: function(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
        })
    },

    //patch
    patch: function(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.patch(url, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
        })
    },

    //put
    put: function(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, data)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
        })
    }
}
