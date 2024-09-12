import axios from 'axios';

import handleApi from './handleApi';

const ApiServe = {

    query(methodName,params={},requestType='post') {
        params = params

        const instance = axios.create({
            timeout: 60000,
            headers: {
                'Content-Type': requestType === 'post' ? 'application/json' : 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        });

        instance.interceptors.request.use((config)=>{
            config.timeStamp = new Date().getTime()
            config.cancelToken = new axios.CancelToken(cancel => {
                this.reqPendingList.push({
                    ...config,
                    cancel
                })
              })
            return config
        }
        ,
        (error) => Promise.reject(error)
        )
        instance.interceptors.response.use((res) => {
            return res
        },
        (error) => {
            return Promise.reject({
                response:{
                    status: 0,
                    statusText:'this request has been canceled'
                }
            })
        }
        )

        instance.interceptors.request.use(
            (config) => {

                const proParams =  params;
                config.params = requestType === 'get' || requestType === ''
                    ? proParams
                    : null;

                config.data = requestType === 'post' || requestType === ''
                    ? proParams
                    : null;

                return config;
            },
            (error) => Promise.reject(error)
        );

        instance.interceptors.response.use(res => {
            return this.resSuccess(res,params,responseMethod);
        },err => {
            return this.resError(err);
        });

        return instance.request({
            url: handleApi[methodName],
            method: requestType,
            baseURL: "https://apipolarcapsule.pawnfi.io/"
        });

    },

    resSuccess(response,params,responseMethod){

        if(!response?.data)return
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