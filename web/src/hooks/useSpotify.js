import { useState, useEffect } from 'react'

/**
 * useSpotify
 * returns [isLoggedIn, accessToken]
 *
 * Checks (in order)
 * 1. If tokens are available via localStorage
 * 2. If tokens are avaialable via URLparams
 *
 * If Params are found, it checks the expiration.
 * If expired, it asks for a refresh token.
 * If not expired, it returns [true, token]
 */
const useSpotify = () => {
  let expiration = localStorage.getItem('spotify_expiration')
  let access_token = localStorage.getItem('spotify_access_token')
  let refresh_token = localStorage.getItem('spotify_refresh_token')

  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // get another set of tokens by showing the UI that the user is not logged in
    // and that they should trigger a click to start the auth process again.
    if (anyNull([expiration, access_token, refresh_token])) {
      console.log('local storage is empty... checking URL Params')
      const urlParams = new URLSearchParams(window.location.search)
      expiration = urlParams.get('spotify_expiration')
      access_token = urlParams.get('spotify_access_token')
      refresh_token = urlParams.get('spotify_refresh_token')

      if (anyNull([expiration, access_token, refresh_token])) {
        console.log('URL params are empty... prompt login')
        return
      } else {
        localStorage.setItem('spotify_expiration', expiration)
        localStorage.setItem('spotify_access_token', access_token)
        localStorage.setItem('spotify_refresh_token', refresh_token)
      }
    }

    // token is expired
    if (expiration < new Date().getTime() / 1000) {
      console.log('token is expired, fetching a new access token...')

      const response = unwrapRefreshToken(refresh_token)
      response.then((res) => {
        localStorage.setItem('spotify_expiration', res.expiration)
        localStorage.setItem('spotify_access_token', res.access_token)
        localStorage.setItem('spotify_refresh_token', res.refresh_token)

        setLoggedIn(true)
        setToken(res.access_token)
      })
    } else {
      console.log('nothing is expired, we should be good to go')
      setLoggedIn(true)
      setToken(access_token)
    }
  }, [])

  return [loggedIn, token]
}

const fetchRefresh = (refresh_token) => {
  const url =
    process.env.NETLIFY_DEV === 'development'
      ? `http://localhost:8911/refresh_token?refresh_token=${refresh_token}`
      : `https://nftapes.netlify.app/.netlify/functions/refresh_token?refresh_token=${refresh_token}`
  return fetch(url, {
    method: 'GET',
  }).then((res) => res.json())
}

const unwrapRefreshToken = async (refresh_token) => {
  return await fetchRefresh(refresh_token)
}

/**
 * Checks if any value in the list is null
 * used for checking if localstorage or urlparams
 * have values, or if we should prompt user
 * to renegotiate the spotify token lifecycle.
 */
const anyNull = (values) => {
  let nulls = values.filter((value) => {
    return value === null
  })
  return nulls.length > 0
}

export default useSpotify
