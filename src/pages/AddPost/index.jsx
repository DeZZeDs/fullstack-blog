import React, {useState, useRef} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import axios from "../../api/instance";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const inputFileRef = useRef(null);
  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const handleChangeFile = async (event) => {
      try {
          const formData = new FormData();
          const file = event.target.files[0];
          formData.append('image', file);
          const { data } = await axios.post('/upload', formData);
          setImage(data.url);
      }
      catch(error) {
          console.log(error);
      }
  }

  const handleRemoveImage = () => {
      inputFileRef.current.value = '';
      setImage('');
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

    return (
        <Paper style={{ padding: 30 }}>
          <Button variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
            Загрузить превью
          </Button>
          <input ref={inputFileRef} onChange={(e) => handleChangeFile(e)} type="file" hidden/>
            {
                image && (<Button color="error" variant="contained" onClick={() => handleRemoveImage()}>Удалить изображение</Button>)
            }
            {
                image && (<img src={`http://localhost:4444${image}`} alt="uploaded"/>)
            }
          <br />
          <br />
          <TextField
            classes={{ root: styles.title }}
            variant="standard"
            placeholder="Заголовок статьи..."
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            classes={{ root: styles.tags }}
            variant="standard"
            placeholder="Тэги"
            fullWidth
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
          <SimpleMDE
            className={styles.editor}
            value={value}
            onChange={onChange}
            options={options}
          />
          <div className={styles.buttons}>
            <Button size="large" variant="contained">
              Опубликовать
            </Button>
            <Button size="large">Отмена</Button>
          </div>
        </Paper>
    );
};
