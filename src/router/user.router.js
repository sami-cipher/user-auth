const { Router } = require("express")
const { handleUserLogin, handleUserSignup, handleUserData } = require("../controller/user.controller")
const { decodeJWT } = require("../utils/jwt.utils")
const userRouter = Router();
const authCheck = (req, response, next) => decodeJWT(req.headers["x-access-token"]).then(() => {
  if (user) {
    next()
  }
  response.status(401).json({
    message: "unAuthenticated user"
  })
}).catch(() => {
  response.status(400).json({
    message: "unAuthenticated/bad request"
  })
})

userRouter.post("/signup", handleUserSignup)
userRouter.post("/login", handleUserLogin)
userRouter.get("/", authCheck, handleUserData)

module.exports = userRouter;