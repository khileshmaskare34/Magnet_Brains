const express = require('express');

const
 { 
    createTask, 
    getTasks, 
    getTask, 
    updateTask, 
    deleteTask, 
    getAllTask
} = require('../controllers/taskControllers');

const router = express.Router();
const { checkTokenExp } = require('../middleware/AOuth')


router.post('/', checkTokenExp, createTask)
router.get('/getAllTask', getAllTask)
router.get('/', checkTokenExp, getTasks)
router.get('/:id', getTask)
router.put('/:id', checkTokenExp, updateTask)
router.delete('/:id', checkTokenExp, deleteTask)

module.exports = router;