import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Register from '../Models/User.js';
import Token from '../Models/token.js';
import { sendEmail } from '../config/sendEmail.js';// Import the sendEmail function
import validator from 'validator';
import crypto from 'crypto';


export const registerUser = async (req, res) => {
  try {
    // Validate user inputs
    if (!validator.isEmail(req.body.email)) {
      return res.redirect("/login?RegistrationError=Invalid Email Address");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(req.body['password'], 10); // 10 is the number of salt rounds

    // Create a new user with hashed password
    const registerUser = new Register({
      name:req.body['name'],
      username: req.body['email'],
      email: req.body.email,
      password: hashedPassword, // Store the hashed password
    });

    // Generate an authentication token
    const token = await registerUser.generateAuthToken();

    // Create and save the verification token
    const verifyToken = new Token({
      userid: registerUser._id, // Use registerUser._id
      token: crypto.randomBytes(32).toString('hex'),
    });
    await verifyToken.save();

    // Construct the verification URL
    const url = `${process.env.BASE_URL}/users/${registerUser._id}/verify/${verifyToken.token}`;

    // Send a verification email
    await sendEmail(registerUser.email, "Verify Email", url);
    
    // Save the registered user
    await registerUser.save();

    // Set JWT cookie
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    res.cookie("jwt", token, {
      expires: expiryDate,
      httpOnly: true,
    });
   res.status(200).send('Done');
  } catch (e) {
    res.status(404).send('Error');
  }
};

export const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find the user by email
    const user = await Register.findOne({ email: email });

    if (!user) {
      return res.redirect("/login?LoginError=User not found Please Register First"); // User not found
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, so the user is authenticated

      // Check if the user is verified
      if (!user.verified) {
        // Generate a new verification token
        const newToken = new Token({
          userid: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        });

        // Save the new token to the database
         await newToken.save();

    //     // Construct the verification URL with the new token
       const url = `${process.env.BASE_URL}/users/${user._id}/verify/${newToken.token}`;

    //     // Send a new verification email
        await sendEmail(user.email, "Resend Verification Email", url);

        return res.redirect("/login?VerificationError=Email not verified. A new verification link has been sent to your email.");
      }

      // Generate a JWT token
      const token = await user.generateAuthToken();
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);

      // Set the JWT token as a cookie
      res.cookie("jwt", token, {
        expires: expiryDate,
        httpOnly: true,
      });

      res.status(200).json({user});
     
    }else {
      res.status(400).send("Invalid credentials");
    }
    }catch(error) {
    res.status(404).send(error);
  }
};
