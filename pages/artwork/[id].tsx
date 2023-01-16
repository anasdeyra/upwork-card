import { useRouter } from "next/router";
import { Artwork } from "../../types";
import { getArtwork } from "../../api";
import {
  createStyles,
  Box,
  Text,
  Stack,
  Title,
  Button,
  Group,
  Space,
  Accordion,
  TextInput,
} from "@mantine/core";

import Carrousel from "../../components/Carousel";
import Favorite from "../../components/Favorite";
import Head from "next/head";

import {
  FaHourglassHalf as FaHourglass,
  FaCheck,
  FaTruck,
  FaMapMarkerAlt as MapPin,
} from "react-icons/fa";
import BreadCrumbs from "../../components/BreadCrumbs";

const useStyles = createStyles((t) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: t.spacing.xl,
    [t.fn.smallerThan("md")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
    },
  },

  imageContainer: {
    width: "100%",
    overflow: "hidden",
  },
  image: {
    objectFit: "cover",
    objectPosition: "center",
    height: 500,
    borderRadius: t.radius.md,
  },
}));

export default function ArtworkPage({ artworkData }: { artworkData: Artwork }) {
  const router = useRouter();

  if (router.isFallback || !artworkData) {
    return <div>Loading...</div>;
  }

  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>{artworkData.title}</title>
        <meta name="description" content={artworkData.description} />
        <meta property="og:image" content={artworkData.imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={artworkData.title} />
        <meta property="og:title" content={artworkData.title} />
        <meta property="og:description" content={artworkData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Artwork" />
      </Head>
      <Box my={"xl"} sx={{ display: "block" }}>
        <BreadCrumbs
          items={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Paintings",
              href: "/paintings",
            },

            {
              title: `${artworkData.artistShort.fullname} Artworks`,
              href: `/artist/${artworkData.artistId}/artworks`,
            },

            {
              title: artworkData.title,
              href: `/artwork/${artworkData._id}`,
            },
          ]}
        />
        <Space mt={"md"} />
        {/* Image section  */}
        <Box className={classes.container}>
          <Stack className={classes.imageContainer}>
            <img
              className={classes.image}
              src={artworkData.imageUrl}
              alt={artworkData.title}
            />

            {/* Accordion  */}
            <Accordion mt={"xl"} defaultValue={"desc"}>
              <Accordion.Item value="desc">
                <Accordion.Control>
                  <Text size={"xl"}>Description</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>{artworkData.description}</Text>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="properties">
                <Accordion.Control>
                  <Text size={"xl"}>Subject, Medium, Style, Materials</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <table style={{ borderSpacing: 10 }}>
                    <tbody>
                      <tr>
                        <td>
                          <Text weight={600}>Subject</Text>
                        </td>
                        <td>{artworkData.subjects.join(", ")}</td>
                      </tr>
                      <tr>
                        <td>
                          <Text weight={600}>Medium</Text>
                        </td>
                        <td>{artworkData.mediums.join(", ")}</td>
                      </tr>
                      <tr>
                        <td>
                          <Text weight={600}>Style</Text>
                        </td>
                        <td>{artworkData.styles.join(", ")}</td>
                      </tr>
                      <tr>
                        <td>
                          <Text weight={600}>Materials</Text>
                        </td>
                        <td>{artworkData.materials.join(", ")}</td>
                      </tr>
                    </tbody>
                  </table>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Stack>

          {/* Properties  */}
          <Stack spacing={0}>
            {/* Title  */}
            <Group position="apart">
              <Title size={26} order={1}>
                {artworkData.title}
              </Title>
              <Favorite />
            </Group>

            {/* Artist  */}

            <Text mt={4} color={"orange"} weight={"bold"}>
              {artworkData.artistShort.fullname}{" "}
              <span style={{ color: "#999" }}>
                {artworkData.artistShort.country}
              </span>
            </Text>

            {/* Year  */}
            <Text mt={"md"} weight={"bold"} size={"sm"}>
              {artworkData.category.toLocaleLowerCase()},{" "}
              {artworkData.creationYear}
            </Text>

            {/* Dimensions  */}
            <Text mt={4} weight={"bold"} size={"sm"}>
              {artworkData.dimensions.width} W x {artworkData.dimensions.height}{" "}
              H x {artworkData.dimensions.depth} D in
            </Text>

            {/* Price  */}
            <Text mt={"xl"} weight={"bold"} size={26}>
              {artworkData.price
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              €
            </Text>

            {/* Buttons  */}
            <Stack mt={"xl"}>
              <Button radius={"xl"}>Acquire</Button>
              <Button radius={"xl"} variant="outline">
                Make offer
              </Button>
            </Stack>

            {/* Shipping  */}
            <Box mt={"xl"}>
              <Group sx={{ color: "#111" }} align={"center"}>
                <FaHourglass />
                <Text weight={"bold"} size={"sm"}>
                  Pre-reserve for 24 hours
                </Text>
              </Group>
              <Group sx={{ color: "#111" }} mt={"xs"} align={"center"}>
                <FaCheck />
                <Text weight={"bold"} size={"sm"}>
                  131 € estimated delivery free for france
                </Text>
              </Group>
              <Text mt={"xl"} weight={600}>
                in order to get obtain an accurate delevery fee, please enter
                your country and zip code:
              </Text>

              {/* Country and zip code input  */}
              <Group grow mt={"xs"}>
                <TextInput radius={"md"} placeholder="Country" />
                <TextInput
                  radius={"md"}
                  type={"number"}
                  placeholder="Zip code"
                />
              </Group>

              <Stack mt={"xl"} spacing={"xs"}>
                <Group sx={{ color: "#111" }} align={"center"}>
                  <FaTruck />
                  <Text size={"sm"} weight={"bold"}>
                    Delivery fee is 129 €
                  </Text>
                </Group>
                <Group sx={{ color: "#111" }} align={"center"}>
                  <MapPin />
                  <Text size={"sm"} weight={"bold"}>
                    Free pick-up in{" "}
                    <span style={{ color: "#666" }}>Bruxelles, Belgium</span>
                  </Text>
                </Group>
                <Group sx={{ color: "#111" }} align={"center"}>
                  <FaCheck />
                  <Text size={"sm"} weight={"bold"}>
                    Try 14 days at home for free
                  </Text>
                </Group>
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Space mt={64} />

        {/* Carousel  */}
        <Carrousel images={artworkData.otherArtworkImages} />
      </Box>
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: number };
}) {
  let artworkData;
  try {
    artworkData = await getArtwork(params.id);
  } catch (error) {}

  if (!artworkData)
    return {
      notFound: true,
    };

  return {
    props: {
      artworkData,
    },
  };
}
