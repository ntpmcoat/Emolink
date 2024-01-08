import  axios from 'axios';

const url='http://localhost:5000/api/auth';

export const registerUser=async(userData)=>{
    try {
        const response=await axios.post(`${url}/register`,userData);
        return response.data;
    } catch (error) {
        console.log("Error registering USer:",error);
        throw error;
    }
}

export const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${url}/login`, userData);
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error logging in:', error);
      throw error;
    }
  };