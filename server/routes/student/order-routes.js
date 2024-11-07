import express from "express"
import PayPalController from "../../Controller/student/order-controller.js";

const router = express.Router()





router.post("/create", PayPalController.create);
router.post("/capture", PayPalController.capturePaymentAndFinalizeOrder);




export default router