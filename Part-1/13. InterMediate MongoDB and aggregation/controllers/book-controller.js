const Author = require("../models/Author");
const Book = require("../models/Book");
const { create } = require("../models/Product");

const createAuthor = async (req, res) => {
  try {
    // write this raw data for for the author route.
    //         // {
    //     "name":"Reason",
    //     "bio":"Reason bio"
    // }
    const author = new Author(req.body);
    await author.save();

    res.status(201).json({
      success: true,
      data: author,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occureed",
    });
  }
};

const createBook = async (req, res) => {
  try {
    // You need to give the _id of the author that you want to link with the book
    // {
    //     "title":"Reason Book",
    //     "author":"68e3f80f5064ee88a025d723"
    // }
    const book = new Book(req.body);
    await book.save();

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occureed",
    });
  }
};

const getBookWithAuthor=async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id).populate("author")
        if(!book){
            return res.status(404).json({
                success:false,
                message:"Book not found"
            })
        }

        res.status(200).json({
            success:true,
            data:book
        })
    }
     catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
}

// Output of getBookWithAuthor => You will get the book data along with the book author 
//     {
//     "success": true,
//     "data": {
//         "_id": "68e3f97bca5ab59ea7573a7b",
//         "title": "Reason Book",
//         "author": {
//             "_id": "68e3f80f5064ee88a025d723",
//             "name": "Reason",
//             "bio": "Reason bio",
//             "__v": 0
//         },
//         "__v": 0
//     }
// }

module.exports = { createAuthor, createBook,getBookWithAuthor };
