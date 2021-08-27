import * as React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useFetch } from "../auth/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1),
    backgroundColor: "#0B345B",
    borderRadius: "10px",
    color: "white",
    user: {
      paddingLeft: "0%",
      paddingTop: "56.25%",
    },
  },
  image: {
    borderRadius: "50%",
    maxWidth: 200,
    height: 220,
    padding: 10,
  },
}));

export default function PostCard({ post }) {
  const { blogList, isLoading } = useFetch();
  const classes = useStyles();
  const history = useHistory();
  const currentUser = useContext(AuthContext);
  
  const handleDetails = (id) => {
    if (!currentUser?.currentUser?.uid) {
      alert("Please Login for Details!");
    } else {
      history.push(`/details/${id}`);
    }
  };
  
  return (
    <div>
      <Card onDoubleClick={() => handleDetails(post.id)} className={classes.root} sx={{ maxWidth: 100 }}>
        <CardMedia
          sx={{
            height: 0,
            paddingTop: "56.25%",
          }}
          >
          <img className={classes.image} src={post.imgUrl} alt="card_media"/>    
        </CardMedia>
        <div style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}>
          {post.title}
        </div>
        <AccountCircleIcon
          className={classes.user}
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
          ></AccountCircleIcon>
          {post.author}
        <br />
        <CardContent>
          <Typography variant="body2" color="textSecondary"></Typography>
          {post.content}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon style={{ color: "white" }} />
          </IconButton>
          <IconButton aria-label="share">
            <ChatBubbleIcon style={{ color: "white" }} />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
