import express from "express";
import { addFood,listFood ,removeFood} from "../controllers/foodController.js";  // Import the controller function
import multer from "multer";

// Initialize the router
const foodRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: "uploads",  // Folder for uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);  // Set the filename with timestamp
  },
});



// Initialize multer with storage configuration
const upload = multer({ storage:storage });




// Define the route for adding food, including image upload
// 'upload.single("image")' will accept only one file with the name 'image'
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);






export default foodRouter;  // Use default export
