import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';


import {createSocketConnection} from '../utils/socket.js';
import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';



function Chat() {
   
    const user=useSelector((store)=>store.user);

     const userId=user.userData._id;
     
  

    const {targetUserId}=useParams();
    let[message,setMessage]=useState([]);
    let[data,setData]=useState("");

    const chatMessages=async()=>{
      const chat=await axios.get(BASE_URL+"/chat/"+ targetUserId,
        {withCredentials :true}
      );
      console.log("chat ==" , chat.data.messages);

      const chatMessages=chat?.data.messages.map((msg)=>{
        const{senderId,text}=msg;
        return {
          firstName : senderId?.firstName,
          lastName : senderId?.lastName,
          text 
        }
        
      
      })
      setMessage(chatMessages);
    }
    useEffect(()=>{
      chatMessages();
    },[])
   
    useEffect(()=>{
const socket=createSocketConnection();
socket.emit("joinchat" ,({userId,targetUserId,firstName: user.userData.firstName}));

socket.on("receivedMessage", ({firstName, lastName, text})=>{
  
    setMessage((prevMessages) => [...prevMessages, { firstName, lastName,text }]);
  
})
return()=>{
  socket.disconnect();
}

    },[userId])

    const sendMessage=()=>{
        const socket=createSocketConnection();
        socket.emit("sendMessage" ,({userId,
          targetUserId,
          firstName:user.userData.firstName,
        lastName:user.userData.lastName,
          text:data}));
          setData("");
    }

   
  return (
    <div>

<div  className="flex flex-col border border-gray-700 bg-black text-white p-6 mx-auto my-10 h-[70vh] w-[50vw] rounded-lg shadow-lg">

<h1 className="p-4 text-lg font-semibold text-center border-b border-gray-600">

  Chat
 
</h1>


<div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600">
{message.map((msg,index)=>
    <div key={index}
      className={`flex flex-col space-y-1 ${user.userData.firstName=== msg.firstName ? "items-start" : "items-end"}`}
    >
      <span className="text-xs opacity-50">{`${msg.firstName }  ${ msg.lastName}`}</span>
      <div className="bg-gray-800 p-3 rounded-lg max-w-[75%] shadow-md">
      <p>{msg.text}</p>
      </div>
      <span className="text-xs opacity-50">Just now</span>
    </div>
)}
</div>

<div className="flex items-center gap-3 p-4 border-t border-gray-600 bg-gray-900">
  <input
    type="text" 
    value={data}
    onChange={(e)=>setData(e.target.value)}
    placeholder="Enter your message..."
    className="flex-1 bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
   
  />
  <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all shadow-md" onClick={sendMessage}>
    Send
  </button>

</div>

</div>

    
    </div>
  )
}

export default Chat