import React, { Component } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined, Unsubscribe } from "@material-ui/icons";
import SidebarChat from "./sidebarChat.js";
import db from "./firebase";
import { useState, useEffect } from "react";

import "./Sidebar.css";
import { useStateValue } from "./StateProvider.js";

function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [{ user }, dispatch] = useStateValue();
	useEffect(() => {
		const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
			setRooms(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src={user?.photoURL} />
				<div className="sidebar__header--right">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<SearchOutlined />
				<input
					placeholder="Search or start a new chat"
					type="text"
					className="sidebar__input"
					name="sidebar-search"
				/>
			</div>
			<div className="sidebar__chats">
				<SidebarChat addNewChat />
				{rooms.map(
					(room) => (
						console.log(room),
						(
							<SidebarChat
								key={room.id}
								id={room.id}
								name={room.data.name}
							/>
						)
					)
				)}
			</div>
		</div>
	);
}

export default Sidebar;
