import Head from "next/head";
import React, { Suspense } from "react";
import CategorySection from "../../components/items/categorySection";
import Loading from "../../components/ui/Loading";

const OrderPage = () => {
  return (
    <>
      <Head>
        <title>Order</title>
      </Head>
      <section className="md:my-7  md:px-11  p-4">
        <h2 className="text-primary text-3xl font-bold mb-10">Order</h2>
        <Suspense fallback={<Loading />}>
          <div>
            <CategorySection
              category={"veg"}
              title={"Veg Dishes"}
              btnText={"View All Veg Dishes"}
            />
            <CategorySection
              category={"fastfood"}
              title={"Fast Food"}
              btnText={"View All Fast Food"}
            />
            <CategorySection
              category={"nonveg"}
              title={"Non Veg Dishes"}
              btnText={"View All Non Veg Dishes"}
            />
            <CategorySection
              category={"icecream"}
              title={"Icecream"}
              btnText={"View All Icecreams"}
            />
            <CategorySection
              category={"colddrinks"}
              title={"Cold Drinks"}
              btnText={"View All Cold Drinks"}
            />
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default OrderPage;
