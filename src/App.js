import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data?.products);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectedPage = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10)
      setPage(selectedPage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products?.slice(page * 10 - 10, 10 * page).map((prod) => {
            return (
              <span className="product__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="paginations">
          <span
            className={page > 1 ? "" : "paginationDisabled"}
            onClick={() => handleSelectedPage(page - 1)}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selectedPage" : ""}
                onClick={() => handleSelectedPage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => handleSelectedPage(page + 1)}
            className={page < products.length / 10 ? "" : "paginationDisabled"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
