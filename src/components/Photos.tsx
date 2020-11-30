import React from "react";
import styled from "styled-components";
import { PhotoURLs } from "../types";

interface PhotosProps {
  photoLinks: PhotoURLs;
}

function Photos(props: PhotosProps) {
  const { photoLinks } = props;
  const photos = [];
  const homePhotos = Object.values(photoLinks);
  for (let i = 0; i < homePhotos.length; i++) {
    photos.push(<Image key={i} src={homePhotos[i]} />);
  }

  return <div>{photos}</div>;
}

const Image = styled.img`
  display: flex;
  flex-direction: column;
  width: 115px;
  height: 115px;
  object-fit: cover;
  border-radius: 10px;
  margin: 30px 10px 30px 10px;
  border: solid white;
  border-width: 1px 1px;
  border-radius: 10px;
`;

export default Photos;
