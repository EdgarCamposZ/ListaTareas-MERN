import PropTypes from "prop-types";

function TodoItem({ todo, handleEdit, handleDelete, handleToggle }) {
    // Componente que representa una tarea individual en la lista
    return (
        <tr
            className={todo.isComplete === true ? "table-success" : "table-secondary"}
        >
            {/* Columna de la tarea */}
            <td className={todo.isComplete ? "completed-task" : ""}>{todo.todo}</td>

            {/* Columna de la descripción */}
            <td className={todo.isComplete ? "completed-task" : ""}>
                {todo.descripcion}
            </td>

            {/* Columna de acciones */}
            <td className="actions-cell">
                {/* Botón de edición */}
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(todo._id)}
                >
                    <i className="fas fa-edit"></i>
                </button>

                {/* Botón de eliminación */}
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(todo._id)}
                >
                    <i className="fas fa-trash"></i>
                </button>

                {/* Botón de cambio de estado (completo/incompleto) */}
                <button
                    className={`btn btn-sm ${todo.isComplete ? "btn-success" : "btn-warning"
                        }`}
                    onClick={() => handleToggle(todo._id)}
                >
                    {todo.isComplete ? (
                        <i className="fas fa-check"></i>
                    ) : (
                        <i className="fas fa-undo"></i>
                    )}
                </button>
            </td>
        </tr>
    );
}

// Propiedades requeridas y sus tipos esperados
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired, // Un objeto que representa una tarea
    handleEdit: PropTypes.func.isRequired, // Una función para manejar la edición de una tarea
    handleDelete: PropTypes.func.isRequired, // Una función para manejar la eliminación de una tarea
    handleToggle: PropTypes.func.isRequired, // Una función para manejar el cambio de estado (completo/incompleto) de una tarea
};

export default TodoItem;
