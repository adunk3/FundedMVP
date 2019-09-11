import React from 'react'

const ChatMessage = props => {
    return (

        <div class="received_withd_msg">
            <p>
                <strong>{props.name}</strong> <em>{props.message}</em>
            </p>
            <span class="time_date"> 11:01 AM    |    June 9</span>
        </div>




    );
}

export default ChatMessage;