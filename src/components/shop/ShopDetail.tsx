import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { useShopItemQuery } from "../../app/services/shopApi.ts";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  ListItem,
  Spacer,
  Spinner,
  Text,
  Tooltip,
  UnorderedList,
} from "@chakra-ui/react";

export function ShopDetail() {
  const truncate = (str: string) => {
    return str.length > 140 ? str.substring(0, 140) + "..." : str;
  };

  const { id } = useParams<{ id: string }>();

  if (!id)
    return (
      <Alert status="error">
        <AlertIcon />
        No shop id provided
      </Alert>
    );

  const { data: shop, error, isLoading } = useShopItemQuery(id);

  if (isLoading) return <Spinner />;
  if (error) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status}`
        : "An unknown error occurred";
    return (
      <Alert status="error">
        <AlertIcon />
        {errorMessage}
      </Alert>
    );
  }

  if (shop == null) {
    return null;
  }
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" m={4}>
      <Flex wrap="wrap">
        <Box>
          <Heading as="h1" size="lg">
            {shop.name}
          </Heading>
          <Image
            src={shop.logo}
            alt={shop.name}
            boxSize="200px"
            mb={4}
            fallbackSrc="https://via.placeholder.com/150"
          />{" "}
          <Tooltip label={shop.description}>
            <Box bg="white" p={4} mb={5}>
              <Text
                fontSize="md"
                color="gray.600"
                textAlign="center"
                maxWidth="500px"
              >
                {truncate(shop.description)}
              </Text>
            </Box>
          </Tooltip>
        </Box>
        <Spacer />
        <Box bg="gray.50" p="8">
          <Flex direction="column">
            {shop.cashbackRates != null && shop.cashbackRates.length > 0 && (
              <Box>
                <Heading as="h2" size="md" mb={2}>
                  Cashback Raten
                </Heading>
                <UnorderedList>
                  {shop.cashbackRates?.map((rate, index) => (
                    <ListItem key={index}>
                      {rate.amount}&nbsp;
                      {rate.type} {rate.description}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
            )}

            <Spacer />
            {shop.categories != null && shop.categories.length > 0 && (
              <Box mt={8}>
                <Heading as="h2" size="md" mb={2}>
                  Kategorien
                </Heading>
                <UnorderedList>
                  {shop.categories?.map((rate, index) => (
                    <ListItem key={index}>{rate.name}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
      <ChakraLink as={ReactRouterLink} to="/" color="blue.500">
        Zurück zur Übersicht
      </ChakraLink>
    </Box>
  );
}
