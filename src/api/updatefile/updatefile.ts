import {$get,$post} from '../../units/request'

export const $updatefile = async(params) => {
    let res = await $post('/updatefile/upload',params)
    return res
}