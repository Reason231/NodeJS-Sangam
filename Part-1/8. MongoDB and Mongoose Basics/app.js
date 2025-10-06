const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://devilineye100_db_user:dGjqbL7bWvxcNBwe@cluster0.k0lhymn.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((e) => console.log(e));

// creating a Schema with the help of mongoose
const userSchema = new mongoose.Schema({
  user: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// create user model (means creating collection like a folder that stores all the user Data)
const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    // Method 1 => create a new document
    // const newUser=await User.create({
    //     user:"Reason",
    //     email:"devilineye100@gmail.com",
    //     age:18,
    //     isActive:true,
    //     tags:["smart"]
    // })

    // Method 2 => create a new document
    const newUser = new User({
      name: "Raj Mukherjee",
      email: "raj@gmail.com",
      age: "40",
      isActive: true,
      tags: ["developer", "designer", "manager"],
    });
    await newUser.save();

    console.log("User is successfully created", newUser);

    // get all the user Info
    // const allUsers = await User.find({});
    // console.log(allUsers);


    // get user By condition
    // const getUserOfActiveFalse = await User.find({ isActive: true });
    // console.log(getUserOfActiveFalse);


    // get only one user that fulfil the condition
    // const getJohnDoeUser = await User.findOne({ name: "John Doe" });
    // console.log(getJohnDoeUser);


    // get user by Id
    // const getLastCreatedUserByUserId = await User.findById(newUser._id);
    // console.log(getLastCreatedUserByUserId, "getLastCreatedUserByUserId");


    // get user by selected field
    // const selectedFields = await User.find().select("name email -_id");
    // console.log(selectedFields);


    // It gets 5 users from the database after skipping the first one 
    // So, you’ll get users 2 to 6 from the collection.
    // const limitedUsers = await User.find().limit(5).skip(1);
    // console.log(limitedUsers);


    // sorts by age from ascending to descending
    // const sortedUsersByAsc = await User.find().sort({ age: 1 });
    // console.log(sortedUsersByAsc);


    // sorts by age from descending to ascending
    //  const sortedUsersByDesc = await User.find().sort({ age: -1 });
    // console.log(sortedUsersByDesc);

    // counts the users
    // const countDocuments = await User.countDocuments({ isActive: true });
    // console.log(countDocuments);


    // delete the user
    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log("deleted user ->", deletedUser);

    const updateUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        // Updates or replaces a field value
        $set: { age: 100 },

        // Adds a new element to an array field
        $push: { tags: "updated" },
      },
      { new: true }  // it returns updated data
    );
    console.log("updated user",updateUser)

  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
