import Header from "../components/Header";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";
import prisma from "../../../../prisma/prismaClient";

export const metadata = {
  title: 'Menu | Milestones Grill | OpenTable',
}

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      items: true
    }
  });

  if (!restaurant) {
    throw new Error;
  }

  return restaurant.items;
}

export default async function RestaurantMenu({ params }: { params: { slug: string } }) {

  const restaurantMenu = await fetchRestaurantMenu(params.slug);

  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <Menu menu={restaurantMenu}/>
      </div>
    </>
  );
}