import {$get,$post} from '../../units/request'


//发件箱
export const $getSendEmail = async(params) => {
    let res = await $get('/email/getSendEmail',params)
    // console.log(res);
    
    return res
}  


//发送邮件
export const $addEmail = async (params) => {
    let res = await $post('/email/addEmail',params)
    return res
}
//删除发件箱的邮件
export const $delSendEmail = async (params) => {
    let res = await $post('/email/delSendEmail',params)
    return res
}
//查看邮件详情
export const $getEmailOne = async (params) => {
    let res = await $get('/email/getEmailOne',params)
    return res
    console.log(res);
    
}
//收件箱
export const $getGETEmail = async(params) => {
    let res = await $get('/email/getGETEmail',params)
    // console.log(res);
    return res
}

//删除收件箱的邮件
export const $delGetEmail = async (params) => {
    let res = await $post('/email/delGetEmail',params)
    return res
}

//查询收件箱邮件
export const $getsingleGetEmail = async(params) => {
    let res = await $get('/email/getsingleGetEmail',params)
    return res
}

export const $upload = async(params) => {
    let res = await $get('/email/getsingleGetEmail',params)
    return res
}