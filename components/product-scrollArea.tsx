"use client"
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // import useRouter
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Product {
  title: string;
  image: string;
  price: string;
  id: string; // added slug for dynamic routes
}

// export const products: Product[] = [
//   {
//     title: "ساعت هوشمند",
//     image: "/path/to/your/image1.jpg", // مسیر تصویر شما
//     time: "21:00",
//     slug: "smart-watch", // slug for this product
//   },
//   {
//     title: "رژیم از شنبه!",
//     image: "/path/to/your/image2.jpg", // مسیر تصویر شما
//     time: "20:00",
//     slug: "diet-from-saturday", // slug for this product
//   },
//   {
//     title: "کوله پشتی",
//     image: "/path/to/your/image3.jpg", // مسیر تصویر شما
//     time: "19:00",
//     slug: "backpack", // slug for this product
//   },
//   {
//     title: "روتین پوستی",
//     image: "/path/to/your/image4.jpg", // مسیر تصویر شما
//     time: "در حال پخش",
//     slug: "skincare-routine", // slug for this product
//   },
// ];
export function ProductScrollArea() {
  const router = useRouter(); // useRouter hook for navigation
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  // handle click function
  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`); // navigate to dynamic route
  };

  return (
    <ScrollArea className="w-full max-w-screen-lg whitespace-nowrap rounded-md border">
      <div dir="rtl" className="flex w-max space-x-4 p-4">
        {products.map((product) => (
          <figure
            key={product.title}
            className="shrink-0 cursor-pointer"
            onClick={() => handleProductClick(product.id)} // onClick handler
          >
            <div className="relative w-36 h-36 rounded-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                
                className=" object-contain w-full h-full"
                loading="lazy"
                width={90}
                height={90}
              />
              {/* نمایش زمان روی تصویر */}
              <div className="absolute z-50 bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-tl-full rounded-tr-full">
                ${product.price}
              </div>
            </div>
            <figcaption className="pt-2 text-xs text-center">
              <span
                className="font-semibold block overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
                title={product.title} // ????? ???? ????? ?? ???? ????
                style={{ maxWidth: "120px" }} // ????? ??? ????? ???? ????? ellipsis
              >
                {product.title}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
