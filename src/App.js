import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
	Todas: () => true,
	Pendientes: task => !task.completed,
	Terminadas: task => task.completed
  };
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {
	const [filter, setFilter] = useState('Todas');

	const [tasks, setTasks] = useState([
		{name:"Darth Vader", id:"todo-0", completed: true},
		{name:"Darth Sidious", id:"todo-1", completed: false},
		{name:"Darth Plagueis, The Wise", id:"todo-2", completed: true},
	]);

	const taskList = tasks
	.filter(FILTER_MAP[filter])
	.map(task => (<Todo
					id={task.id}
					key={task.id}
					completed={task.completed}
					name={task.name}
					toggleTaskComplete={toggleTaskComplete}
					deleteTask={deleteTask}
					editTask={editTask}
				/>) 
	);

	const tasksNoun = taskList.length !== 1 ? 'tareas pendientes' : 'tarea pendiente';
	const headerText = `Tenemos ${taskList.length} ${tasksNoun}.`;

	const filterList = FILTER_NAMES.map(
		name => (<FilterButton
					key={name}
					name={name}
					isPressed={name === filter}
					setFilter={setFilter}
				/>)
	);

	function toggleTaskComplete(id){
		const updatedTasks = tasks.map(task => {
			if(id === task.id){
				return {...task, completed: !task.completed}
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function deleteTask(id){
		const updatedTasks = tasks.filter(task => id != task.id);
		setTasks(updatedTasks);
	}

	function editTask(id, newName){
		const updatedTasks = tasks.map(task => {
			if(id === task.id){
				return {...task, name: newName}
			}
			return task;
		});
		setTasks (updatedTasks);
	}

	function addTask(name){
		const newTask = {name: name, id: "todo-" + uuidv4(), completed: false};
		setTasks([...tasks, newTask]);
	}

	return (
		<div className="main">
			<h1>ToDoLi</h1>
				<Form addTask={addTask} />
			<div className="filter-buttons">
				{filterList}
			</div>
			<h2 id="list-heading">
				{headerText}
			</h2>
			<ul role="list" className="todo-list" aria-labelledby="list-heading">
				{taskList}
			</ul>
		</div>
	);
}
