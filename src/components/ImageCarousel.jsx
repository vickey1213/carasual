import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from "@material-ui/icons";

const images = [
  {
    id: 1,
    src: "https://picsum.photos/640/480?random=1",

    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 2,
    src: "https://picsum.photos/640/480?random=2",

    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    id: 3,
    src: "https://picsum.photos/640/480?random=3",

    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
];

const THUMBNAIL_SIZE = 60;
const SLIDESHOW_INTERVAL = 3000;

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "#292b2f",
    color: "white",
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: "70%",
    height: "auto",
    borderRadius: "20px",
    marginRight: theme.spacing(2),
  },
  thumbnailContainer: {
    height: THUMBNAIL_SIZE,
    overflowX: "auto",
    whiteSpace: "nowrap",
  },
  thumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    filter: "grayscale(100%)",
    cursor: "pointer",
    "&:hover": {
      filter: "none",
    },
  },
  thumbnailSelected: {
    filter: "none",
  },
  descriptionContainer: {
    margin: theme.spacing(2),
  },
}));

const ImageCarousel = () => {
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [randomText, setRandomText] = useState("");

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
    setRandomText("");
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
    setRandomText("");
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setIsSlideshowActive(false);
    setRandomText("");
  };

  const handlePlayPauseClick = () => {
    setIsSlideshowActive(!isSlideshowActive);
  };

  useEffect(() => {
    let slideshowIntervalId;
    if (isSlideshowActive) {
      slideshowIntervalId = setInterval(
        () => setCurrentImageIndex((currentImageIndex + 1) % images.length),
        SLIDESHOW_INTERVAL
      );
    }
    return () => clearInterval(slideshowIntervalId);
  }, [currentImageIndex, isSlideshowActive]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 3);
    setRandomText(images[randomIndex].description);
  }, [currentImageIndex]);

  return (
    <Box mt={4} sx={{}}>
      <Grid container spacing={4} className={classes.container}>
        <Grid item xs={12} md={8}>
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].title}
            className={classes.image}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <IconButton onClick={handlePrevious} color="inherit">
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={handlePlayPauseClick} color="inherit">
              {isSlideshowActive ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={handleNext} color="inherit">
              <NavigateNextIcon />
            </IconButton>
          </Paper>
          <Box mt={2} className={classes.thumbnailContainer}>
            {images.map((image, index) => (
              <img
                key={image.id}
                src={image.src}
                alt={image.title}
                className={`${classes.thumbnail} ${
                  index === currentImageIndex && classes.thumbnailSelected
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </Box>
          <Box mt={2} className={classes.descriptionContainer}>
            <Typography variant="h6" gutterBottom>
              {images[currentImageIndex].title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {randomText}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageCarousel;
