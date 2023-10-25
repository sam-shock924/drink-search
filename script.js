let searchInputBox = document.getElementById('drink-search');
let currentSearchOption = 'drink-name';
const searchRadioButtons = document.querySelectorAll(
	'input[type=radio][name=search-options]'
);
const searchButton = document.getElementById('search-button');
const randomButton = document.getElementById('random-drink-button');
let searchValue = '';
let resultList = document.getElementById('search-results');

searchRadioButtons.forEach(function (radioButton) {
	radioButton.addEventListener('change', function () {
		if (radioButton.checked) {
			currentSearchOption = radioButton.value;
		}
	});
});

searchButton.addEventListener('click', () => {
	searchValue = searchInputBox.value;
	getDrink(searchValue);
	searchInputBox.value = '';
});

searchInputBox.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		searchButton.click();
	}
});

randomButton.addEventListener('click', () => {
	randomDrink();
	searchInputBox.value = '';
});

async function randomDrink() {
	resultList.innerText = '';
	const randomResult = await axios.get(
		'https://www.thecocktaildb.com/api/json/v1/1/random.php'
	);
	const randomDrink = randomResult.data.drinks;
	let randomItem = document.createElement('dt');
	let randomItemInstructions = document.createElement('dd');
	randomItem.innerText = randomDrink[0].strDrink;
	randomItemInstructions.innerText = randomDrink[0].strInstructions;
	resultList.appendChild(randomItem);
	resultList.appendChild(randomItemInstructions);
}

async function getDrink(searchValue) {
	resultList.innerText = '';
	if (currentSearchOption === 'drink-name') {
		const searchResult = await axios.get(
			'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchValue
		);
		const drinkResults = searchResult.data.drinks;
		drinkResults.forEach((drink) => {
			const newItem = document.createElement('dt');
			const itemInstructions = document.createElement('dd');
			newItem.innerText = drink.strDrink;
			itemInstructions.innerText = drink.strInstructions;
			resultList.appendChild(newItem);
			resultList.appendChild(itemInstructions);
		});
	} else {
		const searchResult = await axios.get(
			'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + searchValue
		);
		const ingredientResults = searchResult.data.ingredients;
		ingredientResults.forEach((ingredient) => {
			const newItem = document.createElement('dt');
			const itemDescription = document.createElement('dd');
			newItem.innerText = ingredient.strIngredient;
			itemDescription.innerText = ingredient.strDescription;
			resultList.appendChild(newItem);
			resultList.appendChild(itemDescription);
		});
	}
}
