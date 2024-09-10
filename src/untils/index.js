
export function reduceLen(value,beforeLen=6,afterLen=4,adorn="..."){

    if(!value || value.length < beforeLen + afterLen){
        return value.toString();
        //throw new Error('methods reduceLen:',"Value Invalid, Length not enough ");
    }

    return value.substring(0,beforeLen) + adorn + value.substring(value.length,value.length - afterLen)
}
