// models
const Courses = require("../../models/courses");
const Users = require("../../models/users");
const UserCourses = require("../../models/userCourses");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.newCourse = async (req, res) => {
  try {
    const { title } = req.body;

    const found = await Courses.find({ title: title });

    if (found && found.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Course already exists" });
    }

    const staticCourse = {
      title: "Socket.io 2022",
      description: "Socket.io Description",
      price: 399,
      thumbnail:
        "https://i.ytimg.com/vi/ZKEqqIO7n-k/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDMU5Rccu5RLsr9ZyuJMg9N8X_j0g",
      playlist: [
        {
          title: "Introduction-2",
          video: "https://www.youtube.com/embed/7nafaH9SddU",
          resources: [
            "https://www.clickdimensions.com/links/TestPDFfile.pdf",
            "https://www.clickdimensions.com/links/TestPDFfile.pdf",
          ],
          time_duration: "1:00",
          description: "Introduction to NodeJS",
        },
        {
          title: "Introduction-2",
          video: "https://www.youtube.com/embed/7nafaH9SddU",
          resources: [],
          time_duration: "1:30",
          description: "Introduction to NodeJS",
        },
      ],
      authors: "John Doe",
      languages: "English",
    };

    const newCourse = new Courses(staticCourse);
    newCourse.save();
    return res.status(200).json({ success: true, message: "New course added" });
  } catch (e) {
    console.log("CATCH => ", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.singleCourse = async (req, res) => {
  try {
    const { id } = req.query;

    const courses = await Courses.find({ _id: id });
    if (!courses || courses.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }
    return res.status(200).json(courses[0]);
  } catch (e) {
    console.log("CATCH => ", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.allcourses = async (req, res) => {
  try {
    const limit = parseInt(req.query?.limit);

    if (limit === 3) {
      const courses = await Courses.find({}).limit(3);
      return res.status(200).json({ success: true, courses });
    }

    if (!limit) {
      const courses = await Courses.find({});
      return res.status(200).json({ success: true, courses });
    } else {
      let skip = parseInt(limit) - 12;
      const courses = await Courses.find({}).limit(12).skip(skip);
      return res.status(200).json({ success: true, courses });
    }
  } catch (e) {
    console.log("CATCH => ", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};
exports.purchaseCourse = async (req, res) => {
  try {
    const { _id } = req.body;
    const course = await UserCourses.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "course_id",
          foreignField: "_id",
          as: "courses",
        },
      },
    ]);

    return res.status(200).json({ success: true, course });
  } catch (e) {
    console.log("CATCH => ", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.orders = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res
        .status(400)
        .json({ success: false, message: "Amount is required" });

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: parseInt(Math.random() * 2e6).toString(),
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.success = async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      carts,
      token,
    } = req.body;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    const decoded = jwt.decode(token);
    const user_id = decoded._doc._id;

    // saving the order in our database

    console.log(carts);

    for (let i = 0; i < carts.length; i++) {
      console.log({
        orderCreationId,
        course_id: carts[i]._id,
        user_id,
      });
      let course = await UserCourses.create({
        orderCreationId: orderCreationId.toString(),
        course_id: mongoose.Types.ObjectId(carts[i]._id),
        user_id: mongoose.Types.ObjectId(user_id),
      });
      console.log(course);
    }

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    console.log("ERROR", error.message);
    res.status(500).send(error.message);
  }
};
