const express = require('express');
const { bodyParser } = require('json-server');

const router = express.Router();

module.exports = (params) =>{

   const {todoService} = params;

   router.get('/', async(req, res) =>{
    const todoData = await todoService.getData()
    return res.json(todoData);

    })

    router.get('/todoStatus', async(req, res) =>{
        const todoData = await todoService.getStatus()
        return res.send(todoData);
    
    })

    router.get('/todoCategories', async(req, res) =>{
        const todoData = await todoService.getCategories()
        return res.send(todoData);
    
    })

    router.get('/:id', async(req, res) =>{
        const id = Number(req.params.id);
        console.log(id)
        const todoData = await todoService.getTodoById(id)
        return res.json(todoData);
    
    })

    router.delete('/delTodo/:id', async(req, res) =>{
        const id = Number(req.params.id);
        console.log("del",id)
        const todoData = await todoService.deleteTodo(id)
        return res.json(todoData);
    
    })

    router.post('/', bodyParser, async(req, res) =>{        
        const obj = req.body
        const todoData = await todoService.addTodo(obj)
        if(!todoData){
            return res.json(false);
        }
        
        return res.json(true);
    })

    router.put('/updateTodo/:id',bodyParser, async(req, res) =>{
        const id = Number(req.params.id);
        const obj = req.body
        // console.log("update", obj, id)
        const todoData = await todoService.updateTodo(id, obj)
        if(!todoData){
            return res.json(false);
        }
        
        return res.json(true);
    
    })
    return router;
}