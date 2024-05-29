const Task = require("../model/Task");

const taskController = {}

taskController.createTask = async (req, res) => {
    try{
        const {task, isComplete} = req.body;
        const {userId} = req
        const newTask = new Task({task, isComplete, author: userId})
        await newTask.save()
        res.status(200).json({status: "ok", data: newTask})
    } catch (err) {
        res.status(400).json({status: "fail", error: err})
    }
}

taskController.getTask = async (req, res) => {
    try{
        const taskList = await Task.find({}).populate("author").select("-__v") // populate: 서로 다른 컬렉션에 있는 ref document를 join-like (외래키를 중심으로!)
        res.status(200).json({status: "ok", data: taskList})
    } catch (err) {
        res.status(400).json({status: "fail", error: err})
    }
}

taskController.updateTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id).select("-__v")
        if (!task) {
            throw new Error("you don't have any task")
        }
        const fields = Object.keys(req.body)
        fields.map((item) => ( task[item] = req.body[item] ))
        await task.save()
        res.status(200).json({status: "ok", data: task})
    } catch (err) {
        res.status(400).json({status: "fail", error: err})
    }
}

taskController.deleteTask = async (req, res) => {
    try{
        const deleteItem = await Task.findByIdAndDelete(req.params.id).select("-__v")
        res.status(200).json({status: "ok", data: deleteItem})
    } catch (err) {
        res.status(400).json({status: "fail", error: err})
    }
}

module.exports = taskController