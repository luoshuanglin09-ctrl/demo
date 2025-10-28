import {$get,$post} from '../../units/request'

//查看比赛
export const $getcompetition = async() => {
    let res = await $get('/competition/getcompetition')
    // console.log(res);
    
    return res
}
