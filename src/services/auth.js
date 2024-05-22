import api from './api'

export const apiPostLogin = (email, password) => (
  api.post('/login', { user: { email, password } })
)
