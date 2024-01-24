import express from 'express';
import { registerUser, loginUser,allUsers, allUsernames } from '../controllers/User.js';
const router = express.Router();
import Register from '../Models/User.js';
import Token from '../Models/token.js';
import crypto from 'crypto';
import { sendEmail } from '../config/sendEmail.js';
import bcrypt from 'bcrypt';
import protect from '../Middleware/auth.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/alluser',protect,allUsers);
router.get('/Username',protect,allUsernames);

router.get("/users/:id/verify/:token", async (req, res) => {
    try {
        const userId = req.params.id;
        const token = req.params.token;

        // Find the user by their ID
        const user = await Register.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Find the verification token in the database
        const verifyToken = await Token.findOne({ userid: userId, token: token });

        // Check if the token exists and is valid
        if (!verifyToken) {
            return res.send("Invalid Or Expired Token");
        }

        // Mark the user as verified
        user.verified = true;
        await user.save();

        await verifyToken.deleteOne();
        

        // Redirect or send a success message
        res.send("Email verification successful. You can now log in.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Verification failed. Please try again later.");
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwt'); // Clear the JWT cookie or session
    res.redirect('/login'); // Redirect to the login page
  });


router.post('/forgot-password', async (req, res) => {
    try {
      
      
  
      const email = req.body.storage;
      
  
      // Step 3: Fetch the user by email
      const user = await Register.findOne({ email: email });
  
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      // Step 4: Generate and save a reset token
      const resetToken = new Token({
        userid: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      });
      await resetToken.save();
  
      // Step 5: Send a Password Reset Email
      const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken.token}`;
      const emailText = `Click the following link to reset your password: ${resetLink}`;
      await sendEmail(email, 'Password Reset', emailText);
  
      return res.status(200).send('Email sent for password reset');
    } catch (error) {
      console.log(error);
  
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).send('Invalid token');
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).send('Token expired');
      } else {
        return res.status(500).send('Internal server error');
      }
    }
  });


//  Verify Token and Expiry
router.get('/reset-password/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const user = await Token.findOne({ token: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Render a page for the user to reset their password
        res.redirect(`/forgot-pass/${token}`);        ;
    } catch (error) {
        res.redirect("/login?ResetEmailError=Server Error");
    }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
    const resetToken = req.params.token;
    const newPassword = req.body.newPassword;

    try {
        const tokenDocument = await Token.findOne({ token: resetToken });
        if (!tokenDocument) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const user = await Register.findOne({ _id: tokenDocument.userid });

        if (!user) {
            return res.redirect("/login?RegistrationError=No user found Please Register first");
        }

        // Update the user's password with the new one
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Delete the token after successful password reset
        await Token.deleteOne({ userid: tokenDocument.userid });

        res.status(200).json('ok');
    } catch (error) {
        res.status(404).json(error+" Change password error");
    }
});


export default router;
