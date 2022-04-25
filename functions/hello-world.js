import { isAuthenticated } from "./shared/auth"

exports.handler = async function(event, context) {
  if(!isAuthenticated(context)) {
    return {
      statusCode: 401,
    }
  }

  return {
    statusCode: 200,
    body: "Hello!"
  }
}