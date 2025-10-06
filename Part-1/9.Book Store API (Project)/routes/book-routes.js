const express=require("express")
const router=express.Router()
const {getAllBook,getSingleBookById,addNewBook,updateById,deleteBook}=require('../controllers/book-controller')

router.get("/",getAllBook)
router.get("/:id",getSingleBookById)
router.post("/add",addNewBook)
router.put("/update/:id",updateById)
router.delete("/delete/:id",deleteBook)

module.exports=router