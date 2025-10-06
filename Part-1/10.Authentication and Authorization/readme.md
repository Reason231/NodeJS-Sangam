## Installation
- npm i express mongoose dotenv jsonwebtoken bcryptjs multer

## Authentication and authorization and Change Password
- Authentication and Authorization Part => Tut video => 04:32:35 - 06:01:12 
- Change Password Part => Tut video => 6:47:30 - 6:59:40


## Auth-middleware explanation Part
- Tut video -> 5:42:00 - 6:01:12
- To check the auth-middleware and access the home page => 
1. Go to the postman
2. Login with email and password => http://localhost:3000/api/auth/login
3. You will see the access token in response after successful login and copy it.
4. Go to the home-routes =>  http://localhost:3000/api/home/welcome
5. Go to the "Authorization part"
6. Click on "Auth Type" and select "Bearer Token" and paste the "access token"
7. Click on send and you will get the welcome home response.


## Note of Logout Functionality
- Since, wer are using the "bearer token" for the authorization.
- We can't create logout functionality from the backend.
- We need to do the logout functionality from the react only.
- If we had used the "cookie" for the authorization. Logout functionality can be created like this => 
// ## logoutUser with the help of cookie
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (e) {
    console.log("Logged out error", e);
    return res.status(500).json({
      success: false,
      message: "Error occurred while logging out",
    });
  }
};