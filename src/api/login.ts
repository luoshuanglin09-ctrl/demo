import {$post,$get} from '../units/request.ts'
import { ElNotification } from 'element-plus'
//登录方法
export const $Login = async (params: object) => {


    let res = await $get('/login/getuser', params)
    console.log(res);
    if(res.code == 200){
        sessionStorage.setItem('token',res.token)
        // console.log(sessionStorage);
        if (!res.data || res.data.length === 0) {
            ElNotification({
            title: '通知',
            message: '登录失败请重试',
            type: 'error',
          })
          return false    
        }else{
           sessionStorage.setItem('user', JSON.stringify(res.data))
          //  console.log(sessionStorage,'res.data');
           
            ElNotification({
            title: '通知',
            message: '登录成功',
            type: 'success',
          })  
          
          return true
        }
    }
}

//获取一个账户
export const $getUserOne = async (params:object) => {
  let res = await $get('/login/getUserOne',params);
  console.log(res,"userres");
  // sessionStorage.setItem('userLogin', res)
  return res
}

export const $getTeachOne = async (params:object) => {
  let res = await $get('/login/getTeachOne',params);
  // console.log(res,"teachone");
  // sessionStorage.setItem('userLogin', res)
  return res
}

export const $getStuOne = async (params:object) => {
  let res = await $get('/login/getStuOne',params);
  console.log(res,"student_res");
  
  return res
}

