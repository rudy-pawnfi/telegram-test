import axios from 'axios';

import handleApi from './handleApi';

// const baseURL = "https://api-capsule.polarise.org"
const baseURL =  "https://apipolarcapsule.pawnfi.io"
const ApiServe = {

    query(methodName,params={},requestType='post') {
        return new Promise((resolve, reject) => {
            const paramsObj = requestType === 'get' ? {params: {...params}} : {...params}
            try {
                axios[requestType](baseURL + handleApi[methodName],{
                    ...paramsObj,
                },{
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json',
                        // "api-key-pft": 'ixIXLkRK6tFi49kDYy535rrI-s0'
                    }
                }).then(res => {
                    resolve(res.data)
                    console.log(methodName,":",res.data);
                }).catch(err =>{
                    reject({
                        code: -1,
                        error: err
                    })
                    console.log('err :>> ', err);
                })
                
                // resolve('Data fetched successfully!');
            } catch (error) {
                reject({
                    code: -1,
                    error: error
                })
                console.error('Error fetching data:', error);
            }
        }).catch(err =>{
            return {
                code: -1,
                error: error
            }
        })
        
        // return instance.request({
        //     url: handleApi[methodName],
        //     method: requestType,
        //     baseURL: "https://apipolarcapsule.pawnfi.io/"
        // });

    },

    resSuccess(response,params,responseMethod){

        if(!response?.data)return
        console.log('response :>> ', response);
        const { data,code, msg } = response.data;
        if(code === '0' || code === '4' || code === '200'){
            const newData = data;
            return newData || {};
        }

        // sig error
        if(code === '99' || code === '-99'){
            // walletConnectSign(this.wallet,walletDisconnect)
            return Promise.reject(response.data);
        }


        if(code === '101'){
            return Promise.reject(response.data);
        }

        if(
            code !== '0' ||
            code === '1305' ||
            code === '1302' ||
            code === '1301'
        ){
            return Promise.reject(response.data);
        }

    },

    resError(error){
        console.log('error :>> ', error);
        if(error instanceof Error){
            return Promise.reject({ msg: 'Network Error.', code: -1 });
        }

        if(!error && !error.response){
            return Promise.reject({ msg: 'Network Error.', code: -1 });
        }

        // if (process.env.NODE_ENV === 'development' && error.response)
        //     console.error(`Api ${error.response?.config?.url} response:`, error.response);

        return Promise.reject({msg: error.response?.statusText || '', code: error.response?.status});

    },


}

export default ApiServe;