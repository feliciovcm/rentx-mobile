import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage
} from './styles';

interface ImageSlider {
  imagesUrl: string[];
}

interface InfoChangeView {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider(props: ImageSlider) {
  const { imagesUrl } = props;
  const [viewIndex, setViewIndex] = useState(0);

  const indexChanged = useRef((info: InfoChangeView) => {
    setViewIndex(info.viewableItems[0].index)
  });

  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((item, index) => (
            <ImageIndex key={item} active={index === viewIndex} />
          ))
        }
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item}
        renderItem={({ item }) =>
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />

    </Container>
  );
}
