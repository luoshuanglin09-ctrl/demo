import {$get,$post} from '../../units/request'

//查询所有管理员
export const $getAdminList = async() => {
    let res = await $get('/admin/getAdminList')
    // console.log(res);
    
    return res
}
//添加管理员信息（管理员端）
export const $addAdmin = async(params) => {
    let res = await $post('/admin/addAdmin',params)

    return res
}
//删除某个管理员（管理员端）
export const $delAdmin = async(params) => {
    let res = await $post('/admin/delAdmin',params)
    return res
}
//修改某个管理员信息（管理员端）
export const $editAdmin = async(params) => {
    let res = await $post('/admin/editAdmin',params)
    return res
}
//模糊查询管理员
export const $getsingleAdmin = async(params) => {
    let res = await $get('/admin/getsingleAdmin',params)
    console.log(res);
    
    return res
}