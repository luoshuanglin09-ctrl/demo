import {$get,$post} from '../../units/request'

export const $getpapercount = async(params) => {
    let res = await $get('/ability/getpapercount',params)
    // console.log(res);
    
    return res
}
export const $getzlcount = async(params) => {
    let res = await $get('/ability/getzlcount',params)
    // console.log(res);
    
    return res
}
export const $gethjcount = async(params) => {
    let res = await $get('/ability/gethjcount',params)
    // console.log(res);
    
    return res
}

export const $getallpaper = async(params) => {
    let res = await $get('/ability/getallpaper',params)
    // console.log(res);
    
    return res
}


export const $getstuall = async(params) => {
    let res = await $get('/ability/getstuall',params)
    // console.log(res);
    
    return res
}