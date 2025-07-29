import Todo from "../models/todoModel.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title });
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task" });
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(404).json({ message: "Task not found" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(404).json({ message: "Failed to delete" });
  }
};
