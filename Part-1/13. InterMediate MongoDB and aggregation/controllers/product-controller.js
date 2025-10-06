const Product = require("../models/Product");

// Step 0. Create a simple db
const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        inStock: true,
        tags: ["footwear", "running"],
      },
      {
        name: "Novel",
        category: "Books",
        price: 15,
        inStock: true,
        tags: ["fiction", "bestseller"],
      },
    ];

    const result=await Product.insertMany(sampleProducts)
    res.status(201).json({
        success:true,
        data:`Inserted ${result.length} sample products`
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success:false,
      message:"Some error occurred"
    });
  }
};

// Understanding the aggregation pipeline
const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
        // Stage 1: filter products that are out of stock and price >= 100
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },

      // Stage 2: group by category, compute average price and count
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,  // Number of filtered products under "Electronic category"
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// Output of above code
// It will give me the data of the "Electronic" category because this category only satisfies the filter part, and gives the output as avg Price and count of electronics"
// "_id": "Electronics",
// "avgPrice": 849,
// "count": 2


const getProductAnalysis=async(req,res)=>{
  try{
    const result=await Product.aggregate([
      // Stage 1 filter
      {
        $match:{
          category:"Electronics"  // category should be electronics
        }
      },
      // Stage 2 grouping
      {
        $group:{
          _id:null,
          totalRevenue:{
            $sum : "$price"   // sum of price
          },
          averagePrice:{
            $avg: "$price"
          },
           maxProductPrice:{
            $max:"$price"    // the highest price in the electronic category
          },
          minProductPrice:{
            $min:"$price"   // the highest price in the electronic category
          },
        }
      },


      // excluding the id from the response
      {
        $project: {
          _id:0,   // id is excluded from the response, try 1 you will see id in response
          totalRevenue:1,
          averagePrice:1,
          maxProductPrice:1,
          minProductPrice:1,
          priceRange:{
            $subtract:["$maxProductPrice","$minProductPrice"]   // above max and min
          }
        }
      }
    ])

      res.status(200).json({
        success:true,
        data:result
      })
  }
  catch(e){
    res.status(500).json({
      success:false,
      message:"Some error occurred"
    })
  }
}


module.exports={insertSampleProducts,getProductStats,getProductAnalysis}