import UserActivityDuration from "../Models/userActivity.js"; 
 
export const track = async (req, res) => {
  try {
    const { username, durationInSeconds } = req.body;
    const dayOfWeek = new Date().getDay(); // Get the current day of the week

    // Use findOneAndUpdate with upsert option to create or update the record
    const result = await UserActivityDuration.findOneAndUpdate(
      { username, dayOfWeek },
      { $inc: { durationInSeconds } }, // Increment durationInSeconds
      { upsert: true, new: true } // Create if not exists, return the updated document
    );

   

    res.json({ message: 'User activity duration recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getTrack=async (req, res) => {
  try {
    const { username } = req.params;
    const userActivityDuration = await UserActivityDuration.find({ username });
    res.json({ userActivityDuration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}