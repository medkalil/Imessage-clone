import { IconButton } from "@material-ui/core";
import { MicNone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import Message from "./Message";
import { selectChatId, selectChatName } from "./features/chatSlice";
import { useSelector } from "react-redux";
import db from "./Firebase";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";

export default function Chat() {
  const [input, setInput] = useState("");
  const selectedChatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapchat) =>
          setMessages(
            snapchat.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
    });

    setInput("");
  };

  return (
    <div className="chat">
      {/* char header */}
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{selectedChatName} </span>
        </h4>
        <strong>Details</strong>
      </div>
      {/* chat message */}
      <div className="chat__message">
        {messages.map(({ id, data }) => (
          <Message key={id} contents={data} />
        ))}
      </div>
      {/* chat input */}
      <div className="chat__input">
        <form>
          <input
            placeholder="enter the message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </form>
        <IconButton>
          <MicNone className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}
