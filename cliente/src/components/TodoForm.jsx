import PropTypes from "prop-types";

function TodoForm({ nuevoTodo, editingId, handleOnChange, handleSubmit }) {
    // Componente que representa el formulario para agregar o editar una tarea
    return (
        <form onSubmit={handleSubmit}>
            {/* Campo de entrada para el título de la tarea */}
            <input
                className="form-control mb-2"
                type="text"
                placeholder="Ingrese un TODO"
                name="todo"
                value={nuevoTodo.todo}
                onChange={handleOnChange}
            />

            {/* Campo de entrada para la descripción de la tarea */}
            <textarea
                className="form-control mb-2"
                placeholder="Ingrese una descripción"
                name="descripcion"
                value={nuevoTodo.descripcion}
                onChange={handleOnChange}
            />

            {/* Botón para agregar o actualizar la tarea */}
            <div className="d-grid gap-2">
                <button className="btn btn-info" type="submit">
                    {editingId !== null ? "Actualizar" : "Agregar"}
                </button>
            </div>
            <hr />
        </form>
    );
}

// Propiedades requeridas y sus tipos esperados
TodoForm.propTypes = {
    nuevoTodo: PropTypes.object.isRequired, // Un objeto que representa los datos de la nueva tarea
    editingId: PropTypes.string, // Una cadena que representa el ID de la tarea en edición (opcional)
    handleOnChange: PropTypes.func.isRequired, // Una función para manejar los cambios en los campos de entrada
    handleSubmit: PropTypes.func.isRequired, // Una función para manejar el envío del formulario
};

export default TodoForm;
