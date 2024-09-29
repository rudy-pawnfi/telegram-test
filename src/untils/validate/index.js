

const sciFilter = (num) => {
    let precision = 0
    if(num.toString().toLowerCase().indexOf('e')===-1){
        return num
    }

    precision = num.toString().toLowerCase().split('e').pop()
    if(precision.indexOf('-')>-1){
        precision=precision.replace(/[^\d]/g, "")
    }else{
        precision=0
    }
    return Number(num).toFixed(precision)
}
const validate = {

    /*
     * @describe check for valid numerical value
     * @param Number [n]
     * @param String [type]
     * return Boolean
     */
    isNumber(n,type='float'){
        if(n===undefined || n==='') return false;
        n = sciFilter(n)
        // const regInt = /^[0-9]\d{0,}$/;
        const regInt = /^([1-9]\d{0,30}|0)$/;
        const regFloat = /^([1-9]\d{0,30}|0)(\.\d+)?$/;
        return type === 'float' ? regFloat.test(n) : regInt.test(n);
    },
    isAllNumber(){
        const regFloat = /^([1-9]\d{0,30}|0)(\.\d+)?$/;
        let flag = true
        for(let i in arguments){
            if(!regFloat.test(arguments[sciFilter(i)])){
                flag = false
            }
        }

        return flag
    },

    //
    isNumberEx(num,type='float'){
        const valueType = typeof num;
        if(
            num===''
            || valueType==='undefined'
            || valueType==='object'
            || valueType==='function'
        ) return false;
        num = sciFilter(num)
        const regInt = /^([\-|\+]?[1-9]\d{0,90}|[\-|\+]?0)$/;
        const regFloat = /^([\-|\+]?[1-9]\d{0,90}|[\-|\+]?0)(\.\d+)?$/;
        return type === 'float' ? regFloat.test(num) : regInt.test(num);
    },

    isNegative(num){
        const valueType = typeof num;
        if(
            num===''
            || valueType==='undefined'
            || valueType==='object'
            || valueType==='function'
        ) return false;
        num = sciFilter(num)
        return num<0 ? true : false
    },

    isUsableNumber(num){
        const valueType = typeof num;
        if(
            num===''
            || valueType==='undefined'
            || valueType==='object'
            || valueType==='function'
        ) return false;

        const reg = /^([\-|\+]?[1-9]\d{0,30}|[\-|\+]?0)(\.\d+)?$/
        return reg.test(num);
    },

    isUsableInput(n,dec=18){
        if(n===undefined || n==='') return false;
        const reg = new RegExp("^([1-9]\\d{0,18}|0)(\\.|\\.\\d{1,"+dec+"})?$");
        return reg.test(n);
    },

    /*
     * @describe check for valid images file
     * @param Number [n]
     * @param String [type]
     * return Boolean
     */
    isImage(minetype){
        if(minetype===undefined || minetype==='') return false;
        const regInt = /^[0-9]\d{0,}$/;
        const regFloat = /(^[0-9]\d{0,}$)|(^[0-9]\d{0,}\.[0-9]{1,}$)/;
        // return type === 'float' ? regFloat.test(n) : regInt.test(n);
    },

    /**
     * @describe * check for valid specified extension
     * @param String [filename]
     * @param Array [supportExt]
     * return Boolean/String
     */
    isSupportFileExt(filename,supportExt){
        if(!filename || filename.length < 2) return false;

        let arr = filename.split('.');
        if(arr.length<2) return false;
        let ext = arr[arr.length-1].toLowerCase()

        if( !supportExt.includes(ext) ){
            return false;
        }
        return ext;
    },


    /**
     * @describe * check for valid specified extension
     * @param String [filename]
     * @param Array [supportExt]
     * return Boolean/String
     */
    isSupportFileExtNew(filename,supportExt){
        let src = filename
        if(!src || src.length < 2) return false;
        const regex = /^(http|https|ftp|ftps|file|data):\/\//;
        if(regex.test(src)){
            let url = new URL(src);
            src = url.pathname
        }
        let arr = src.split('.');
        // if(arr.length<2) return false;
        let ext = arr[arr.length-1].toLowerCase()

        if( !supportExt.includes(ext) ){
            return regex.test(filename)?'html':false;
        }
        return ext;
    },

    /**
     * 
     * @param {time} startTime 
     * @param {time} endTime 
     * @returns 
     */ 
     isToday(startTime,endTime) {
        const currentDate = new Date(startTime * 1000);
        const inputDate = new Date(endTime * 1000); // 将时间戳转换为毫秒
      
        return (
          inputDate.getDate() === currentDate.getDate() &&
          inputDate.getMonth() === currentDate.getMonth() &&
          inputDate.getFullYear() === currentDate.getFullYear()
        );
    } 

}

export default validate;

