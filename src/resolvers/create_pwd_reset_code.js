import MAIL from '../mail.js'
import DISK from '../disk.js'
import { ENVIRONMENT, ERRORS } from '../constant.js'
import { GraphQLError } from 'graphql/index.mjs'

export default async ({ mail }) => {
  const [user] = await DISK.User({
    type  : DISK.GET,
    match : { mail },
    fields: ['last_reset_code_sent'],
  })

  if (user) {
    if (user.last_reset_code_sent + ENVIRONMENT.RESET_PASS_DELAY > Date.now())
      throw new GraphQLError(ERRORS.SPAM)
    await DISK.User({
      type  : DISK.SET,
      filter: { uuids: [user.uuid] },
      fields: {
        reset_code          : await MAIL.reset(mail),
        last_reset_code_sent: Date.now(),
      },
    })
  }

  return true
}