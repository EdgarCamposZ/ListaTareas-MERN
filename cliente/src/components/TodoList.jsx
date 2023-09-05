import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

function TodoList({ todos, handleEdit, handleDelete, handleToggle }) {
    // Componente que muestra la lista de tareas
    return (
        <table className="table mt-2">
            <thead>
                <tr>
                    <th>Tarea</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => (
                    // Mapea cada tarea en la lista y muestra un componente TodoItem para cada una
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                ))}
            </tbody>
        </table>
    );
}

// Propiedades requeridas y sus tipos esperados
TodoList.propTypes = {
    todos: PropTypes.array.isRequired, // Un array de objetos que representa las tareas
    handleEdit: PropTypes.func.isRequired, // Una función para manejar la edición de una tarea
    handleDelete: PropTypes.func.isRequired, // Una función para manejar la eliminación de una tarea
    handleToggle: PropTypes.func.isRequired, // Una función para manejar el cambio de estado (completo/incompleto) de una tarea
};

export default TodoList;
