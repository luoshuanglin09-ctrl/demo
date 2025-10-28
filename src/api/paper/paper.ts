import {$get,$post} from '../../units/request'

//模糊查询论文
export const $getpaper = async(params) => {
    let res = await $get('/paper/getpaper',params)
    console.log(res);
    return res
}

//删除某个学生（管理员端）
export const $delpaper = async(params) => {
    let res = await $post('/paper/delpaper',params)
    return res
}

//模糊查询专利
export const $getpatent = async(params) => {
    let res = await $get('/paper/getpatent',params)
    console.log(res);
    return res
}

//模糊查询所有
export const $getall = async(params) => {
    let res = await $get('/paper/getall',params)
    console.log(res);
    return res
}

export const $getprize = async(params) => {
    let res = await $get('/paper/getprize',params)
    console.log(res);
    return res
}

export const $shenhe = async(params) => {
    let res = await $post('/paper/shenhe',params)
    console.log(res);
    return res
}