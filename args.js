

const getArgs = (args)=>{
    const res = {};
    const [execut, file, ...rest] = args;
    rest.forEach((value, i, arr)=>{
        if(value.charAt(0) === '-') {
            if(i === arr.length -1 ){
                res[value.substring(1)] = true;
            }
            else if(arr[i+1].charAt(0) !== '-'){
                res[value.substring(1)] = arr[i+1];
            }else{
                res[value.substring(1)] = true;
            }
        }
    })
    return res;
};

export  default getArgs;