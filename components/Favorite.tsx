import { FaStar, FaRegStar } from "react-icons/fa";
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
      {isFavorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
    </ActionIcon>
  );
}
