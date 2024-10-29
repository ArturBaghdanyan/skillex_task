import React, { useState, useEffect } from 'react';
import products from '../../data/products.json';
import { FetchData } from '../getList/fetchData';
import style from "../style.module.scss";
import menuIcon from "../../assets/menuIcon.svg";
import close from "../../assets/close.png";
import SectionList from './section';


const ProductsList = () => {
const [list, setList] = useState([]);
const [mobileMenu, setMobileMenu] = useState(false);
const [error, setError] = useState('');
const [sortCriteria, setSortCriteria] = useState('');
const [filters, setFilters] = useState({
	category: "",
	brand: "",
	priceRange: [0, 500],
	rating: 0
});


useEffect(() => {
const applyFilters = () => {
	const results = products.filter(product => {
		const matchesCategory = filters.category ? product.category === filters.category : true;
		const matchesBrand = filters.brand ? product.brand === filters.brand : true;
		const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
		const matchesRating = filters.rating ? product.rating >= filters.rating : true;
		const matchesSearch = filters.search ? product.name.toLowerCase().includes(filters.search.toLowerCase()) : true;
		return matchesCategory && matchesBrand && matchesPrice  && matchesRating && matchesSearch;
	});
	if (sortCriteria) {
		results.sort((a, b) => {
			if (sortCriteria === 'price') {
				return a.price - b.price; 
			} else if (sortCriteria === 'rating') {
				return b.rating - a.rating; 
			} else if (sortCriteria === 'popularity') {
				return b.popularity - a.popularity; 
			}
			return 0;
		});
	}

	setList(results);
};

applyFilters();
}, [filters, sortCriteria]);

return (
<div className={style.container}>
	
	<button onClick={() => setMobileMenu(!mobileMenu)} className={style.container_mobile_icon}>
		<img src={menuIcon} alt='mobileIcon' />
	</button>

	{mobileMenu && (
		<div className={style.mobile_menu}>
			<button onClick={() => setMobileMenu(false)} className={style.closeButton}>
				<img src={close} alt='closeButton' />
			</button>

			<SectionList 
				filters={filters} 
				setFilters={setFilters} 
				sortCriteria={sortCriteria} 
				setSortCriteria={setSortCriteria} 
				isMobile 
			/>
		</div>
	)}
	{error && !list.length && <div className={style.error}>{error}</div>}

	<SectionList 
		filters={filters} 
		setFilters={setFilters} 
		sortCriteria={sortCriteria} 
		setSortCriteria={setSortCriteria}
	/>
	<FetchData list={list} setList={setList} setError={setError} />
</div>
);
};

export default ProductsList;