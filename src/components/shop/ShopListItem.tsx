import "./ShopListItem.css";
import { Shop } from "../../types";
import { Link } from "react-router-dom";
import { Box, Icon, Image, Text, Tooltip } from "@chakra-ui/react";
import { FavoriteStar } from "../icons/FavoriteStar.tsx";
import { useDispatch, useSelector } from "react-redux";
import { updateIsFavorite } from "../../feature/shop/shopSlice.ts";
import { RootState } from "../../app/store.ts";

export function ShopListItem({ shop: { id, logo, name } }: { shop: Shop }) {
  const dispatch = useDispatch();

  const favorite = useSelector(
    (state: RootState) =>
      state.shop.shops.find((shop) => shop.id === id)?.isFavorite,
  );

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="gray.50"
    >
      <div className={"box-head"}>
        <Image
          src={logo}
          alt={name}
          height="150px"
          mx="auto"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Tooltip label={"Favorit"}>
          <Icon
            cursor="pointer"
            role="button"
            name="favorit"
            onClick={() =>
              dispatch(updateIsFavorite({ id, isFavorite: favorite }))
            }
            className={"box-head__icon"}
            width={6}
            height={6}
          >
            <FavoriteStar favorite={favorite ? favorite : false}></FavoriteStar>
          </Icon>
        </Tooltip>
      </div>

      <Box p={4}>
        <Text fontWeight="bold" fontSize="xl" mb={2}>
          {name}
        </Text>
        <Link
          to={`/shop/${id}`}
          style={{ textDecoration: "none", color: "blue" }}
        >
          Zur Detailseite
        </Link>
      </Box>
    </Box>
  );
}
