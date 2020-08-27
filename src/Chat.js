import React from "react";
import "./Chat.css";
import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert } from "@material-ui/icons";
import { SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
	const [input, setInput] = useState("");
	const [{ user }, dispatch] = useStateValue();
	const [seed, setSeed] = useState("");
	const { roomID } = useParams();
	const [roomName, setRoomName] = useState("LinkedIN");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		console.log("Chat useeffect", roomID, roomName);
		if (roomID) {
			console.log("room id exists");
			db.collection("rooms")
				.doc(roomID)
				.onSnapshot((snapshot) => setRoomName(snapshot.data().name));
			db.collection("rooms")
				.doc(roomID)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [roomID, roomName]);
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		console.log("you typed " + input);
		if (input) {
			db.collection("rooms").doc(roomID).collection("messages").add({
				message: input,
				name: user.displayName,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		}
		setInput("");
	};
	return (
		<div className="chat">
			<div className="chat__header">
				<IconButton>
					<Avatar
						src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
					/>
				</IconButton>
				<div className="chat__header--info">
					<h3 className="room__name">{roomName}</h3>
					<p>
						Last Seen{" "}
						{new Date(
							messages[messages.length - 1]?.timestamp?.toDate()
						).toUTCString()}
					</p>
				</div>
				<div className="chat__header--right">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{messages.map((message) => (
					<p
						id={`${user.displayName}`}
						className={`chat__message ${
							message.name === user.displayName &&
							"chat__reciever"
						}`}
					>
						<span className="chat__name">{message.name}</span>
						{message.message}
						<span className="chat__time">
							{new Date(
								message.timestamp?.toDate()
							).toUTCString()}
						</span>
					</p>
				))}
			</div>
			<div className="chat__footer">
				<InsertEmoticonIcon />
				<form className="chat__form">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
					<MicIcon />
					<IconButton>
						<button onClick={sendMessage} type="submit">
							<SendIcon />
						</button>
					</IconButton>
				</form>
			</div>
		</div>
	);
}

export default Chat;
