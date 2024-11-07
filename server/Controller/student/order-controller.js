import paypal from "../../helpers/paypal.js";
import Order from "../../model/Order.js";
import StudentCourse from "../../model/StudentCourses.js";
import Course from "../../model/Course.js";

// class PayPalController {
//   static async create(req, res) {
//     try {
//       const {
//         userId,
//         userName,
//         userEmail,
//         orderStatus,
//         paymentMethod,
//         paymentStatus,
//         orderDate,
//         paymentId,
//         payerId,
//         instructorId,
//         instructorName,
//         courseImage,
//         courseTitle,
//         courseId,
//         coursePricing,
//       } = req.body;
//       const create_payment_json = {
//         intent: "sale",
//         payer: {
//           payment_method: "paypal",
//         },
//         redirect_urls: {
//           return_url: `${process.env.CLIENT_URL}/payment-return`,
//           cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
//         },
//         transactions: [
//           {
//             item_list: {
//               items: [
//                 {
//                   name: courseTitle,
//                   sku: courseId,
//                   price: coursePricing,
//                   currency: "USD",
//                   quantity: 1,
//                 },
//               ],
//             },
//             amount: {
//               currency: "USD",
//               total: coursePricing.toFixed(2),
//             },
//             description: courseTitle,
//           },
//         ],
//       };
//       paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
//         if (error) {
//           console.log(error);
//           return res.status(500).json({
//             success: false,
//             message: "Error while creating paypal payment!",
//           });
//         } else {
//           const newlyCreatedCourseOrder = new Order({
//             userId,
//             userName,
//             userEmail,
//             orderStatus,
//             paymentMethod,
//             paymentStatus,
//             orderDate,
//             paymentId,
//             payerId,
//             instructorId,
//             instructorName,
//             courseImage,
//             courseTitle,
//             courseId,
//             coursePricing,
//           });

//           await newlyCreatedCourseOrder.save();

//           const approveUrl = paymentInfo.links.find(
//             (link) => link.rel == "approval_url"
//           ).href;

//           res.status(201).json({
//             success: true,
//             data: {
//               approveUrl,
//               orderId: newlyCreatedCourseOrder._id,
//             },
//           });
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         success: false,
//         message: "Some error occured!",
//       });
//     }
//   }
//   static async capturePaymentAndFinalizeOrder(req, res) {
//     try {
//       const { paymentId, payerId, orderId } = req.body;

//       let order = await Order.findById(orderId);

//       if (!order) {
//         return res.status(404).json({
//           success: false,
//           message: "Order can not be found",
//         });
//       }

//       order.paymentStatus = "paid";
//       order.orderStatus = "confirmed";
//       order.paymentId = paymentId;
//       order.payerId = payerId;

//       await order.save();

//       //update out student course model
//       const studentCourses = await StudentCourse.findOne({
//         userId: order.userId,
//       });

//       if (studentCourses) {
//         studentCourses.courses.push({
//           courseId: order.courseId,
//           title: order.courseTitle,
//           instructorId: order.instructorId,
//           instructorName: order.instructorName,
//           dateOfPurchase: order.orderDate,
//           courseImage: order.courseImage,
//         });

//         await studentCourses.save();
//       } else {
//         const newStudentCourses = new StudentCourse({
//           userId: order.userId,
//           courses: [
//             {
//               courseId: order.courseId,
//               title: order.courseTitle,
//               instructorId: order.instructorId,
//               instructorName: order.instructorName,
//               dateOfPurchase: order.orderDate,
//               courseImage: order.courseImage,
//             },
//           ],
//         });

//         await newStudentCourses.save();
//       }

//       //update the course schema students
//       await Course.findByIdAndUpdate(order.courseId, {
//         $addToSet: {
//           students: {
//             studentId: order.userId,
//             studentName: order.userName,
//             studentEmail: order.userEmail,
//             paidAmount: order.coursePricing,
//           },
//         },
//       });

//       res.status(200).json({
//         success: true,
//         message: "Order confirmed",
//         data: order,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         success: false,
//         message: "Some error occured!",
//       });
//     }
//   }
// }
// export default PayPalController;


class PayPalController {
  static async create(req, res) {
    try {
      const {
        userId,
        userName,
        userEmail,
        orderStatus,
        paymentMethod,
        paymentStatus,
        orderDate,
        paymentId,
        payerId,
        instructorId,
        instructorName,
        courseImage,
        courseTitle,
        courseId,
        coursePricing,
      } = req.body;

      // First check if user already has this course
      const existingStudentCourse = await StudentCourse.findOne({
        userId,
        "courses.courseId": courseId
      });

      if (existingStudentCourse) {
        return res.status(400).json({
          success: false,
          message: "You have already purchased this course"
        });
      }

      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: `${process.env.CLIENT_URL}/payment-return`,
          cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: courseTitle,
                  sku: courseId,
                  price: coursePricing,
                  currency: "USD",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "USD",
              total: coursePricing.toFixed(2),
            },
            description: courseTitle,
          },
        ],
      };

      paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Error while creating paypal payment!",
          });
        } else {
          const newlyCreatedCourseOrder = new Order({
            userId,
            userName,
            userEmail,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            paymentId,
            payerId,
            instructorId,
            instructorName,
            courseImage,
            courseTitle,
            courseId,
            coursePricing,
          });

          await newlyCreatedCourseOrder.save();

          const approveUrl = paymentInfo.links.find(
            (link) => link.rel == "approval_url"
          ).href;

          res.status(201).json({
            success: true,
            data: {
              approveUrl,
              orderId: newlyCreatedCourseOrder._id,
            },
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Some error occurred!",
      });
    }
  }

  static async capturePaymentAndFinalizeOrder(req, res) {
    try {
      const { paymentId, payerId, orderId } = req.body;

      let order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order can not be found",
        });
      }

      // Check if this order is already processed
      if (order.paymentStatus === "paid") {
        return res.status(400).json({
          success: false,
          message: "Order is already processed"
        });
      }

      // Check if course already exists for user
      const existingCourse = await StudentCourse.findOne({
        userId: order.userId,
        "courses.courseId": order.courseId
      });

      if (existingCourse) {
        return res.status(400).json({
          success: false,
          message: "Course already purchased"
        });
      }

      // Start transaction
      const session = await StudentCourse.startSession();
      session.startTransaction();

      try {
        // Update order
        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.paymentId = paymentId;
        order.payerId = payerId;
        await order.save({ session });

        // Create or update student course
        const courseDetails = {
          courseId: order.courseId,
          title: order.courseTitle,
          instructorId: order.instructorId,
          instructorName: order.instructorName,
          dateOfPurchase: order.orderDate,
          courseImage: order.courseImage,
        };

        await StudentCourse.findOneAndUpdate(
          { userId: order.userId },
          { 
            $push: { courses: courseDetails }
          },
          { 
            upsert: true,
            session,
            new: true 
          }
        );

        // Update course students
        await Course.findByIdAndUpdate(
          order.courseId,
          {
            $addToSet: {
              students: {
                studentId: order.userId,
                studentName: order.userName,
                studentEmail: order.userEmail,
                paidAmount: order.coursePricing,
              },
            },
          },
          { session }
        );

        // Commit transaction
        await session.commitTransaction();

        res.status(200).json({
          success: true,
          message: "Order confirmed",
          data: order,
        });
      } catch (error) {
        // If error occurs, abort transaction
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Some error occurred!",
      });
    }
  }
}

export default PayPalController;