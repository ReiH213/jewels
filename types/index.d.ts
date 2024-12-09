declare type JewelItem = {
  name: string;
  popularityScore: number;
  weight: number;
  images: imageObject[];
};

declare type imageObject = {
  url: string;
  color: string;
};
