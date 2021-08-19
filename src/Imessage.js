import React from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./Imessage.css";

export default function Imessage() {
  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
}
