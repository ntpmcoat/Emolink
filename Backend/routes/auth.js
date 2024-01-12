import express from 'express';
import { registerUser, loginUser } from '../controllers/User.js';
const router = express.Router();
import Register from '../Models/User.js';
import Token from '../Models/token.js';

router.post('/register', registerUser);
router.post('/login', loginUser);

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
            res.redirect("Invalid Or Expired Token");
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
    const email = req.body.email;

    try {
        

        // Step 3: Store the Token and Expiry Time
        const user = await Register.findOne({ email });
        if (!user) {
            res.redirect("/login?RegistrationError=No user found Please Register first");
        }

        const resetToken = new Token({
            userid: user._id, // Reference to the user
            token: crypto.randomBytes(32).toString('hex')
        });
        await resetToken.save();


        // Step 4: Send a Password Reset Email
        const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken.token}`;
        const emailText = `Click the following link to reset your password: ${resetLink}`;
        await sendEmail(email, 'Password Reset', emailText);

        res.redirect("/login?ResetEmail=Password Reset Email Sent ");
    } catch (error) {
        res.redirect("/login?ResetEmailError=Server Error");
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
        return res.render(path.join(__dirname,"views/reset-password.hbs"), { token });
    } catch (error) {
        res.redirect("/login?ResetEmailError=Server Error");
    }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
    const resetToken = req.params.token; // Use a different variable name for clarity
    const newPassword = req.body.newPassword;

    try {
        const tokenDocument = await Token.findOne({ token: resetToken });
        if (!tokenDocument) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const user = await Register.findOne({ _id: tokenDocument.userid });

        if (!user) {
            res.redirect("/login?RegistrationError=No user found Please Register first");
        }

        // Update the user's password with the new one
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Delete the token after successful password reset
        await Token.deleteOne({ userid: tokenDocument.userid });

        res.redirect("/login?ResetEmailSuccess=Password Changed Successfully");
    } catch (error) {
        console.error(error);
        res.redirect("/login?ResetEmailError=Server Error");
    }
});

export default router;
