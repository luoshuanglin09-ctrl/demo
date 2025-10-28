import {$get,$post} from '../../units/request'

//查询所有学生
export const $getStuList = async() => {
    let res = await $get('/admin/getStuList')
    // console.log(res);
    
    return res
}
//添加学生信息（管理员端）
export const $addStudent = async(params) => {
    let res = await $post('/admin/addStudent',params)

    return res
}
//删除某个学生（管理员端）
export const $delStudent = async(params) => {
    let res = await $post('/admin/delStudent',params)
    return res
}
//修改某个学生信息（管理员端）
export const $editStudent = async(params) => {
    let res = await $post('/admin/editStudent',params)
    return res
}
//模糊查询学生
export const $getsingleStudent = async(params) => {
    let res = await $get('/admin/getsingleStudent',params)
    console.log(res);
    
    return res
}