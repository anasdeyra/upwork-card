import { MdStar, MdStarOutline } from "react-icons/md";
import { ActionIcon } from "@mantine/core";
import { useToggle } from "@mantine/hooks";

export default function Favorite() {
  const [isFavorite, toggle] = useToggle();
  return (
    <ActionIcon
      onClick={() => {
        toggle();
      }}
      color={isFavorite ? "yellow" : "gray"}
      variant="transparent"
    >
      {isFavorite ? <MdStar size={24} /> : <MdStarOutline size={24} />}
    </ActionIcon>
  );
}
