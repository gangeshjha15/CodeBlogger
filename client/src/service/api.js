import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getType } from '../utills/common-utils';

const API_URL = '/api'

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
})

// Interceptor for request
axiosInstance.interceptors.request.use(
    function (config){
        if(config.TYPE.query){
            config.params = config.TYPE.query;
            // console.log(config.TYPE.query);
        }else if(config.TYPE.params){
            // console.log(config.TYPE.params);
            config.url = config.url + '/' + config.TYPE.params;
            // console.log(config.url);
        }
        return config;   
    },
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        // stop global loader here
        return processResponse(response);
    },

    function (error){
        // stop global loader here
        return Promise.reject(processError(error));
    }
)

// Trial
// axiosInstance.interceptors.response.use(
//     function (response){
//         // stop global loader here
//         return (response);
//     },

//     function (error){
//         // stop global loader here
//         console.log(error.toJSON());
//         return Promise.reject(error);
//     }
// )


////////////////
// If success -> return {isSuccess: true, data: object}
// If fail -> return {isFailure:true, status:string, msg:string, code:int}
///////////////
const processResponse = (response)=>{
    if(response?.status === 200){
        return {isSuccess: true, data: response.data}
    } else if(response?.status === 400) {
        return {
            isSuccess: false, 
            status: response?.status, 
            msg: response?.msg, 
            code: response?.code
        }
    } else {
        return {
            isFailure:true, 
            status: response?.status, 
            msg: response?.msg, 
            code: response?.code
        }
    }
}

////////////////
// If success -> return {isSuccess: true, data: object}
// If fail -> return {isFailure:true, status:string, msg:string, code:int}
///////////////

const processError = (error)=>{
    if(error.response){
        // Request made and server responded with other
        // that falls out of the range of 2.x.x(
        console.log('ERROR IN RESPONSE: ', error.toJSON())
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if(error.request){
        // Request made but no response was received
        console.log('ERROR IN REQUEST: ', error.toJSON())
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else{
        // something happened in setting up request that triggers an error
        console.log('ERROR IN NETWORK: ', error.toJSON())
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for( const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        // console.log(body);
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE'? {} : body,
            responseType: value.responseType,
            TYPE:getType(value, body),
            headers: {
                authorization: sessionStorage.getItem('accessToken')
            },
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                   let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                   showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                   let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                   showDownloadProgress(percentageCompleted);
                }
            }
        });
    }
}

export { API };
