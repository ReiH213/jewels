"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import { calcDynamicPrice } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { div } from "motion/react-client";

const colorClassMap: { [key: string]: string } = {
  yellow: "bg-yellow-200",
  white: "bg-gray-200",
  pink: "bg-pink-200",
};
const colors = {
  orange: "#F2C265",
  grey: "a9a9a9",
};
const JewelsCarousel = ({ items }: { items: JewelItem[] }) => {
  // State to track the selected color for each item
  const [selectedColors, setSelectedColors] = useState<{
    [key: string]: string;
  }>({});
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  // Function to calculate prices
  const calculatePrices = async () => {
    const newPrices: { [key: string]: number } = {};
    for (const item of items) {
      const price = await calcDynamicPrice(item.popularityScore, item.weight);
      newPrices[item.name] = price;
    }
    setPrices(newPrices);
  };
  // Handle color selection
  const handleColorSelect = (itemName: string, color: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [itemName]: color,
    }));
  };
  useEffect(() => {
    calculatePrices();
  }, [items]);

  return (
    <motion.div
      className="max-w-[80vw] w-full"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 3 },
      }}
    >
      <Carousel className="w-full-lg mt-16" opts={{ dragFree: true }}>
        <CarouselContent className="gap-x-8">
          {items.map((item: JewelItem) => {
            // Get the selected color or default to the first image color
            const selectedColor =
              selectedColors[item.name] || item.images[0].color;

            // Get the URL of the image corresponding to the selected color
            const selectedImage = item.images.find(
              (image) => image.color === selectedColor
            )?.url;

            return (
              <CarouselItem
                key={item.name}
                className="md:basis-1/3 lg:basis-1/4 flex flex-col gap-y-4"
              >
                <Image
                  src={`/${selectedImage}`}
                  alt={item.name}
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
                <h2 className="font-semibold">{item.name}</h2>
                <h2 className="font-semibold">
                  {" "}
                  Price:{" "}
                  {prices[item.name]
                    ? `$${prices[item.name].toFixed(2)}`
                    : "Loading..."}
                </h2>
                <div className="flex flex-row gap-x-1 p-2">
                  {item.images.map((image) => (
                    <div
                      key={image.color}
                      className={`flex h-8 w-8 rounded-full cursor-pointer ${
                        colorClassMap[image.color] || ""
                      } ${
                        selectedColor === image.color
                          ? "ring-2 ring-gray-600" // Highlight the selected color
                          : ""
                      }`}
                      onClick={() => handleColorSelect(item.name, image.color)}
                    />
                  ))}
                </div>
                <h2 className="font-semibold">
                  Golden{" "}
                  {selectedColor.charAt(0).toUpperCase() +
                    selectedColor.slice(1)}
                </h2>
                <div className="flex flex-row">
                  {[1, 2, 3, 4, 5].map((_, index) => {
                    return (
                      <Star
                        key={index}
                        size={24}
                        color={colors.orange}
                        fill={
                          item.popularityScore / 20 >= index
                            ? colors.orange
                            : "white"
                        }
                      />
                    );
                  })}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.div>
  );
};

export default JewelsCarousel;
