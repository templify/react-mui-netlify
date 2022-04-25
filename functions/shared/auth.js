exports.isAuthenticated = function(context) {
  const { user } = context.clientContext
  if(user && user.email) {
    return true
  }
  return false
}