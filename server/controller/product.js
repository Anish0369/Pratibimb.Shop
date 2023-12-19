const Product = require("../model/Product");
const uploadImageToCloudinary = require("../utils/imageUploader");
const Category = require("../model/Category");
const Review = require("../model/Review");

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({
      status: "Published",
    }).populate("category");

    if (allProducts.length === 0) {
      res.status(404).json({
        success: false,
        message: "Unable to fetch product data",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      allProducts,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Something went wrong while fetching product data",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, status, quantity, category, image } =
      req.body;

    // const timage = req.files.timage;

    // console.log(timage)

    if (!name || !price || !description || !quantity || !category) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }
    console.log(category);
    const categoryDetails = await Category.findOne({ name: category });

    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    console.log("after fetching");
    console.log(categoryDetails);

    // const imageLink = await uploadImageToCloudinary(timage,
    //     process.env.folder  );

    const newprod = await Product.create({
      name: name,
      price: price,
      description: description,
      status: status,
      quantity: quantity,
      image: image || "kuch bhi",
      category: categoryDetails._id,
    });

    console.log(newprod);

    const catdet = await Category.findByIdAndUpdate(
      { _id: categoryDetails._id }, // Find the category with the specified name
      { $push: { products: newprod._id } }, // Push the new product ID into the 'products' array
      { new: true } // Return the updated category document
    );

    console.log("Category product added", catdet);

    return res.status(200).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: "Product cannot be created",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const targetId = req.params.id;

    const product = await Product.findById(targetId).populate({
      path: "category", // Populate the 'category' field
      populate: {
        path: "products", // Populate the 'products' field within the 'category'
      },
    });
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Unable to fetch product data",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product data fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Something went wrong while udpating product data",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const targetId = req.params.id;

    const response = await Product.findById(targetId);

    if (!response) {
      res.status(400).json({
        success: false,
        message: "Unable to delete product data",
      });
    }

    console.log("response", response);

    const categoryId = response.category;

    console.log("categoryId", categoryId);

    const catdet = await Category.findByIdAndUpdate(
      { _id: categoryId }, // Find the category with the specified name
      { $pull: { products: targetId } }, // Push the new product ID into the 'products' array
      { new: true } // Return the updated category document
    );

    console.log("Category product deleted", catdet);

    const response2 = await Product.findByIdAndDelete(targetId);

    console.log("response2", response2);

    if (!response2) {
      res.status(400).json({
        success: false,
        message: "Unable to delete product data",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Something went wrong while deleting product data",
    });
  }
};

// const PAGE_SIZE = 10;

exports.getPopularProducts = async (req, res) => {
  try {
    const popularProducts = await Product.find({
      isPopular: true,
    }).populate("category");

    if (popularProducts.length === 0) {
      res.status(404).json({
        success: false,
        message: "Unable to fetch product data",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      popularProducts,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Something went wrong while fetching product data",
    });
  }
};

exports.search = async (req, res) => {
  try {
    const {
      query,
      category,
      sortBy,
      sortOrder,
      page,
      limit,
      minPrice,
      maxPrice,
      minrating,
      maxrating,
    } = req.query;

    // Build the filter object based on query parameters
    const filter = {};
    if (query) {
      filter.name = { $regex: query, $options: "i" };
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    }

    // Filter by category
    if (category) {
      const categoryObject = await Category.findOne({ name: category });
      if (categoryObject) {
        filter.category = categoryObject._id;
      }
    }

    // Filter by rating
    // const ratingFilter = rating ? { rating: parseInt(rating) } : {};
    // Object.assign(filter, ratingFilter);

    if (minrating && maxrating) {
      // const reviews = await Review.find({ rating: { $gte: parseInt(rating) } });

      // Create a map to store the average ratings for each product

      const products = await Product.find({
        averageRating: { $gte: minrating, $lt: maxrating },
      }).exec();
      const productIdsWithAvgRatings = products.map((product) => product._id);

      filter._id = { $in: productIdsWithAvgRatings };
    }

    // Build the sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Calculate skip and limit for pagination
    const skip = (page - 1) * limit;

    // Query the database with the filter, sort, and pagination options
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("category")
      .exec();

    // Calculate the total number of products for pagination
    const totalProducts = await Product.countDocuments(filter);

    // Calculate the total number of pages based on the limit
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    res.json({
      products,
      totalProducts,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
