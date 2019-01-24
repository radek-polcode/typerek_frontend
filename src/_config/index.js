import development from './development'
import staging from './staging'
import production from './production'

const configs = {
  development,
  staging,
  production
}

export default configs[process.env.NODE_ENV]