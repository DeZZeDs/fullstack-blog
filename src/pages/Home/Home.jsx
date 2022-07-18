import React, {useEffect} from "react";
import Grid from "@mui/material/Grid";

import { Post } from "../../components/Post";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../store/Slices/postsSlice";
import Sort from "../../components/Sort";

import styles from './Home.module.scss';
import TagsList from "../../components/TagsList";

export const Home = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.postReducer);
    useEffect(() => {
        dispatch(fetchPosts());
    },[dispatch]);

    return (
    <>
        <div className={styles.homeTopWrapper}>
            <Sort/>
            <Link to="/posts/create">
                <button>Написать статью</button>
            </Link>
        </div>

        <TagsList/>

        <Grid container spacing={4}>
            <Grid xs={4} item>
              {posts.items.map((obj, index) => (
                <Post
                  id={obj.posts[0]._id}
                  key={obj.posts[0]._id !== undefined ? obj.posts[0]._id : index }
                  title={obj.posts[0].title}
                  imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                  user={{
                    avatarUrl:
                      "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                    fullName: `${obj.posts[0].author.fullName}`,
                  }}
                  createdAt={obj.posts[0].createdAt}
                  viewsCount={obj.posts[0].viewsCount}
                  commentsCount={3}
                  tags={obj.posts[0].tags}
                  isEditable
                />
              ))}
            </Grid>
        </Grid>
    </>
    );
};
