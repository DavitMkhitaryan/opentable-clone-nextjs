import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PRICE } from "@prisma/client";
import prisma from "../../prisma/prismaClient";

export const metadata = {
  title: "Search | OpenTable",
};

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  cuisine: true,
  location: true,
  slug: true,
};

const fetchLocations = async () => {
  return prisma.location.findMany();
};

const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
};

const fetchRestaurantsBySearchParams = async ({city, cuisine, price}: SearchParams) => {
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city?.toLowerCase(),
        },
      },
      cuisine: {
        name: {
          equals: cuisine?.toLocaleLowerCase(),
        },
      },
      price,
    },
    select,
  });
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await fetchRestaurantsBySearchParams(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => {
              return (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              );
            })
          ) : (
            <p>Sorry, we found no restaurants at this area</p>
          )}
        </div>
      </div>
    </>
  );
}
