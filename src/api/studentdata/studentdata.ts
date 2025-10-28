import {$get,$post} from '../../units/request'



export const $getgrade = async() => {
    let res = await $get('/studentdata/getgrade')
    console.log(res,'grade');
    
    return res
}  


export const $getstudent = async(params) => {
    let res = await $get('/studentdata/getstudent',params)
    // console.log(res);
    
    return res
}  
