import express from "express"
import "dotenv/config.js"
import cors from "cors"
import fileUpload from "express-fileupload"
import connectDB from "./db/db.config.js"
import bodyParser from "body-parser"
const app = express()
const port = process.env.PORT || 5001;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

// routes
import authroute from "./routes/auth/authroute.js"
import mediaroute from "./routes/instructor/mediaroute.js"
import courseroute from "./routes/instructor/courseroute.js"
import course from "./routes/student/course-route.js"
import orderRoute from "./routes/student/order-routes.js"
import studentBoughtcourse from './routes/student/student-course-route.js'
import studentCourseProgressRoutes from "./routes/student/course-progress-route.js"
app.use("/api/auth",authroute)
app.use('/media',mediaroute)
app.use('/instructor/course',courseroute)
app.use('/student/course',course)
app.use('/student/order',orderRoute)
app.use('/student/courses-bought',studentBoughtcourse)
app.use("/student/course-progress", studentCourseProgressRoutes);




connectDB().then(() => {
    
    app.listen(port, () => {
        console.log(`i am listening on ${port}`)
    })
    
})

