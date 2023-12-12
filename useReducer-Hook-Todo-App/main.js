// Hooks
const { useReducer, useState } = React;

const actions = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  COMPLETE_TODO: "COMPLETE_TODO",
};

function App() {
  const stateReducer = (state, action) => {
    switch (action.type) {
      case actions.ADD_TODO:
        return [
          ...state,
          { todo: action.payload, id: Math.random() * 1000, completed: false },
        ];
      case actions.REMOVE_TODO:
        return state.filter((item) => item.id !== action.payload.id);
      case actions.COMPLETE_TODO:
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
      default:
        return state;
    }
  };
  const [todoArr, dispatch] = useReducer(stateReducer, []);
  console.log(todoArr);
  return (
    <div className="root-wrapper">
      <AddTodo dispatch={dispatch} />
      <Todos todoArr={todoArr} dispatch={dispatch} />
    </div>
  );
}

function AddTodo({ dispatch }) {
  const [todoInput, setTodoInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoInput.length > 0) {
      alert("Todo String can't be empty!");
      return;
    }
    dispatch({ type: actions.ADD_TODO, payload: todoInput });
    setTodoInput("");
  };
  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button>Add Todo</button>
    </form>
  );
}

function Todos({ todoArr, dispatch }) {
  return (
    <div className="todos-wrapper">
      {todoArr.map(({ todo, completed, id }, index) => {
        return (
          <div key={index} className="todo">
            <h2 className={completed ? "completed" : ""}>{todo}</h2>
            <button
              onClick={() =>
                dispatch({ type: actions.COMPLETE_TODO, payload: { id } })
              }
              className="todo-btn complete"
            >
              Complete
            </button>
            <button
              onClick={() =>
                dispatch({ type: actions.REMOVE_TODO, payload: { id } })
              }
              className="todo-btn delete"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
