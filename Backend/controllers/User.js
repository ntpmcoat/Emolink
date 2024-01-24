import bcrypt from 'bcrypt';
import Register from '../Models/User.js';
import Token from '../Models/token.js';
import { sendEmail } from '../config/sendEmail.js';// Import the sendEmail function
import validator from 'validator';
import crypto from 'crypto';
import Chat from '../Models/chatModel.js';


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
    res.status(404).send(e);
  }
};

export const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find the user by email
    const user = await Register.findOne({ email: email });

    if (!user) {
      return res.send("User not found"); // User not found
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, so the user is authenticated

      // Check if the user is verified
      if (!user.verified) {
        // ... (your existing verification logic)
        return res.send("A new verification link has been sent to your email.");
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

      res.status(200).json({ user });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
};




export const allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};
    
    // Assuming you have a 'Register' model defined
    const users = await Register.find({ ...keyword, _id: { $ne: req.user._id } });

    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};



export const allUsernames = async (req, res) => {
  try {
    // Fetch all users except the current user
    const users = await Register.find({ _id: { $ne: req.user._id } }, '_id username');

    // Create an array to store the user data with appended chat IDs
    const usersWithChatIds = [];

    // Iterate through each user
    for (const user of users) {
      // Find the chat data for the pair of users (req.user._id and user._id)
      const chat = await Chat.findOne({
        $and: [
          { users: req.user._id },
          { users: user._id },
        ],
      });

      // Append chat ID to user data
      const userWithChatId = {
        _id: user._id,
        username: user.username,
        chatId: chat ? chat._id : null, // Append chat ID if found, otherwise null
      };
      // Push the user data to the array
      usersWithChatIds.push(userWithChatId);
    }


    // Convert the array to JSON
    const jsonData = JSON.stringify(usersWithChatIds, null, 2);

    // Send the response with the updated user data
    res.json(usersWithChatIds);
  } catch (error) {
    console.error('Error fetching usernames:', error);
    res.status(500).send('Internal Server Error');
  }
};




