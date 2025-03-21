import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import patientModel from './models/patientModel.js'
import doctorModel from './models/doctorModel.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Middleware for token verification
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, "Sayantan", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// User Registration (Patient or Doctor)
app.post("/register", async (req, res) => {
    const { fullname, email, phone, password, dateOfBirth, gender, location, userType, medicalRegNo, specialization } = req.body;

    // Ensure `userType` is valid
    if (!userType || (userType !== "patient" && userType !== "doctor")) {
        return res.status(400).json({ error: "Invalid user type" });
    }

    // Check if user already exists
    const existingUser = userType === "patient"
        ? await patientModel.findOne({ $or: [{ email }, { fullname }] })
        : await doctorModel.findOne({ $or: [{ email }, { fullname }] });

    if (existingUser) return res.status(401).json({ error: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user;
    if (userType === "patient") {
        user = await patientModel.create({ fullname, email, phone, password: hashedPassword, dateOfBirth, gender, location });
    } else {
        // Ensure doctors provide required fields
        if (!medicalRegNo || !specialization) {
            return res.status(400).json({ error: "Medical Registration Number and Specialization are required for doctors" });
        }
        user = await doctorModel.create({ fullname, email, phone, password: hashedPassword, dateOfBirth, gender, location, medicalRegNo, specialization });
    }

    // Generate authentication token
    const token = jwt.sign({ email: email, userid: user._id, userType: userType }, "Sayantan");
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "User registered successfully" });
});

// User Login
app.post("/login", async (req, res) => {
    const { email, password, userType } = req.body;

    // Validate userType
    if (!userType || (userType !== "patient" && userType !== "doctor")) {
        return res.status(400).json({ error: "Invalid user type" });
    }

    try {
        // Find user based on userType
        const user = userType === "patient"
            ? await patientModel.findOne({ email })
            : await doctorModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate authentication token
        const token = jwt.sign(
            { email: user.email, userid: user._id, userType: userType },
            "Sayantan",
            { expiresIn: "7d" } // Token expires in 7 days
        );

        // Set HTTP-only cookie for security
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

        return res.status(200).json({ message: "Login successful", userType, token });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// User Logout
app.get("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.redirect("/");
});

// Catch-all route to serve the frontend
app.get("*",  (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(3000, () => console.log("Server started on port 3000"));