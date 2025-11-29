import { api } from "./client";

export const getProducts = () =>
  api(`/products?populate=images`);

export const getProduct = (id: string) =>
  api(`/products/${id}?populate=images`);
