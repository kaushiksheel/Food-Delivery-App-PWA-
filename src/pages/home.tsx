import React from "react";
import { useQuery } from "react-query";
import { getRestaurants } from "../api/request";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { Skeleton } from "../components/Skeleton";
import { IRestaurant, IRestaurantDetail } from "../interfaces/IRestaurant";

function Home() {
  const { data, isLoading } = useQuery("restaurants", getRestaurants);

  const restaurants = data?.data?.cards[2]?.data?.data?.cards;

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {isLoading
              ? [...new Array(15)].map((item, index) => (
                  <Skeleton key={index} />
                ))
              : restaurants?.map(({ data }: { data: IRestaurant }) => (
                  <Card key={data.id} data={data} />
                ))}
          </div>
        </Container>
      </main>
    </>
  );
}

export default Home;
