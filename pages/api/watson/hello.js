import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'

const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: '2YvsmjchO_TulGpCctzUx5eMcLawQACJNNeK5pisMLRv'
  }),
  serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com',
})

export default async function handler(req, res) {
  console.warn(req.body)
  if (req.method === 'POST') {
    try {
      const results = await assistant.message({
        assistantId: 'dc1ed0bb-bb48-41ce-bd4c-dd7beda5e99d',
        sessionId: req.body.sessionId,
        input: {
          'message_type': 'text',
          'text': req.body.text
        }
      })

      let text = results.result.output.generic[0].text + ' '
      results.result.output.generic[1].options.forEach((el, ind, arr) => {
        text += el.label
        if (ind !== arr.length - 1) text += ', '
        else text += '.'
      })

      res.status(200).json({ result: text })
    } catch (err) {
      console.error(err)
    }
  }
}
