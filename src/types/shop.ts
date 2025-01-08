interface CashbackRate {
  amount: number;
  type: string;
  description: string;
}

interface ShopCategory {
  id: string;
  name: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  cashbackRates?: CashbackRate[];
  categories: ShopCategory[];
  link: string;
  logo: string;
}

export interface ShopListResponse {
  currentPage: number;
  numberOfPages: number;
  numberOfResults: number;
  items: Shop[];
}
