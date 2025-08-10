// // // import User from "../models/User.js";
// // // import { Webhook } from "svix";

// // // const clerkWebhooks = async (req, res)=>{
// // //     try {
// // //         // Create a Svix instance with clerk webhook secret.
// // //         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
// // //         // Getting Headers
// // //         const headers = {
// // //             "svix-id": req.headers["svix-id"],
// // //             "svix-timestamp": req.headers["svix-timestamp"],
// // //             "svix-signature": req.headers["svix-signature"],
// // //         };
// // //         // Verifying Headers
// // //         await whook.verify(JSON.stringify(req.body), headers)
// // //         // Getting Data from request body
// // // const {data, type} = req.body
// // // const userData = {
// // //     _id: data.id,
// // //     email: data.email_addresses[0].email_address,
// // //     username: data.first_name + " " + data.last_name,
// // //     image: data.image_url,
// // // }
// // // // Switch Cases for differernt Events
// // // switch (type) {
// // //     case "user.created":{
// // //         await User.create(userData)
// // //         break;
// // //     }     
// // //          case "user.updated":{
// // //         await User.findByIdAndUpdate(data.id, userData);
// // //         break;
// // //     }
// // //     case "user.deleted":{
// // //         await User.findByIdAndDelete(data.id);
// // //         break;
// // //     }
// // //     default:
// // //         break;
// // // }
// // // res.json({success: true, message: "Webhook Recieved"})
    
// // //         } catch (error) {
// // //     console.log(error.message);
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // }
// // // export default clerkWebhooks;

// // import User from "../models/User.js";
// // import { Webhook } from "svix";

// // const clerkWebhooks = async (req, res) => {
// //     try {
// //         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

// //         const headers = {
// //             "svix-id": req.headers["svix-id"],
// //             "svix-timestamp": req.headers["svix-timestamp"],
// //             "svix-signature": req.headers["svix-signature"],
// //         };

// //         if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
// //             return res.status(400).json({ success: false, message: "Missing Svix headers" });
// //         }

// //         const svix_id = headers["svix-id"];
// //         const svix_timestamp = headers["svix-timestamp"];
// //         const svix_signature = headers["svix-signature"];
        
// //         // This is the key change: `whook.verify` expects the raw body, which will now be handled by a middleware in `server.js`
// //         const payload = whook.verify(req.body, {
// //             "svix-id": svix_id,
// //             "svix-timestamp": svix_timestamp,
// //             "svix-signature": svix_signature,
// //         });

// //         const { data, type } = payload;
        
// //         const userData = {
// //             _id: data.id,
// //             email: data.email_addresses[0].email_address,
// //             username: data.first_name + " " + data.last_name,
// //             image: data.image_url,
// //         };

// //         switch (type) {
// //             case "user.created": {
// //                 await User.create(userData);
// //                 break;
// //             }
// //             case "user.updated": {
// //                 await User.findByIdAndUpdate(data.id, userData);
// //                 break;
// //             }
// //             case "user.deleted": {
// //                 await User.findByIdAndDelete(data.id);
// //                 break;
// //             }
// //             default:
// //                 console.log(`Unhandled event type: ${type}`);
// //                 break;
// //         }

// //         res.status(200).json({ success: true, message: "Webhook Recieved" });

// //     } catch (error) {
// //         console.error("Webhook processing error:", error);
// //         res.status(500).json({ success: false, message: "Failed to process webhook" });
// //     }
// // };

// // export default clerkWebhooks;


// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         const headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"],
//         };

//         if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
//             return res.status(400).json({ success: false, message: "Missing Svix headers" });
//         }

//         const svix_id = headers["svix-id"];
//         const svix_timestamp = headers["svix-timestamp"];
//         const svix_signature = headers["svix-signature"];
        
//         // Raw body verification
//         // `req.body` is the raw buffer from the request
//         const payload = whook.verify(req.body, {
//             "svix-id": svix_id,
//             "svix-timestamp": svix_timestamp,
//             "svix-signature": svix_signature,
//         });

//         // Now we can parse the payload as JSON
//         const { data, type } = JSON.parse(payload);
        
//         const userData = {
//             _id: data.id,
//             email: data.email_addresses[0].email_address,
//             username: data.first_name + " " + data.last_name,
//             image: data.image_url,
//         };

//         switch (type) {
//             case "user.created": {
//                 await User.create(userData);
//                 break;
//             }
//             case "user.updated": {
//                 await User.findByIdAndUpdate(data.id, userData);
//                 break;
//             }
//             case "user.deleted": {
//                 await User.findByIdAndDelete(data.id);
//                 break;
//             }
//             default:
//                 console.log(`Unhandled event type: ${type}`);
//                 break;
//         }

//         res.status(200).json({ success: true, message: "Webhook Recieved" });

