import axios from "axios";
import { Artwork } from "./types";
import defaultArtwork from "./default.json";

const api = axios.create({
  baseURL: "https://storage.googleapis.com",
});

export async function getArtwork(id: number) {
  const { data } = await api.get<Artwork>(
    `/ya-misc/interviews/front/examples/${id}.json`
  );

  return data;
}
