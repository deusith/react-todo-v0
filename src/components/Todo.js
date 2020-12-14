import React, {useState} from "react";
import "../styles/Todo.css";

export default function Todo(props){
	const [isEditing, setEditing] = useState(false);
	const [newName, setNewName] = useState('');

	function handleChange(event){
		setNewName(event.target.value);
	}

	function handleSubmit(event){
		event.preventDefault();
		props.editTask(props.id, newName);
		setNewName('');
		setEditing(false);
	}

	const editingTemplate = (
		<form className="editing-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder={`Nuevo nombre para "${props.name}".`}
				value={newName}
				onChange={handleChange}
			/>
			<div className="actions">
				<button className="-save">
					Ok
				</button>
				<button className="-cancel" onClick={() => setEditing(false)}>
					No
				</button>
			</div>
		</form>
	);

	const viewTemplate = (
		<div className="todo-item">
			<div className="text">
				<label htmlFor={props.id}>
					<input type="checkbox" id={props.id} defaultChecked={props.completed} onChange={() => props.toggleTaskComplete(props.id)} />
					{props.name}
				</label>
			</div>
			<div className="actions">
				<button onClick={() => setEditing(true)}>
					Edi
				</button>
				<button onClick={() => props.deleteTask(props.id)}>
					Del
				</button>
			</div>
		</div>
	);
	return (
		<li>
			{isEditing ? editingTemplate : viewTemplate}
		</li>
	);
}