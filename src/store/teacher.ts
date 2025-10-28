import {defineStore} from 'pinia'

export default defineStore('teacher',{
    state(){
        return{
            teacher:{
                teachname:'',
                type:''
            }
            
            
        }
        
    },
    actions:{
        setTeach(teacher: { teachname: string },type:{type:string}): void {
            
            this.teacher = teacher;
            this.type = type;
          },
        clearTeach(){
            sessionStorage.clear()
            this.teacher ={
                teachname:''
            }
        }
    }
}
) 
