import {$get,$post} from '../../units/request'

//查看比赛
export const $getcompetition = async() => {
    let res = await $get('/competition/getcompetition')
    // console.log(res);
    
    return res
}

//删除比赛
export const $delCompetition = async(params) => {
    let res = await $post('/competition/delcompetition',params)
    return res
}

//添加比赛
export const $addCompetition = async(params) => {
    let res = await $post('/competition/addcompetition',params)
    return res
}