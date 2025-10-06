const Book=require('../models/Book')

const getAllBook=async(req,res)=>{
    try{
        const allBook=await Book.find({})
        if(allBook?.length > 0){
            res.status(200).json({
                success:true,
                message:"List of all book fetched successfully",
                data:allBook
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"No books found from the collection",
            })
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            message:"Something went wrong while fetching the data",
            success:false
        })
    }
}

const getSingleBookById=async(req,res)=>{
    try{
        const getCurrentBookID=req.params.id
        const bookDetailsByID=await Book.findById(getCurrentBookID)

        if(!bookDetailsByID){
            return res.status(404).json({
                success:false,
                message:"There is no book with this ID"
            })
        }

        res.status(200).json({
            success:false,
            message:`Book data of ${getCurrentBookID} ID`,
            data:bookDetailsByID
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error occurred while fetching the selected book"
        })
    }
}

const addNewBook=async(req,res)=>{
    try{
        const newBookData=req.body
        const newlyCreatedBook=new Book(newBookData)

        await newlyCreatedBook.save()

        res.status(201).json({
            success:true,
            message:"Data added successfully",
            data:newlyCreatedBook
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error occurred while adding the data"
        })
    }
}

const updateById=async(req,res)=>{
    try{
        const updateBookData=req.body
        const getCurrentBookId=req.params.id

        const updatedBook=await Book.findByIdAndUpdate(
            updateBookData,{new:true}
        )

        if(!getCurrentBookId){
            return res.status(404).json({
                message:"There is no book with this id",
                success:false
            })
        }

        res.status(200).json({
            success:true,
            message:"Data is updated successfully",
            data:updatedBook
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error occurred while updating the data"
        })
    }}

    const deleteBook=async(req,res)=>{
        const getCurrentId=req.params.id
        if(!getCurrentId){
            return res.status(404).json({
                message:"There is no book with this ID",
                success:false
            })
        }

        const deletedBook=await Book.findByIdAndDelete(getCurrentId)

        res.status(200).json({
            success:true,
            data:deletedBook
        })
    }

    module.exports={getAllBook,getSingleBookById,addNewBook,updateById,deleteBook}