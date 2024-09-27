
import validate from './validate'
import moment from 'moment-timezone';
export function fillZore(v){
    return v >= 10 ? v+'' : '0' + v;
}

function delRepeat(arr){

    if(arr.length<2){
        return arr;
    }

    let narr = [];
    let record;
    arr.forEach((v,i)=>{
        if(v===record){
            narr[narr.length-1] = narr[narr.length-1]+v.toString();
        }else{
            record = v;
            narr.push(v);
        }
    })
    return narr;
}

function toEnDate(index){
    const list = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    return list[index-1];
}

function transferInfo(type,date){

    switch(type){
        case 'yy':
            return date[0].substring(2,4);
        case 'y':
            return date[0];
        case 'm':
            return date[1];
        case 'M':
            return toEnDate(date[1]);
        case 'd':
            return date[2];
        case 'H':
            return date[3];
        case 'h':
            return date[3] > 12 ? ((date[3] - 12)>=10 ? (date[3] - 12) : "0" + (date[3] - 12)) : date[3];
        case 'I':
            return date[4];
        case 'i':
            return date[4];
        case 'S':
            return date[5];
        case 's':
            return date[5];
        case 'P':
            return date[3] > 12 ?  "PM" : "AM";
        case 'p':
            return date[3] > 12 ?  "pm" : "am";
        case 'u':
            const utc = new Date().getTimezoneOffset()/60;
            return "UTC" + (utc>=0?"-":"+") + Math.abs(utc);
        case ' ':
            return " ";
        case '/':
            return "/";
        case '*':
            return "*";
        case '#':
            return "#";
        case '%':
            return "%";
        case '|':
            return "|";
        case '-':
            return "-";
        case ':':
            return ":";
        default:
            return ''
    }
}

function dateInfo(date){
    let y = fillZore(date.getFullYear());
    let m = fillZore(date.getMonth() + 1);
    let d = fillZore(date.getDate());
    let h = fillZore(date.getHours());
    let i = fillZore(date.getMinutes());
    let s = fillZore(date.getSeconds());
    return [y,m,d,h,i,s];
}

// Returns the specified date format
export function getFormatDate(date,formatType){

    if(!formatType) return date;

    const typeArray = delRepeat(formatType.split(''));
    const dateInfoArray = dateInfo(date)


    let joinDate = [];
    typeArray.forEach(type=>{
        joinDate.push( transferInfo(type,dateInfoArray) );
    })

    return joinDate.join('');

}


export function transferTime(timeStamp,type){

    let toStamp = Date.parse(new Date());
    toStamp += timeStamp;
    const date = new Date(toStamp);

    return getFormatDate(date,type)

}

export function getFormatDateEST(stamp, formatType){
    var timestamp = stamp; 

    var estMoment = moment(timestamp).tz('America/New_York');

    var estTime = estMoment.format(formatType);

    // console.log(estTime);
    return estTime
}


export function changeTime(timeStamp,type){
    const date = new Date(timeStamp);

    return getFormatDate(date,type)
}

/**
 * @description:
 * @param {*} date
 * @param {*} formatType
 * @return {*}
 */
export function formatDate(date,formatType){
    if(!formatType) return date;

    const typeArray = delRepeat(formatType.split(''));
    const dateInfoArray = dateInfo(date)


    let joinDate = [];
    typeArray.forEach(type=>{
        joinDate.push( transferInfo(type,dateInfoArray) );
    })

    return joinDate.join('');
}


/**
 * @description:
 * @param {*} n offset day
 * @param {*} timeStamp
 * @return {*}
 */
 export function lastDay(n,timeStamp){
    if(arguments.length===0){
        timeStamp = Date.now()
        n = 1
    }
    if(arguments.length===1){
        timeStamp = Date.now()
        n = parseInt(n) || 1
    }
    const last = new Date(timeStamp - n * 86400 * 1000);
    return last

};

/**
 * @description: the total days of the last month for the specified date
 * @param {*} dateInfo  timeStamp or Date
 * @return {*}
 */
export function lastMonthTotalDays(dateInfo){

    dateInfo = dateInfo || new Date()

    if(typeof dateInfo === 'number'){
        dateInfo = new Date(dateInfo)
    }

    if(typeof dateInfo === 'string'){
        if(validate.isUsableNumber(dateInfo) && dateInfo.length === 13 ){
            dateInfo =  new Date(parseInt(dateInfo))
        }
    }

    let month = dateInfo.getMonth();
    let year = dateInfo.getFullYear();

    let lastDate = new Date(year,month,0);
    return lastDate.getDate();
}

/**
 * @description:
 * @param {*} n offset month
 * @param {*} timeStamp
 * @return {*}
 */
export function lastMonth(n,timeStamp){

    n = n ? parseInt(n) : 1
    timeStamp = timeStamp || Date.now()

    let lastTotalDays = lastMonthTotalDays(timeStamp);

    const last = new Date(timeStamp - lastTotalDays * 86400 * 1000);
    return last

};

/**
 * @description:
 * @param {*} type
 * @param {*} dateInfo [Date,timeStamp, identification]
 * @return {*}
 */
 export function format(dateInfo,type){

    if(!dateInfo || !type){
        return dateInfo;
    }

    if(dateInfo instanceof Date){
        return getFormatDate(dateInfo,type)
    }

    if(typeof dateInfo === 'number'){
        return getFormatDate(new Date(dateInfo),type)
    }

    if(typeof dateInfo === 'string'){
        if(validate.isUsableNumber(dateInfo) && dateInfo.length === 13 ){
            return getFormatDate(new Date(parseInt(dateInfo)),type)
        }
    }

    return dateInfo;

};




