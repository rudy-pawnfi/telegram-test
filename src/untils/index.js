import { Decimal } from 'decimal.js';
export function reduceLen(value,beforeLen=6,afterLen=4,adorn="..."){

    if(!value || value.length < beforeLen + afterLen){
        return value.toString();
        //throw new Error('methods reduceLen:',"Value Invalid, Length not enough ");
    }

    return value.substring(0,beforeLen) + adorn + value.substring(value.length,value.length - afterLen)
}


export function toFmtThousand(num){
    let result = num.toString().replace(/\d+/, function(n){
        return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
            return $1+",";
        });
    })
     return result;
}
const sciFilter = (num) => {
    let precision = 0
    if(num?.toString()?.toLowerCase()?.indexOf('e')===-1){
        return num
    }

    precision = num?.toString()?.toLowerCase()?.split('e')?.pop()
    if(precision.indexOf('-')>-1){
        precision=precision.replace(/[^\d]/g, "")
    }else{
        precision=0
    }
    return Number(num).toFixed(precision)
}
const isNumberEx = (num,type='float') => {
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
}
export function mul(v1, v2) {
    if(!isNumberEx(v1) || !isNumberEx(v2)){
        return 0;
    }
    return Decimal.mul(v1, v2).valueOf();
}
export function toFixed(num, dec = 18,type) {
    if(!isNumberEx(num)){
        return num;
    }
    let round;
    switch(type){
        case 'ROUND_FLOOR':
        case 'floor': round = Decimal.ROUND_FLOOR; break;
        case 'ROUND_CEIL':
        case 'ceil': round = Decimal.ROUND_CEIL; break;
        case 'ROUND_DOWN':
        case 'down': round = Decimal.ROUND_DOWN; break;
        case 'ROUND_UP':
        case 'up': round = Decimal.ROUND_UP; break;
        case 'ROUND_HALF_UP':
        case 'halfUp': round = Decimal.ROUND_HALF_UP; break;
        case 'ROUND_HALF_DOWN':
        case 'halfDown': round = Decimal.ROUND_HALF_DOWN; break;
        default: round = Decimal.ROUND_FLOOR;
    }

    return mul(new Decimal(num).toFixed(Number(dec||0),round),1);
}
