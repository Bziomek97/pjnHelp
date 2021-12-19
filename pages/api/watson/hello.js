import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'

const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: 'K_qPDnUu-Lcbtb6ACcn4HABOq2m58gkVD06rsrB-zXg8'
  }),
  serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com',
  disableSslVerification: true,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const results = await assistant.message({
        assistantId: 'c6dc3fee-ded8-4624-8972-5cb3dc0a4450',
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
