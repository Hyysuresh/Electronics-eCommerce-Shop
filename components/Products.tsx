// *********************
// Role of the component: Showing products on the shop page with applied filter and sort
// Name of the component: Products.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Products params={params} searchParams={searchParams} />
// Input parameters: { params, searchParams }: { params: { slug?: string[] }, searchParams: { [key: string]: string | string[] | undefined } }
// Output: products grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import apiClient from "@/lib/api";

const Products = async ({ params, searchParams }: { params: { slug?: string[] }, searchParams: { [key: string]: string | string[] | undefined } }) => {
  // getting all data from URL slug and preparing everything for sending GET request
  const inStockNum = searchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = searchParams?.outOfStock === "true" ? 1 : 0;
  const page = searchParams?.page ? Number(searchParams?.page) : 1;

  // Default: show all products when no availability filters are set
  let stockMode: string = "gte";

  // prepare stock mode based on checkboxes
  // If only "in stock" is selected -> show inStock >= 1
  if (inStockNum === 1 && outOfStockNum === 0) {
    stockMode = "gte";
  }

  // If only "out of stock" is selected -> show inStock < 1
  if (outOfStockNum === 1 && inStockNum === 0) {
    stockMode = "lt";
  }

  // If both are selected -> show inStock <= 1 (both 0 and 1)
  if (inStockNum === 1 && outOfStockNum === 1) {
    stockMode = "lte";
  }

  // Determine comparison value: when no filters selected use 0 to include all
  const stockValue = inStockNum === 0 && outOfStockNum === 0 ? 0 : 1;

  let products = [];

  try {
    // debug logs for SSR
    // eslint-disable-next-line no-console
    console.log('Products SSR: NEXT_PUBLIC_API_BASE_URL=', process.env.NEXT_PUBLIC_API_BASE_URL);
    // eslint-disable-next-line no-console
    console.log('Products SSR: fetching products with query params', { stockMode, page, searchParams, params });
    // sending API request with filtering, sorting and pagination for getting all products
    const data = await apiClient.get(`/api/products?filters[price][$lte]=${
        searchParams?.price || 3000
      }&filters[rating][$gte]=${
        Number(searchParams?.rating) || 0
      }&filters[inStock][$${stockMode}]=${stockValue}&${
        params?.slug?.length! > 0
          ? `filters[category][$equals]=${params?.slug}&`
          : ""
      }sort=${searchParams?.sort}&page=${page}`
    );

    if (!data.ok) {
      console.error('Failed to fetch products:', data.statusText);
      products = [];
    } else {
      const result = await data.json();
      products = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {products.length > 0 ? (
        products.map((product: any) => (
          <ProductItem key={product.id} product={product} color="black" />
        ))
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
          No products found for specified query
        </h3>
      )}
    </div>
  );
};

export default Products;
