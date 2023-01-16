import { Breadcrumbs, Anchor } from "@mantine/core";
import { FaChevronRight } from "react-icons/fa";

export default function BreadCrumbs({
  items,
}: {
  items: { title: string; href: string }[];
}) {
  return (
    <>
      <Breadcrumbs separator={<FaChevronRight size={12} color="gray" />}>
        {items.map((item, index) => (
          <Anchor
            size={"sm"}
            weight={600}
            color={index === items.length - 1 ? "dark" : "gray"}
            href={item.href}
            key={index}
          >
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
    </>
  );
}
