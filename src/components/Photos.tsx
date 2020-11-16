import React from "react";
import styled from "styled-components";
import { PhotoURLs } from "../types";

const Image = styled.img`
  display: flex;
  flex-direction: column;
  width: 115px;
  height: 115px;
  object-fit: cover;
`;

interface PhotosProps {
  photoLinks: PhotoURLs;
}

function Photos(props: PhotosProps) {
  const { photoLinks } = props;
  const photos = [];
  const homePhotos = Object.values(photoLinks);
  for (let i = 0; i < homePhotos.length; i++) {
    photos.push(<Image src={homePhotos[i]} />);
  }

  return <div>{photos}</div>;
}

export default Photos;
