import React, { Component, useState, useEffect } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import { useSelector, useDispatch } from 'react-redux'
import { set } from 'mongoose';





const Chat = (props) => {
    const URL = 'ws://localhost:3030'
    const [messages, setMessages] = useState([]);
    const [enter, setEnter] = useState(0);
    const [ws, setWs] = useState(new WebSocket(URL));
    const currentUser = useSelector(state => state.currentUser);
 

    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            if(enter === 0){
        
                submitMessage("entered");
                setEnter(1);
    
            }
            // addMessage({message: `${currentUser.name} has entered`})
        }
        ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data);
            addMessage(message);
        }
        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            setWs(new WebSocket(URL));
        }


        
    });

    const addMessage = message => {
        setMessages([...messages, message]);
    }
    
 

    const submitMessage = messageString => {
        const message = { name: `${currentUser.name} (${currentUser.userType})`, message: messageString }
        ws.send(JSON.stringify(message))
        addMessage(message)
    }

    return (
        <div>
            <div className="container">
                <div className="messaging">
                    <div class="inbox_msg">
                        <div class="inbox_people">
                            <div class="headind_srch">
                                <div class="recent_heading">
                                    <h4>Recent</h4>
                                </div>
                                <div class="srch_bar">
                                    <div class="stylish-input-group">
                                        <input type="text" class="search-bar" placeholder="Search" ></input>
                                        <span class="input-group-addon">
                                            <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="inbox_chat">
                                {/* <div class="chat_list active_chat">
                                    <div class="chat_people">
                                        <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"></img> </div>
                                        <div class="chat_ib">
                                            <h5>Jay Jones <span class="chat_date">Jul 23</span></h5>
                                            <p>I cannot give you $30,000.</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="mesgs">
                            <div className="msg_history">
                                <div className="incoming_msg">
                                    <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="xxx"></img> </div>
                                    <div class="received_msg">
                                        <div class="received_withd_msg">
                                            {messages.map((message, index) =>
                                                <ChatMessage
                                                    key={index}
                                                    message={message.message}
                                                    name={message.name}
                                                />,
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ChatInput
                                ws={ws}
                                onSubmitMessage={messageString => submitMessage(messageString)}
                            />
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
}

export default Chat;