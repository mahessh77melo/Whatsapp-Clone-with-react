import React from "react";
import { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
	const [seed, setSeed] = useState("");
	const [messages, setMessages] = useState("");
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	useEffect(() => {
		if (id) {
			db.collection("rooms")
				.doc(id)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snap) =>
					setMessages(snap.docs.map((doc) => doc.data()))
				);
		}
	}, [id]);

	const createChat = () => {
		const roomName = prompt("Please enter the room name for chat");
		if (roomName) {
			// do some clever stuff
			db.collection("rooms").add({
				name: roomName,
			});
		}
	};

	return !addNewChat ? (
		<Link
			style={{ textDecoration: "none", color: "#444" }}
			to={`/rooms/${id}`}
		>
			<div className="sidebarChat">
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>

				<div className="sidebar__info">
					<h2>{name}</h2>
					<p>{messages[0]?.message}</p>
				</div>
			</div>
		</Link>
	) : (
		<div className="sidebarChat" onClick={createChat}>
			<AddBoxIcon />
			<h2 className="addnew">Add new room</h2>
		</div>
	);
}

export default SidebarChat;
