import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type {AuctionItem} from "@/type";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default {
  getAuctionItem(perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
    return apiClient.get<Array<AuctionItem>>(
        "/items?_limit=" + perPage + "&_page=" + page
    );
  },
  getAuctionById(id: number): Promise<AxiosResponse<AuctionItem>> {
    return apiClient.get<AuctionItem>("items/" + id.toString());
  },
  getAuctionByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
    return apiClient.get<AuctionItem[]>('/items?des='+keyword+'&_limit='+perPage+'&_page='+page)
  },
  getItemLessThanKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
    return apiClient.get<AuctionItem[]>('/items?amount=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  }

};
