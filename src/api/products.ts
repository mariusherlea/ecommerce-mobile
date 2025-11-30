import { api } from "./client";

export const getProducts = () =>
  api(`/products?populate=images`);

export const getProduct = (documentId: string) =>
  api(`/products?filters[documentId][$eq]=${documentId}`);
