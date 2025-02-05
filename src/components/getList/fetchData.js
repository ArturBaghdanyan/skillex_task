import React, { useEffect, useState, useCallback } from 'react';
import style from "./style.module.scss";
import headPhoneImg from "../../assets/headphone.png";
import speaker from "../../assets/speaker.png";
import shoes from "../../assets/shoes.png";
import smartphone from "../../assets/smartphone.png";
import jacket from "../../assets/jacket.png";


export const FetchData = ({ list, setList, setError }) => {
	const [show, setShow] = useState(false);
  
	const dataFetch = useCallback(async () => {
	  try {
		const response = await fetch('/products.json');
		if (!response.ok) {
		  throw new Error('Failed to fetch products. Please try again later.');
		}
		const data = await response.json();
  
		const validProducts = data.products.filter(product => product.rating > 0);
  
		setList(validProducts);
		localStorage.setItem('items', JSON.stringify(validProducts)); 
		setShow(true);
		setError('');
	  } catch (error) {
		setError(error.message);
	  }
	}, [setList, setError]);
  
	useEffect(() => {
  
	  try {
		const items = JSON.parse(localStorage.getItem('items'));
  
		if (items && items.length > 0) {
		  setList(items.filter((item) => item.rating > 0));
		  setShow(true);
		  setError('');
		} else {
		  setError('No items found in local storage!');
		}
	  } catch {
		setError('Failed to access local storage.');
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
					<p><strong>Name:</strong> {item.name}</p>
					<p><strong>Category:</strong> {item.category}</p>
					<p><strong>Brand:</strong> {item.brand}</p>
					<p><strong>Price:</strong> ${item.price}</p>
					<p><strong>Rating:</strong> {item.rating}</p>
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
)
}
