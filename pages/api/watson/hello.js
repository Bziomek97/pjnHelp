import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'

const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: 'b9UWBr9m-4wI2WcEghU8AN68s_4i55a2Cml_wXMZJycr'
  }),
  serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com',
  disableSslVerification: true,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const results = await assistant.message({
        assistantId: 'dc1ed0bb-bb48-41ce-bd4c-dd7beda5e99d',
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
