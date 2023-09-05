import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function TodoControl() {
    // Declaración de estados
    const [todos, setTodos] = useState([]); // Almacena la lista de tareas
    const [nuevoTodo, setNuevoTodo] = useState({ // Almacena los datos de la nueva tarea
        todo: "",
        descripcion: "",
        isComplete: false,
    });
    const [editingId, setEditingId] = useState(null); // Almacena el ID de la tarea en edición

    useEffect(() => {
        // Efecto secundario: obtiene las tareas al cargar la página
        axios.get("http://localhost:8000/api/tasks").then((res) => {
            setTodos(res.data); // Actualiza el estado de las tareas con los datos obtenidos
        });
    }, []); // El efecto se ejecuta solo una vez debido a la dependencia vacía

    const handleOnChange = (e) => {
        // Maneja los cambios en los campos de entrada
        const { name, value } = e.target;
        setNuevoTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nuevoTodo.todo.trim() === "") {
            return;
        }

        if (editingId !== null) {
            // Edita una tarea existente si hay un ID de edición
            axios
                .put(`http://localhost:8000/api/tasks/${editingId}`, nuevoTodo)
                .then((res) => {
                    const updatedTodos = todos.map((todo) =>
                        todo._id === editingId ? res.data : todo
                    );
                    setTodos(updatedTodos); // Actualiza la lista de tareas con la tarea editada
                    setEditingId(null); // Limpia el ID de edición

                    // Limpia los campos de todo y descripción
                    setNuevoTodo({
                        todo: "",
                        descripcion: "",
                        isComplete: false,
                    });
                })
                .catch((err) => console.log(err));
        } else {
            // Agrega una nueva tarea si no hay un ID de edición
            axios
                .post("http://localhost:8000/api/tasks", nuevoTodo)
                .then((res) => {
                    setTodos([...todos, res.data]); // Agrega la nueva tarea a la lista existente

                    // Limpia los campos de todo y descripción
                    setNuevoTodo({
                        todo: "",
                        descripcion: "",
                        isComplete: false,
                    });
                })
                .catch((err) => console.log(err));
        }
    };

    const handleDelete = (id) => {
        // Maneja la eliminación de una tarea
        axios
            .delete(`http://localhost:8000/api/tasks/${id}`)
            .then(() => {
                const updatedTodos = todos.filter((todo) => todo._id !== id);
                setTodos(updatedTodos); // Actualiza la lista de tareas sin la tarea eliminada
            })
            .catch((err) => console.log(err));
    };

    const handleToggle = (id) => {
        // Maneja el cambio de estado (completo/incompleto) de una tarea
        const taskToToggle = todos.find((todo) => todo._id === id);
        const updatedIsComplete = !taskToToggle.isComplete;

        const updatedTodos = todos.map((todo) =>
            todo._id === id ? { ...todo, isComplete: updatedIsComplete } : todo
        );
        setTodos(updatedTodos); // Actualiza la lista de tareas con el estado modificado

        axios
            .put(`http://localhost:8000/api/tasks/${id}`, {
                ...taskToToggle,
                isComplete: updatedIsComplete,
            })
            .then(() => {
                // No se necesita ninguna acción adicional si la tarea se actualiza en el servidor
            })
            .catch((err) => {
                console.log(err);
                // Puedes manejar errores aquí, como mostrar mensajes de error al usuario
            });
    };

    const handleEdit = (id) => {
        // Maneja la edición de una tarea, cargando sus datos en el formulario
        const todoToEdit = todos.find((todo) => todo._id === id);
        setNuevoTodo({
            todo: todoToEdit.todo,
            descripcion: todoToEdit.descripcion,
            isComplete: todoToEdit.isComplete,
        });
        setEditingId(id); // Establece el ID de la tarea en edición
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <h2 className="text-info">Formulario</h2>
                    <TodoForm
                        nuevoTodo={nuevoTodo}
                        editingId={editingId}
                        handleOnChange={handleOnChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <div className="col-sm-6">
                    <h2 className="text-info">Tareas</h2>
                    <TodoList
                        todos={todos}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                </div>
            </div>
        </div>
    );
}

export default TodoControl;
