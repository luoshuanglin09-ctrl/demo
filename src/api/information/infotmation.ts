import {$get,$post} from '../../units/request'

//模糊查询学生
export const $getourinfomation = async(params) => {
    let res = await $get('/information/getourinfomation',params)
    console.log(res);
    return res
}

export const $getourtx = async(params) => {
    let response = await $get('/information/getourtx',params)
    return response
}

export const $editStudentInfor = async(params) => {
    let res = await $post('/information/editStudentInfor',params)
    return res
}
// export const $getourinfomation = async (params:object) => {
//     let res = await $get('/information/getourinfomation',params);
//     // console.log(res,"teachone");
//     // sessionStorage.setItem('userLogin', res)
//     return res
//   }
  
//查询管理员信息
export const $getadmininformation = async(params) => {
    let res = await $get('/information/getadmininformation',params)
    console.log(res);
    return res
}