const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class TodoService{

    constructor(datafile){
        this.datafile = datafile;
    }

    async addTodo(obj) {
        const data = (await this.getData()) || [];
        data.unshift(obj);
        return writeFile(this.datafile, JSON.stringify(data));
      }

      async getStatus() {
        const data = (await this.getData()) || [];
        let todoStatus = [...new Set( data.map(todo => todo.todo_status))]        
        return todoStatus;
      }

      async getCategories() {
        const data = (await this.getData()) || [];
        let todoCategories = [...new Set( data.map(todo => todo.todo_category))]        
        return todoCategories;
      }

    async deleteTodo(id) {
        let data = (await this.getData()) || [];
        data.map(elm => {
          if(elm.id === id){
            let index = data.indexOf(elm)
            data.splice(index, 1)
           return 
          }
          return
        })
        return writeFile(this.datafile, JSON.stringify(data));
      }

    async updateTodo(id, obj) {
        let data = (await this.getData()) || [];
        // console.log("dataunmodified", data)
        data = data.map(d => {
          if(d.id === id){
            return{...d, ...obj}
          }
          return d;
        })  
        // console.log("datamodified", data)     
        return writeFile(this.datafile, JSON.stringify(data));
      }

    async getTodoById(id) {
        const dataID = await this.getData();
        const todoID = dataID.find(elm => {          
         return elm.id === id});        
        if (!todoID) return null;
        return todoID;
      }
    


    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        if (!data) return [];
        return JSON.parse(data);
      }
}
module.exports = TodoService;