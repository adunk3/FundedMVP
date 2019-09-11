import React, { Component, useState } from 'react'

const ChatInput = props => {

    const [message, setMessage] = useState('');

    const submit = () => {
        props.onSubmitMessage(message);
        setMessage('');

    }

    return (



        <form className="type_msg"
            action="."
            onSubmit={e => {
                e.preventDefault()
                props.onSubmitMessage(message)
                setMessage('');
            }}
        >
            <div className="input_msg_write">
            <input
                className="write_msg"
                type="text"
                placeholder={'Enter message...'}
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button className="msg_send_btn" type="submit" ><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
        </form>

    );
}

export default ChatInput;