import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'

const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: '2YvsmjchO_TulGpCctzUx5eMcLawQACJNNeK5pisMLRv'
  }),
  serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com'
})

const sendMsg = async (e, value, sessionId, messageArray, setMessageArray, setValue) => {
  if (value === '') return;
  e.preventDefault();
  const tmpMessageArray = messageArray
  tmpMessageArray.push(<p key={tmpMessageArray.length + 1} style={{paddingBottom: '8px'}}>
      <span style={{color: 'gray'}}> {`ME [${(new Date()).toLocaleTimeString()}]`}</span>
      {`: ${value}`}
    </p>)
  setValue('')
  setMessageArray([...tmpMessageArray])
  try {
    let results = await fetch(`${document.location.origin}/api/watson/hello`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId: sessionId,
        text: value
      })
    })

    let resultsJson = await results.json();

    tmpMessageArray.push(<p key={tmpMessageArray.length + 1} style={{paddingBottom: '8px'}}> {`WATSON [${(new Date()).toLocaleTimeString()}]: ${resultsJson.result}`}</p>)
    setMessageArray([...tmpMessageArray])
  } catch(err) {
    console.warn(err)
  }
}

export default function Home({sessionId}) {
  const [value, setValue] = useState('');
  const [messageArray, setMessageArray] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>PJN Project</title>
      </Head>

      <div className={styles.bodyWrapper}>

        <div className={styles.messagesWrapper}>
          {messageArray}
        </div>

        <div className={styles.inputWrapper}>
          <input className={styles.inputContainer} 
            placeholder='Type message for chatbot here :)'
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onKeyPress={(event) => {
              if(event.key === 'Enter') sendMsg(event, value, sessionId, messageArray, setMessageArray, setValue)
            }}
          />
          <button 
            onClick={(event) => sendMsg(event, value, sessionId, messageArray, setMessageArray, setValue)}
          > Send </button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const result = await assistant.createSession({assistantId: 'dc1ed0bb-bb48-41ce-bd4c-dd7beda5e99d'})
    return {
      props: {
        sessionId: result.result.session_id
      }
    }

  } catch (err) {
    console.warn(err)
  }
  return {
    props: {}
  }
}