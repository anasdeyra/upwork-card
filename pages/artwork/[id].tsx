//next js page boilerplate
import { useRouter } from "next/router";
import { Artwork } from "../../types";
import { getArtwork } from "../../api";
import {
  createStyles,
  Image,
  Box,
  Text,
  Stack,
  Title,
  Button,
  Group,
  Space,
  Accordion,
} from "@mantine/core";

import Carrousel from "../../components/Carousel";
import Favorite from "../../components/Favorite";

const useStyles = createStyles((t) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: t.spacing.xl,
  },
  image: {
    maxHeight: 300,
  },
}));

export default function ArtworkPage({ artworkData }: { artworkData: Artwork }) {
  const router = useRouter();

  if (router.isFallback || !artworkData) {
    return <div>Loading...</div>;
  }

  const { classes } = useStyles();

  return (
    <Box my={"xl"} sx={{ display: "block" }}>
      <Box className={classes.container}>
        <Stack>
          <Image
            //   className={classes.image}
            src={artworkData.imageUrl}
            alt={artworkData.title}
            fit="cover"
            radius="md"
          />
          <Accordion>
            <Accordion.Item value="Description">
              <Accordion.Control>Description</Accordion.Control>
              <Accordion.Panel>
                <Text>{artworkData.description}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Stack>

        <Stack miw={400} spacing={0}>
          <Group position="apart">
            <Title size={26} order={1}>
              {artworkData.title}
            </Title>
            <Favorite />
          </Group>
          <Text mt={"xs"} color={"orange"} weight={"bold"}>
            {artworkData.artistShort.name}{" "}
            <span style={{ color: "#999" }}>
              {" "}
              {artworkData.artistShort.country}
            </span>
          </Text>
          <Text mt={"xs"} weight={"bold"} size={"sm"}>
            {artworkData.category.toLocaleLowerCase()},{" "}
            {artworkData.creationYear}
          </Text>
          <Text weight={"bold"} size={"sm"}>
            {artworkData.dimensions.width} W x {artworkData.dimensions.height} H
            x {artworkData.dimensions.depth} D in
          </Text>
          <Text mt={"xl"} weight={"bold"} size={26}>
            {artworkData.price} €
          </Text>
          <Stack mt={"xl"}>
            <Button radius={"xl"}>Acquire</Button>
            <Button radius={"xl"} variant="outline">
              Make offer
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Space mt={"xl"} />
      <Carrousel images={artworkData.otherArtworkImages} />
    </Box>
  );
}

//nextjs ssr boilerplate
export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}) {
  const artworkData = await getArtwork(params.id);

  return {
    props: {
      artworkData,
    },
  };
}
