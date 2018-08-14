export const AUTH_TOKEN = 'auth-token'
export const STRIPE_KEY_PK = 'pk_test_z89Nzvos7G8pFozzkPm9RAVR'
// export const URL_SERVER_GRAPHQL = 'http://localhost:4000'
// export const URL_SERVER_MEDIA = 'http://localhost:5000'
// export const URL_SERVER_REACT = 'http://localhost:3000'

// export const URL_SERVER_GRAPHQL = 'http://104.211.51.118:4000'
// export const URL_SERVER_MEDIA = 'http://104.211.51.118:5000'
// export const URL_SERVER_REACT = 'http://104.211.51.118:3000'

export const URL_SERVER_GRAPHQL = (process.env.NODE_ENV === 'development') ? 'http://localhost:4000' : 'http://137.135.84.44:4000'
export const URL_SERVER_MEDIA = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : 'http://137.135.84.44:5000'
export const URL_SERVER_REACT = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080' : 'http://137.135.84.44'
