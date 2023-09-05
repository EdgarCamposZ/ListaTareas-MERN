const express = require('express');
const Task = require('../models/models');
const router = express.Router();

// Ruta GET para obtener todas las tareas.
router.get('/', (req, res) => {
    // Utiliza el método 'Task.find' para buscar todas las tareas en la base de datos.
    Task.find((err, docs) => {
        if (err) console.log(err);
        res.json(docs);
    });
});

// Ruta POST para agregar una nueva tarea.
router.post('/', (req, res) => {
    // Crea una nueva instancia de 'Task' utilizando los datos en 'req.body'.
    const { todo, descripcion, isComplete } = req.body;
    const task = new Task({ todo, descripcion, isComplete });

    // Utiliza el método 'task.save' para guardar la nueva tarea en la base de datos.
    task.save((err, doc) => {
        if (err) console.log(err);
        res.json(doc);
    });
});

// Ruta PUT para actualizar una tarea existente.
router.put('/:id', (req, res) => {
    // Utiliza 'Task.findOneAndUpdate' para encontrar y actualizar la tarea por su '_id'.
    Task.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            todo: req.body.todo,
            descripcion: req.body.descripcion,
            isComplete: req.body.isComplete
        },
        {
            new: true
        },
        (err, doc) => {
            if (err) console.log(err);
            res.json(doc);
        }
    );
});

// Ruta DELETE para eliminar una tarea.
router.delete('/:id', (req, res) => {
    // Utiliza 'Task.findByIdAndDelete' para buscar y eliminar la tarea por su '_id'.
    Task.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) console.log(err);
        res.json(doc);
    });
});

module.exports = router;
