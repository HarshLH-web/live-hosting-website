// src/store/useBlogStore.js
import {create} from 'zustand';
import axios from 'axios';

const useBlogStore = create((set, get) => ({
  blogs: [],
  fullBlogs: {},
  isLoading: true,
  fetchBlogs: async (tagParam) => {
    set({ isLoading: true });
    try {
      const response = await axios.get('https://webpanel.store/api/blogs/selected-fields');
      const filteredBlogs = response.data.filter(blog => blog.toPublish).filter(blog => 
        tagParam 
          ? blog.tags.some(tag => 
              tag.toLowerCase().includes(tagParam.toLowerCase()) ||
              tagParam.toLowerCase().includes(tag.toLowerCase())
            )
          : true
      ).reverse();
      
      set({ blogs: filteredBlogs });

      const fullResponse = await axios.get('https://webpanel.store/api/blogs');
      const fullData = fullResponse.data.reduce((acc, blog) => {
        acc[blog.slug] = blog;
        return acc;
      }, {});
      set({ fullBlogs: fullData });

    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  getBlogById: (slug) => {
    const { fullBlogs } = get();
    return fullBlogs[slug] || null;
  }
}));

export default useBlogStore;