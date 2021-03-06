import { useEffect, useState } from 'react'

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
  let [loggedIn, setLoggedIn] = useState(false)
  let [token, setToken] = useState(null)
  let expiration = localStorage.getItem('spotify_expiration')
  let accessToken = localStorage.getItem('spotify_access_token')
  let refreshToken = localStorage.getItem('spotify_refresh_token')

  useEffect(() => {
    // get another set of tokens by showing the UI that the user is not logged in
    // and that they should trigger a click to start the auth process again.
    if (anyNull([expiration, accessToken, refreshToken])) {
      console.log('local storage is empty... checking URL Params')
      const urlParams = new URLSearchParams(window.location.search)
      let tempExpiration = urlParams.get('spotify_expiration')
      let tempAccessToken = urlParams.get('spotify_access_token')
      let tempRefreshToken = urlParams.get('spotify_refresh_token')

      if (anyNull([tempExpiration, tempAccessToken, tempRefreshToken])) {
        console.log('URL params are empty... prompt login')
        setLoggedIn(false)
        setToken(null)
        return
      } else {
        console.log('using url params, good to go')
        localStorage.setItem('spotify_expiration', tempExpiration)
        localStorage.setItem('spotify_access_token', tempAccessToken)
        localStorage.setItem('spotify_refresh_token', tempRefreshToken)

        setLoggedIn(true)
        setToken(tempAccessToken)
        return
      }
    }

    // token is expired
    if (
      isExpired(expiration) ||
      (expiration === 'undefined' && refreshToken != 'undefined')
    ) {
      console.log('token is expired, fetching a new access token...')

      const response = unwrapRefreshToken(refreshToken)
      response.then((res) => {
        console.log(res)
        localStorage.setItem('spotify_expiration', res.expires_in)
        localStorage.setItem('spotify_access_token', res.access_token)
        localStorage.setItem('spotify_refresh_token', res.refresh_token)

        setLoggedIn(true)
        setToken(res.access_token)
        return
      })
    } else {
      console.log('nothing is expired, we should be good to go')
      setLoggedIn(true)
      setToken(accessToken)
      return
    }

    return [false, 'null']
  }, [accessToken, expiration, refreshToken])

  return [loggedIn, token]
}

const isExpired = (expiration) => {
  return expiration < new Date().getTime() / 1000
}

const fetchRefresh = (refreshToken) => {
  const url =
    process.env.NETLIFY_DEV === 'development'
      ? `http://localhost:8910/.netlify/functions/refresh_token?refresh_token=${refreshToken}`
      : `https://nftapes.netlify.app/.netlify/functions/refresh_token?refresh_token=${refreshToken}`
  return fetch(url, {
    method: 'GET',
  }).then((res) => res.json())
}

const unwrapRefreshToken = async (refreshToken) => {
  return await fetchRefresh(refreshToken)
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
