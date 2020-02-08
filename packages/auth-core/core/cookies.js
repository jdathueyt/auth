import cookie from 'cookie'

const aYear = 60 * 60 * 24 * 365 * 1

// by specifying development env variable we allow http cookies for test purposes
const prodOpt = COOKIE_DOMAIN => process.env.AUTH_LOCAL?.toLowerCase() === 'true' ? {} : { domain: COOKIE_DOMAIN, secure: true }
const cookieOpt = { httpOnly: true, secure: false, sameSite: 'Strict', path: '/' }

export const accessCookie = ({ COOKIE_DOMAIN, ACCESS_COOKIE_NAME }) => rememberMe => accessToken => {
	const payload = { ...cookieOpt, ...prodOpt(COOKIE_DOMAIN) }

	// 1 years cookie :) that's a lot of cookies
	// in case the user choose not be remembered, we don't set a expiration
	// that way the client will delete the cookie after a session
	// what define a session change according to the client browser
	// chrome desktop's sessions expire after browser close
	// chrome android's sessions doesn't expires (unless manual clear)
	// ios clear when app switch xD douch bags
	if (rememberMe) payload.maxAge = aYear
	return cookie.serialize(ACCESS_COOKIE_NAME, accessToken, payload)
}

export const refreshCookie = ({ COOKIE_DOMAIN, REFRESH_COOKIE_NAME }) => refreshToken => {
	const payload = { ...cookieOpt, maxAge: aYear, ...prodOpt(COOKIE_DOMAIN) }
	return cookie.serialize(REFRESH_COOKIE_NAME, refreshToken, payload)
}

export const expiredAccessCookie = ({ COOKIE_DOMAIN, ACCESS_COOKIE_NAME }) => {
	const payload = { ...cookieOpt, expires: new Date(0), ...prodOpt(COOKIE_DOMAIN) }
	return cookie.serialize(ACCESS_COOKIE_NAME, 'hehe boi', payload)
}

export const expiredRefreshCookie = ({ COOKIE_DOMAIN, REFRESH_COOKIE_NAME }) => {
	const payload = { ...cookieOpt, expires: new Date(0), ...prodOpt(COOKIE_DOMAIN) }
	return cookie.serialize(REFRESH_COOKIE_NAME, 'hehe boi', payload)
}