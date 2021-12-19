import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'

const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: 'BDpwt6m68XDEL7i7RK6_kpS05xCwvCf-goKvo1EqgR3H'
  }),
  serviceUrl: process.env.SERVICE_URL
})

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}



// export async function getStaticProps() {
//   assistant.createSession({
//     assistantId: process.env.ASSISTANT_ID
//   }).then(res => {
//     console.log(JSON.stringify(res.result, null, 2));
//   }).catch(err => {
//     console.log(err);
//   });
  
//   return {
//     props: {a: '1'}
//   };
// }

