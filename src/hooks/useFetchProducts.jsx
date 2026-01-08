import  { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const useFetchProducts = ({ searchTerm, page }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Reset products when search term changes
  useEffect(() => {
    setProducts([]);
    setHasMore(true);
  }, [searchTerm]);

  const fetchProducts = async () => {
    if (!hasMore) return;
    
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/task/products/search?search=${searchTerm}&page=${page}&limit=10`
      );
      
      if (res.data && Array.isArray(res.data)) {
        if (res.data.length === 0) {
          setHasMore(false);
        } else {
             setProducts((prev) => {
            // Filter out duplicates based on ID to be safe, though strict pagination should avoid it
            const newProducts = res.data.filter(
              (newP) => !prev.some((p) => p.id === newP.id)
            );
            return [...prev, ...newProducts];
          });
        }
      }
    } catch (error) {
      console.error("Error fetching products:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm]);

  return { products, loading, hasMore };
};

export default useFetchProducts;