//     } catch (error) {
//         console.error("Webhook processing error:", error);
//         res.status(500).json({ success: false, message: "Failed to process webhook" });
//     }
// };

// export default clerkWebhooks;

// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//     try {
//         console.log('--- Webhook request received ---');
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         const headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"],
//         };

//         if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
//             console.error('ERROR: Missing Svix headers');
//             return res.status(400).json({ success: false, message: "Missing Svix headers" });
//         }
        
//         // whook.verify() expects the raw body as a buffer or string.
//         // `req.body` is now the raw buffer thanks to bodyParser.raw() in server.js
//         const payload = whook.verify(req.body, headers);
//         console.log('Webhook signature verified successfully.');

//         // Svix.verify() returns the payload as a JSON object, so no need for JSON.parse()
//         const { data, type } = payload;
        
//         console.log(`Event type: ${type}`);
        
//         const userData = {
//             _id: data.id,
//             email: data.email_addresses[0].email_address,
//             username: data.first_name + " " + data.last_name,
//             image: data.image_url,
//         };

//         switch (type) {
//             case "user.created": {
//                 // User create karne se pehle check kar sakte hain ki woh pehle se maujood hai ya nahi
//                 const existingUser = await User.findById(userData._id);
//                 if (existingUser) {
//                     console.log(`User ${userData.username} already exists in DB.`);
//                     return res.status(200).json({ success: true, message: "User already exists" });
//                 }
                
//                 await User.create(userData);
//                 console.log(`SUCCESS: User ${userData.username} created in DB.`);
//                 break;
//             }
//             case "user.updated": {
//                 await User.findByIdAndUpdate(data.id, userData);
//                 console.log(`SUCCESS: User ${userData.username} updated in DB.`);
//                 break;
//             }
//             case "user.deleted": {
//                 await User.findByIdAndDelete(data.id);
//                 console.log(`SUCCESS: User ${userData.username} deleted from DB.`);
//                 break;
//             }
//             default:
//                 console.log(`SUCCESS: Unhandled event type: ${type}`);
//                 break;
//         }

//         res.status(200).json({ success: true, message: "Webhook Recieved" });

//     } catch (error) {
//         console.error("ERROR: Webhook processing failed.", error.message);
//         res.status(500).json({ success: false, message: `Failed to process webhook: ${error.message}` });
//     }
// };

// export default clerkWebhooks;


// REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE


import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res)=>{
    try {

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

                  const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };
             // Verifying Headers
                  await whook.verify(JSON.stringify(req.body), headers)
             // Getting Data from request body
             const {data, type} = req.body
             const userData = {
                _id: data.id,
                email: data.email_addresses[0].email_address,
                username: data.first_name + " " + data.last_name,
                image: data.image_url,
             }
// Switch Cases for differernt Events
            switch (type) {
                case "user.created":{
                  await User.create(userData)
                  break;
    }     
         case "user.updated":{
        await User.findByIdAndUpdate(data.id, userData);
        break;
    }
             case "user.deleted":{
            await User.findByIdAndDelete(data.id);
            break;
    }
    default:
        break;
}
         res.json({success: true, message: "Webhook Recieved"})
    
               } catch (error) {
                  console.log(error.message);
                  res.json({ success: false, message: error.message });
           }
      }
            export default clerkWebhooks;

// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         const headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"],
//         };

//         if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
//             return res.status(400).json({ success: false, message: "Missing Svix headers" });
//         }

//         const svix_id = headers["svix-id"];
//         const svix_timestamp = headers["svix-timestamp"];
//         const svix_signature = headers["svix-signature"];
        
//         // This is the key change: `whook.verify` expects the raw body, which will now be handled by a middleware in `server.js`
//         const payload = whook.verify(req.body, {
//             "svix-id": svix_id,
//             "svix-timestamp": svix_timestamp,
//             "svix-signature": svix_signature,
//         });

//         const { data, type } = payload;
        
//         const userData = {
//             _id: data.id,
//             email: data.email_addresses[0].email_address,
//             username: data.first_name + " " + data.last_name,
//             image: data.image_url,
//         };

//         switch (type) {
//             case "user.created": {
//                 await User.create(userData);
//                 break;
//             }
//             case "user.updated": {
//                 await User.findByIdAndUpdate(data.id, userData);
//                 break;
//             }
//             case "user.deleted": {
//                 await User.findByIdAndDelete(data.id);
//                 break;
//             }
//             default:
//                 console.log(`Unhandled event type: ${type}`);
//                 break;
//         }

//         res.status(200).json({ success: true, message: "Webhook Recieved" });

//     } catch (error) {
//         console.error("Webhook processing error:", error);
//         res.status(500).json({ success: false, message: "Failed to process webhook" });
//     }
// };

// export default clerkWebhooks;