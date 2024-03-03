import axios from "axios";
import { useEffect, useState } from "react"

export const usePost = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMorePosts();
  }, []);

  const fetchMorePosts = () => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/post?page=${page}&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data);
      setPosts(prevPosts => [...prevPosts, ...res.data]);
      setPage(prevPage => prevPage + 1);
      if (res.data.length ===0) {
        setHasMore(false);
      }
      setLoading(false);
    }).catch(error => {
      console.error(error);
      setLoading(false);
    });
  };

  return {
    loading,
    posts,
    fetchMorePosts,
    hasMore
  };
};