import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'

const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: 'BDpwt6m68XDEL7i7RK6_kpS05xCwvCf-goKvo1EqgR3H'
  }),
  serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com',
  disableSslVerification: true,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const results = await assistant.message({
        assistantId: '409436a7-ab88-46c3-93e0-b7b8dd6cd7d9',
        sessionId: req.body.sessionId,
        input: {
          'message_type': 'text',
          'text': req.body.msg
        }
      })

      res.status(200).json({ result: results.result.output.generic[0].text })
    } catch (err) {
      console.error(err)
    }
  }
}
