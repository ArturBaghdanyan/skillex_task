import React, { useEffect, useState } from 'react';
import style from "./style.module.scss";

export const FetchData = ( { list, setList, setError } ) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('items'));

		if (items && items.length > 0) {
			setList(items);
			setShow(true);
			setError('');
		} else {
			const errorMessage = 'No items found!!!.'; 
			setError(errorMessage); 
		}
	}, [setList, setError]); 

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(list));
	}, [list]);
	
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
						src={item.imageUrl} 
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
