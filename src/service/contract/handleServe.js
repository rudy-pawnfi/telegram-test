import axios from 'axios';

import handleApi from './handleApi';

const baseURL =  "https://testnet.toncenter.com"
const ApiContact = {

    query(methodName,params={},requestType='post') {
        return new Promise((resolve, reject) => {
            try {
                if(requestType === 'get'){
                    axios.get(baseURL + handleApi[methodName],{
                        params : {...params},
                        headers: {
                            'content-type': 'application/json',
                            'accept': 'application/json',
                            // "api-key-pft": 'ixIXLkRK6tFi49kDYy535rrI-s0'
                            "X-API-Key": '2bc257be7d0e5a24055035156b56f7a6866bcc27cbd50ec08b72d19e5fb02fb3'
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
                }else{
                    axios.post(baseURL + handleApi[methodName],{
                        ...params,
                    },{
                        headers: {
                            'content-type': 'application/json',
                            'accept': 'application/json',
                            // "api-key-pft": 'ixIXLkRK6tFi49kDYy535rrI-s0'
                            "X-API-Key": '2bc257be7d0e5a24055035156b56f7a6866bcc27cbd50ec08b72d19e5fb02fb3'
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
                }
                // resolve('Data fetched successfully!');
            } catch (error) {
                reject({
                    code: -1,
                    error: error
                })
                console.error('Error fetching data:', error);
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

export default ApiContact;