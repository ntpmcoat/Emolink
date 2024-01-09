import React, { useEffect, useState } from "react";
import Logo from '../../Images/Logo.png';

import { fetchPostApi } from "../../../../api";

const Feeds = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchPostApi();
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="feeds">
        {posts.length > 0 ? (
          posts.map((post) => {
            const base64String = btoa(
              new Uint8Array(post.image.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            return (
              <div className="feed" key={post._id}>
                <div className="head">
                  <div className="user">
                    <div className="profile-photo">
                      <img src={Logo} alt="Profile" />
                    </div>
                    <div className="info">
                      <h3>{post.author}</h3>
                      <small>{post.timestamp}, {post.timeAgo}</small>
                    </div>
                  </div>
                  <span className="edit">
                    <i className="uil uil-ellipsis-h"></i>
                  </span>
                </div>

                <div className="photo">
                  <img src={`data:image/${post.image.contentType};base64,${base64String}`} alt="Post" />
                </div>

                <div className="action-buttons">
                  <div className="interaction-buttons">
                    <span><i className="uil uil-thumbs-up"></i></span>
                    <span><i className="uil uil-comment"></i></span>
                    <span><i className="uil uil-share"></i></span>
                  </div>
                  <div className="bookmarks">
                    <span><i className="uil uil-bookmark-full"></i></span>
                  </div>
                </div>

                <div className="caption">
                  <p><b>{/*{post.author}*/}</b>{post.caption}</p>
                </div>

                <div className="text-muted">view all{/* {post.comments.length}*/} comments</div>
              </div>
            );
          })
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </>
  );
};

export default Feeds;
