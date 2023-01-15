import { Carousel as C } from "@mantine/carousel";
import { Image } from "@mantine/core";

export default function Carousel({ images }: { images: string[] }) {
  return (
    <C
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={3}
    >
      {images.map((image, i) => (
        <C.Slide key={i}>
          <Image src={image} />
        </C.Slide>
      ))}
    </C>
  );
}
