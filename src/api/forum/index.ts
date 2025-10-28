import {$get,$post} from '../../units/request'

//查看比赛
export const $getforum = async() => {
    let res = await $get('/forum/getforum')
    // console.log(res);
    
    return res
}

//删除比赛
export const $delforum = async(params) => {
    let res = await $post('/forum/delforum',params)
    return res
}

//添加比赛
export const $addforum = async(params) => {
    let res = await $post('/forum/addforum',params)
    return res
}