import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../api/instance";

export const FullPost = () => {
    const [postData, setPostData] = useState({});
    const [author, setAuthor] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/posts/${id}`).then((res) => {
            setPostData(res.data.document);
            setAuthor(res.data.author);
        });
    },[id]);

    return (
    <>
      <Post
        id={postData._id}
        title={postData.title}
        imageUrl={postData.imageUrl}
        user={{
          avatarUrl:
            "",
          fullName:`${author.fullName}`,
        }}
        createdAt={postData.createdAt}
        viewsCount={postData.viewsCount}
        commentsCount={3}

        tags={postData.tags !== undefined ? postData.tags : ["react"]}

        isFullPost
      >
        <p>
            {
                postData.text
            }
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
    );
};
