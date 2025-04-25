import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import { setNotificationWithTimeout } from "./notificationReducer"

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers : {
    setBlogs (state, action){
      return action.payload;
    },
    addBlog(state, action){
      state.push(action.payload)
    },
    updateBlog(state, action){
      const updatedBlog = action.payload;
      return state.map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
    },
    deleteBlog(state, action){
      const deletedBlog = action.payload;
      return state.filter((b) => b.id !== deletedBlog.id)
    }
  }
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      dispatch(addBlog(createdBlog))
      dispatch(
        setNotificationWithTimeout(
          { error: false, text: `The blog ${createdBlog.title} was created succesfully` },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout({ error: true, text: 'The blog creation has failed' }, 5)
      );
    }
  }
}

export const likeBlog = (blogToLike) => {
  return async (dispatch) => {
    try{
    const likedBlog = await blogService.update({ likes: blogToLike.likes + 1, title: blogToLike.title, author: blogToLike.author, url: blogToLike.url }, blogToLike.id)
    dispatch(updateBlog(likedBlog))
    dispatch(
            setNotificationWithTimeout(
              {
                error: false,
                text: `The blog ${blogToLike.title} has received like`
              },
              5
            )
          );
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout(
          { error: true, text: `The blog like has failed: ${exception.message}` },
          5
        )
      );
    }
  }
}

export const removeBlog = (blogToRemove) => {
  return async (dispatch) => {
    try{
    await blogService.remove(blogToRemove.id)
    dispatch(deleteBlog(blogToRemove))
    dispatch(
          setNotificationWithTimeout(
            {
              error: false,
              text: `The blog "${blogToRemove.title}" was deleted successfully`
            },
            5
          )
        );
    } catch (exception) {
        dispatch(
          setNotificationWithTimeout(
            {
              error: true,
              text: `The blog ${blogToRemove.title} was not deleted: ${exception.message}`
            },
            5
          )
        );
      }
  }
}

export default blogSlice.reducer