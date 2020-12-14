import React, {useState} from "react";
import "../styles/Form.css";

export default function Form(props){
	const [name, setName] = useState('');

	function handleSubmit(event){
		event.preventDefault();
		if(name.length > 0){
			props.addTask(name);
			setName('');
		}
	}

	function handleChange(event){
		setName(event.target.value);
	}

	return(
		<form onSubmit={handleSubmit}>
			<h2 className="app-title">
				¿Qué haremos hoy?
			</h2>
			<div className="new-task">
				<input type="text" id="new-task-input" name="text" autoComplete="off" value={name} onChange={handleChange} />
				<button type="submit">
					Add
				</button>
			</div>
		</form>
	);
};