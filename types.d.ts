export interface Dimensions {
  depth: number;
  height: number;
  width: number;
}

export interface ArtistShort {
  name: string;
  country: string;
  countryCode: string;
  fullname: string;
}

export interface Artwork {
  _id: string;
  title: string;
  category: string;
  styles: string[];
  mediums: string[];
  materials: string[];
  subjects: string[];
  description: string;
  dimensions: Dimensions;
  creationYear: number;
  imageUrl: string;
  price: number;
  artistShort: ArtistShort;
  fullname: string;
  status: string;
  artistId: string;
  otherArtworkImages: string[];
}
