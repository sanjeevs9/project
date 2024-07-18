import PostCard from "./PostCard";
import Header from "./Header";
import { createAvatar } from "@dicebear/core";
import { miniavs } from "@dicebear/collection";
import { usePost } from "../hooks/usePost";
import InfiniteScroll from "react-infinite-scroll-component";

const avatar = (seed) =>
  createAvatar(miniavs, {
    seed: seed,
  });

export default function Dashboard() {
  const { posts, fetchMorePosts, hasMore } = usePost();

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col justify-center max-w-xl p-10  gap-4 min-w-max ">
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {posts.map((post) => {
              const seed = Math.random().toString();
              const svg = avatar(seed);
              return (
                <PostCard
                  author={post.author}
                  published={post.publish_date}
                  title={post.title}
                  content={post.description}
                  avatar={svg.toString()}
                  id={post._id}
                ></PostCard>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
