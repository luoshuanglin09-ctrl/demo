import {defineStore} from 'pinia'

export default defineStore('user',{
    state(){
        return{
            user:{
                username:'',
                type:''
            }
            
            
        }
        
    },
    actions:{
        setUser(user: { username: string },type:{type:string}): void {
            // console.log('Setting user:', user);
            this.user = user;
            this.type = type;
          },
        clearUser(){
            sessionStorage.clear()
            this.user ={
                username:''
            }
        }
    }
}
) 
