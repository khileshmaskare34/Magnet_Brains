const express = require('express');

const
 { 
    createTask, 
    getTasks, 
    getTask, 
    updateTask, 
    deleteTask 
} = require('../controllers/taskControllers');

const router = express.Router();
const { checkTokenExp } = require('../middleware/AOuth')

router.get('/', (req, res)=>{
    res.send("tasks route here")
})

router.post('/', checkTokenExp, createTask)
router.get('/', checkTokenExp, getTasks)
router.get('/:id', checkTokenExp, getTask)
router.put('/:id', checkTokenExp, updateTask)
router.delete('/:id', checkTokenExp, deleteTask)

module.exports = router;