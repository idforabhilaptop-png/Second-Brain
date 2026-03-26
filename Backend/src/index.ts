import express from "express"
import main from "./database/dbConnect.js"
import authRouter from "./routes/auth.js"
import cookieParser from "cookie-parser"
import contentRouter from "./routes/content.js"
import shareRouter from "./routes/share.js"
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1' , authRouter)
app.use('/api/v1' , contentRouter )
app.use('/api/v1' , shareRouter)

main()
    .then(() => {
        app.listen(process.env.Port, () => {
            console.log(`Listening at ${process.env.Port}...`)
        })
    }).catch((err) => console.log(err.message))