
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
