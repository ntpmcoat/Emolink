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
      localStorage.setItem('token',response.data.user.email);
      localStorage.setItem('tokenurl',response.data.user.tokens[0].token)
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error logging in:', error.message);
      throw error;
    }
  };

  export const addPostApi = async (postData) => {
    try {
      const email = localStorage.getItem('token'); // Assuming the email is stored as the token
      postData.append('email', email);
      
      const response = await axios.post(`${addpost}/addPost`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Add not posted', error);
      throw error;
    }
  };
  


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


export const fetchUserActivityDuration = async(username)=>{
  try {
    const response = await axios.get(`${url}/analytics/userActivityDuration/${username}`);
    return response.data.userActivityDuration;
  } catch (error) {
    console.error('Error fetching user activity duration:', error);
    throw error;
  }
}

export const fetchProfileData = async (username) => {
  try {
      const response = await axios.get(`http://localhost:5000/profile/user?username=${username}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
  }
}

export const updateBio = async (username, editedBio) => {
  try {
      await axios.put(`${url}/profile/updateBio/${username}`, {
          bio: editedBio,
      });
  } catch (error) {
      console.error('Error updating bio:', error);
      throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('tokenurl');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response= await axios.get('http://localhost:5000/alluser', config); // Adjust the API endpoint
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};