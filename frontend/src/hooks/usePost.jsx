import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
    axios
      .get(`http://localhost:3000/api/post?page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        setPage((prevPage) => prevPage + 1);
        if (res.data.length === 0) {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // alert(error.response.data.message)
        setLoading(false);
      });
  };

  return {
    loading,
    posts,
    fetchMorePosts,
    hasMore,
  };
};
