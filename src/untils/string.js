const StringMethod = {

    trimSpace(){
        let str = this + '';
        return str.replace(/\s+/g,'');
    },

    /*
     * @describe Shorten string length
     * @param Int [beforeLen]
     * @param Int [afterLen]
     * @param String [adorn]
     * return String
     */
    reduceLen(beforeLen=6,afterLen=4,adorn="..."){
        let value = this.toString();
        if(!value || value.length < beforeLen + afterLen){
            return value.toString();
        }
        return value.substring(0,beforeLen) + adorn + value.substring(value.length,value.length - afterLen)
    },

    /*
     * @Delete the illegal characters in the int type
     * @str String
     * return String
     */
    keepstr(str,type='int'){

        let regEx = /^0+|[^\d]/g;
        str = str.toString() || '';
        str = str.replace(regEx, '');
        return str;
    },

    hashAndFollowing(str, id) {
        if(str === '' || !str) return '#' + id
        const hashIndex = str.indexOf('#');
        if (hashIndex !== -1) {
            return str;
        }
        return str + ' #' + id;
    },
    removeHashAndFollowing(str) {
        if(str === '' || !str) return str
        const hashIndex = str.indexOf('#');
        if (hashIndex !== -1) {
            return str.slice(0, hashIndex);
        }
        return str;
    },
    returnHashAndFollowing(str, id) {
        if(str === '' || !str) return str
        const hashIndex = str.indexOf('#');
        if (hashIndex !== -1) {
            return str.slice(hashIndex + 1, str.length);
        }
        return id;
    },
}
export default StringMethod
