import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'

const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: 'b9UWBr9m-4wI2WcEghU8AN68s_4i55a2Cml_wXMZJycr'
  }),
  serviceUrl: process.env.SERVICE_URL
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const results = await assistant.message({
        assistantId: process.env.ASSISTANT_ID,
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
