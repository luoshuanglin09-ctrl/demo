import {$get,$post} from '../../units/request'

//查看帖子
export const $getPost = async() => {
    let res = await $get('/Post/getPost')
    // console.log(res);
    
    return res
}

//发送帖子
export const $addPosts = async (params) => {
    let res = await $post('/Post/addposts',params)
    return res
}

//发送评论
export const $addcomments = async (params) => {
    let res = await $post('/Post/addcomments',params)
    return res
}

export const $getcomments = async(params) => {
    let res = await $get('/Post/getcomments',params)
    // console.log(res);
    
    return res
}

//删除帖子
export const $delpots = async (params) => {
    let res = await $post('/Post/delpots',params)
    return res
}