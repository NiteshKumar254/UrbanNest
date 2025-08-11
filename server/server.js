import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";



connectDB();
connectCloudinary()

const app=express()

// app.use(cors()) //Enable Cross-Origin Resource Sharing 
app.use(cors({
  origin: [
    "http://localhost:5173", // local frontend
    "urban-nest-backend-omega.vercel.app" // your deployed frontend
  ],
  credentials: true
}));


    
//middleware
app.use(express.json()) //Parse JSON bodies
app.use(clerkMiddleware())

//API to listen to Clerk Webhooks
app.use("/api/clerk", clerkWebhooks)

app.get('/', (req,res)=>res.send("API is Working Fineee"))
app.use('/api/user', userRouter); // User routes)
app.use('/api/hotels', hotelRouter); // Hotel routes);
app.use('/api/rooms', roomRouter );
app.use('/api/bookings', bookingRouter ); // Booking routes);



const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server Running on part ${PORT}`) );



