import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./Firebase";
import { useState } from "react";
import { useEffect } from "react";

export default function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapchat) =>
      setChats(
        snapchat.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  const addChat = () => {
    const chatName = prompt("enter a chatName");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar_avatar"
        />
        <div className="sidebar__input">
          <SearchOutlinedIcon />
          <input type="text" />
        </div>
        <IconButton variant="outline" className="sidebar__inputButton">
          <RateReviewOutlinedIcon onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}
