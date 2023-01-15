import { Carousel as C } from "@mantine/carousel";
import { Image } from "@mantine/core";

export default function Carousel({ images }: { images: string[] }) {
  return (
    <C
      height={200}
      slideSize="25%"
      breakpoints={[
        { maxWidth: "xs", slideSize: "100%", slideGap: 2 },
        { maxWidth: "sm", slideSize: "50%", slideGap: 4 },
        { maxWidth: "md", slideSize: "33.33333%", slideGap: "xs" },
        { minWidth: "xl", slideSize: "20%", slideGap: "md" },
      ]}
      slideGap="md"
      loop
      align="start"
    >
      {images.map((image, i) => (
        <C.Slide key={i}>
          <Image height={220} src={image} />
        </C.Slide>
      ))}
    </C>
  );
}
