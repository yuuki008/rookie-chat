import React, { useState, useCallback, useContext, useEffect} from 'react'
import {db} from '../firebase/index'
import '../assets/Room.css'
import { AuthContext } from '../AuthWrapper'
import {FirebaseTimestamp} from '../firebase/index';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles'
import { auth } from '../firebase/index';

const useStyles = makeStyles({
    button:{
        width: "15%",
        height: "65px",
        borderLeft: '2px solid var(--twitter-background)'
    },
    signout:{
        position: 'fixed',
        top: "20",
        left: "10%",
        fontWeight: 600,
        fontSize: '20px',
    }
})

const Room = (props) => {
    const user = useContext(AuthContext)
    const classes = useStyles()

    const [message, setMessage] = useState(''),
          [messages, setMessages] = useState([]);

    const inputMessage = useCallback((event) => {
        setMessage(event.target.value)
    },[setMessage])

    const MessagesSet = () => {
        db.collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            props.history.push('/signin')
            setMessages([])
        })
    }

    const SubmitMessage = () => {
        if(message){
            const commentRef = db.collection("comment").doc()
            const commentId = commentRef.id
            db.collection('messages').doc(commentId).set({uid: user.uid, username: user.username, message: message, timestamp: FirebaseTimestamp.now()})
            .then(() => {
               setMessage('')  
               MessagesSet()        
            })
        }
    }

    const time = (timestamp) => {
        const date = timestamp.toDate()
        return (date.getMonth() + 1) + "/"
        + ('00' + date.getDate()).slice(-2) + " "
        + ('00' + date.getHours()).slice(-2) + ":"
        + ('00' + date.getMinutes()).slice(-2)    
    }


    useEffect(() => {
        const scrollArea = document.getElementById('scroll-area')
        if(scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    })

    useEffect(() => {
        MessagesSet()
    },[])


    return (
        <div className="room">
            <Button className={classes.signout}
            onClick={() => signOut()}
            >
                サインアウト
            </Button>
            <div className="room__header">
                チャット
            </div>
            <div id={"scroll-area"} className="room__chat">
                {user !== null &&  (
                    messages.map((message, index) => 
                    <div key={index}>
                        <div className={`message ${message.uid === user.uid ? 'sent': 'received'}`}>
                        <div className="message__user">
                            {message.username}
                        </div>
                            <p>{message.message}</p>
                            <span>{time(message.timestamp)}</span>
                        </div>
                    </div>
                    )
                )}
            </div>
            <div className="room__post">
                <input
                    type="text"
                    placeholder="メッセージを送信する"
                    value={message}
                    onChange={(event) => inputMessage(event)}
                    />
                    <Button
                    className={classes.button}
                    onClick={() => SubmitMessage()}
                    >
                        送信
                    </Button>
            </div>
        </div>
    )
}

export default Room
