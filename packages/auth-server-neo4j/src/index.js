import boltConnector from '@hydre/datas-neo4j'
import authServer from '@hydre/auth-server-core'

const {
  BOLT_URI = 'bolt://localhost:7687',
  BOLT_USER = 'neo4j',
  BOLT_PWD = 'admin',
  BOLT_ENCRYPTION = false
} = process.env

void async function() {
  const { connect, crud } = boltConnector({ uri: BOLT_URI, pwd: BOLT_PWD, user: BOLT_USER, encryption: `${BOLT_ENCRYPTION}`.toLowerCase() === 'true' })
  await connect()
  await authServer(crud)
}()