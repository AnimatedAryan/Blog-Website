import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';
export const create = async (req, res, next) => {
    console.log("came here 1");
  
    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    console.log("came here 2");
  
    // Check for required fields (title and content)
    if (!req.body.title || !req.body.content) {
      console.log(req.body); // This will log the request body for debugging
      return next(errorHandler(400, 'Please provide all required fields'));
    }
    console.log("came here 3");
  
    // Generate a slug from the title
    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');
  
    // Create a new post object
    const newPost = new Post({
      ...req.body,  // Spread the title, content, and category
      slug,
      userId: req.user.id,  // Associate the post with the logged-in user
    });
  
    try {
      // Save the new post to the database
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);  // Respond with the saved post
    } catch (error) {
      next(error);  // Catch and pass errors to the error handler
    }
  };
  
export const getposts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { category: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
      const totalPosts = await Post.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
      });
    } catch (error) {
      next(error);
    }
  };