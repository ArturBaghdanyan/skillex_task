import { useEffect, useState, useCallback } from "react";
import headPhoneImg from "../../assets/headphone.png";
import speaker from "../../assets/speaker.png";
import shoes from "../../assets/shoes.png";
import smartphone from "../../assets/smartphone.png";
import jacket from "../../assets/jacket.png";

import style from "./style.module.scss";

export const FetchData = ({ list, setList, setError }) => {
  const [show, setShow] = useState(false);

  const dataFetch = useCallback(async () => {
    try {
      const response = await fetch("/products.json");
      if (!response.ok) {
        throw new Error("Failed to fetch products. Please try again later.");
      }
      const data = await response.json();

      const validProducts = data.products.filter(
        (product) => product.rating > 0,
      );

      setList(validProducts);
      localStorage.setItem("items", JSON.stringify(validProducts));
      setShow(true);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }, [setList, setError]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("items"));

      if (items && items.length > 0) {
        setList(items.filter((item) => item.rating > 0));
        setShow(true);
        setError("");
      } else {
        setError("No items found in local storage!");
      }
    } catch {
      setError("Failed to access local storage.");
    }
  }, [setList, setError]);

  useEffect(() => {
    if (list.length === 0) {
      dataFetch();
    }
  }, [list, dataFetch]);

  const imageMap = {
    headphone: headPhoneImg,
    speaker,
    shoes,
    smartphone,
    jacket,
  };

  return (
    <div className={style.second}>
      {show && (
        <div className={style.products}>
          {list.map((item, index) => (
            <div key={index} className={style.products_list}>
              <p>
                <b>Name:</b> {item.name}
              </p>
              <p>
                <b>Category:</b> {item.category}
              </p>
              <p>
                <b>Brand:</b> {item.brand}
              </p>
              <p>
                <b>Price:</b> ${item.price}
              </p>
              <p>
                <b>Rating:</b> {item.rating}
              </p>
              <img
                src={imageMap[item.imageUrl] || item.imageUrl}
                alt={item.name}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
