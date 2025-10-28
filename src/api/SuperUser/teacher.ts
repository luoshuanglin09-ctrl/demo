import {$get,$post} from '../../units/request'

//查询所有教师
export const $getTeachList = async() => {
    let res = await $get('/admin/getTeachList')
    // console.log(res);
    
    return res
}

//添加教师信息（管理员端）
export const $addTeacher = async(params) => {
    let res = await $post('/admin/addTeacher',params)
    return res
}

//删除某个教职工（管理员端）
export const $delTeacher = async(params) => {
    let res = await $post('/admin/delTeacher',params)
    return res
}
//修改某个教职工信息（管理员端）
export const $editTeacher = async(params) => {
    let res = await $post('/admin/editTeacher',params)
    return res
}
//模糊查询教职工
export const $getsingleTeacher = async(params) => {
    let res = await $get('/admin/getsingleTeacher',params)
    console.log(res);
    
    return res
}