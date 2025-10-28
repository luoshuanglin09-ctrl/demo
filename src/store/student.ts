import {defineStore} from 'pinia'

export default defineStore('student',{
    state(){
        return{
            student:{
                stuname:'',
                type:''
            }
            
            
        }
        
    },
    actions:{
        setStu(student: { stuname: string },type:{type:string}): void {
            
            this.student = student;
            this.type = type;
          },
        clearStu(){
            sessionStorage.clear()
            this.student ={
                stuname:''
            }
        }
    }
}
) 
