import React from "react";
import "../styles/FilterButton.css";

export default function FilterButton(props){
	return (
		<button type="button" className="" aria-pressed={props.isPressed} onClick={() => props.setFilter(props.name)}>
			{props.name}
		</button>
	);
}