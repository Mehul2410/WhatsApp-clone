import React, { useEffect, useState } from 'react'
import "./Chat.css"
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from '@material-ui/core';
import {SearchOutlined} from "@material-ui/icons"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from "react-router-dom";
import db from './firebase'
import firebase from 'firebase';
import { useStateValue } from './StateProvider';
 

const Chat = () => {
    const [seed , setSeed] = useState("");
    const [input ,setInput] =useState("");
    const {roomId} = useParams();
    const [messages,setMessages]= useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [roomName ,setRoomName ] = useState("");

    useEffect (() => {
            if(roomId) {
                db.collection('rooms').doc(roomId).onSnapshot((snapshot) => setRoomName(snapshot.data().name)); 

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc' )
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
            };
    } , [roomId] );

    useEffect(()=> {
        
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId] );

    const sendMessage = (e) => {
            e.preventDefault();
            
            db.collection('rooms').doc(roomId).collection
            ('messages').add({
               message:input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <IconButton disableTouchRipple={true}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            </IconButton>
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                    <p>
                    last seen{" "}
                    {new Date(
                        messages[messages.length -1]?.timestamp?.toDate()
                    ).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                    <SearchOutlined />
                    </IconButton>
                    <IconButton>
                    <AttachFileOutlinedIcon /> 
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
            {messages.map((message) => (
                <p 
                className={`chat__message
                ${message.name === user.displayName && 'chat__reciever'}`}>
               <span className="chat__name">{message.name}
               </span>{message.message}
               <span className="chat__timestamp">
                   {new Date(message.timestamp?.toDate()).toUTCString()}
               </span>
               </p>
            ))}
                

            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input  value={input} onChange={(e) =>
                    setInput(e.target.value)} 
                    placeholder="Type a message" 
                    type="text" />
                    <button onClick={sendMessage} type="submit">Send message</button>
                </form>
                <MicIcon />
            </div>   

        </div>
    )
}

export default Chat
