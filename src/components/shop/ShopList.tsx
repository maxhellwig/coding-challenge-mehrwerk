import { useShopListQuery } from "../../app/services/shopApi.ts";
import { ShopListItem } from "./ShopListItem.tsx";
import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";

export function ShopList() {
  const { currentData, isFetching, isError } = useShopListQuery();

  if (isError) return <div>An error has occurred!</div>;

  if (isFetching && !currentData) return <Spinner />;

  return (
    <Box p={4}>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {currentData?.map((shop, index) => (
          <ShopListItem key={index} shop={shop} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
