import  axios from 'axios';

const url='http://localhost:5000';
const addpost='http://localhost:5000/api/addpost';
const getpost='http://localhost:5000/api/getpost';

export const registerUser=async(userData)=>{
    try {
        const response=await axios.post(`${url}/register`,userData,{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log("Error registering USer:",error);
        throw error;
    }
}

export const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${url}/login`, userData,{withCredentials:true});
      console.log(response);
      localStorage.setItem('token',response.data.user.email);
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error logging in:', error);
      throw error;
    }
  };

export const addPostApi = async (postData)=>{
  try {
       const response=await axios.post(`${addpost}/addPost`,postData,{
      headers:{
        'Content-Type':'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Add not posted',error);
    throw error;
  }
}


export const fetchPostApi=async(posts)=>{
  try {
    const response= await axios.get(`${getpost}/getPost`);
    return response;
  } catch (error) {
    console.error("Error getting posts");
  }
}

export const forgotPass = async () => {
  try {
    const storage = localStorage.getItem('token');

    if (!storage) {
      throw new Error('Token not found in localStorage');
    }

    const response = await axios.post(`${url}/forgot-password`, {storage});

    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    console.error('Error in forgotPass:', error);
    throw error; // Re-throw the error to propagate it up the call stack
  }
};
