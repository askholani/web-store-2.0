export const determineRoute = (user) => {
  const emailVerification = user.email_verified_at
  const phone = user.phone
  const gender = user.gender

  if (!emailVerification) {
    return '/verification'
  } else if (!phone || !gender) {
    return '/profile'
  } else {
    return '/'
  }
}
