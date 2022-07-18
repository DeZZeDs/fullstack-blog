import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTags} from "../../store/Slices/postsSlice";
import TagIcon from "@mui/icons-material/Tag";
import ListItemIcon from "@mui/material/ListItemIcon";
import './TagsList.scss';

const TagsList = () => {
    const dispatch = useDispatch();
    const { tags } = useSelector((state) => state.postReducer);
    const [activeTag, setActiveTag] = useState(null);

    useEffect(() => {
        dispatch(fetchTags());
    },[dispatch]);

    return (
        <ul className="tagsList">
            {
                tags.items.map((tag, index) => (
                    <li key={tag} className={index === activeTag ? 'selected' : null} onClick={(e) => setActiveTag(index)}>
                        <ListItemIcon>
                            <TagIcon/>
                        </ListItemIcon>
                        {tag}
                    </li>
                ))
            }

        </ul>
    );
};

export default TagsList;
