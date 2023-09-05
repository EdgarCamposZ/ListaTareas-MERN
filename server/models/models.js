const mongoose = require('mongoose');

// Define un esquema (estructura) para el modelo 'Task' con los campos 'todo', 'descripcion' e 'isComplete'.
const TaskSchema = new mongoose.Schema({
    todo: String,         // Campo para almacenar la tarea o título de la tarea.
    descripcion: String,  // Campo para almacenar una descripción detallada de la tarea.
    isComplete: Boolean   // Campo para indicar si la tarea está completa o no.
});

// Crea un modelo 'Task' utilizando el esquema definido anteriormente.
const Task = mongoose.model('listatareas', TaskSchema);

// Exporta el modelo 'Task' para que pueda ser utilizado en otras partes de la aplicación.
module.exports = Task;
