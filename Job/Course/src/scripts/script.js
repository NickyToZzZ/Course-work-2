import {createPageElement} from "./module.js"

const root = document.querySelector("#root");

//Создаём элементы страницы WB
function createWBElements(){
    const mainContainer = createPageElement("div", "wb-container", root, "", "", ""); //главный контейнер
    const headerWB = createPageElement("div", "wb-header", mainContainer, "", "", ""); //хеадер
    const logoWB = createPageElement("img", "wb-header__wblogo", headerWB, "", "", ""); //логотип
    const searchWB = createPageElement("input", "wb-header__search", headerWB, "", "","Поиск..."); //поле поиска
        // настраиваем поиск по странице
        searchWB.addEventListener("input", () => {
            let searchValue = searchWB.value.toLowerCase().trim();
            let cardsList = document.querySelectorAll(".card-container");
            Array.from(cardsList).forEach((elem) => {
                if (!elem.lastChild.lastChild.textContent.toLocaleLowerCase().includes(searchValue)) {
                    elem.style.display = "none";
                } else {
                    elem.style.display = "flex";
                }
            })
        })
    const cartWB = createPageElement("img", "wb-header__cart", headerWB, "", "", ""); //корзина
        // настраиваем открытие корзины
        cartWB.addEventListener("click", () => {   
            return modalCart.style.display = "block"
        })
    const modalCart = createPageElement("div", "wb-header-modal", mainContainer, "", "", ""); // модальное окно
    const modalHeader = createPageElement("header", "wb-header-modal-header", modalCart, "", "", ""); // header модального окна
    const modalContent = createPageElement("div", "wb-header-modal-content", modalCart, "", "", ""); // содержимое модального окна
    const modalClearBtn = createPageElement("p", "wb-header-modal__clear-btn", modalHeader, "", "Очистить корзину", ""); // кнопка очистить корзину
    const modalCloseBtn = createPageElement("p", "wb-header-modal__close-btn", modalHeader, "", "Закрыть корзину", ""); // кнопка закрытия модального окна
        //настриваем закрытие модального окна
        modalCloseBtn.addEventListener("click", () => {
            if (modalCart.style.display = "block") {
                return modalCart.style.display = "none"
            }
        })
    const sliderWB = createPageElement("div", "wb-container__slider", mainContainer, "", "", ""); //временный слайдер
    const hitsWB = createPageElement("h1", "wb-container__hits", mainContainer, "", "Хиты продаж:", ""); //Заголовок "Хиты продаж"
    const cardsWB = createPageElement("div", "wb-container__cards", mainContainer, "", "", ""); //Область с карточками товара"

    // Добавляем аттрибуты элементам
    logoWB.setAttribute("src", "https://static.tildacdn.com/tild3134-3336-4530-b166-653865636661/i_1.png");
    cartWB.setAttribute("src", "https://avatanplus.com/files/resources/original/5ed9e94e590e117283375a1d.png");
};

// функция получения mockap
createWBElements(); 
async function getData() {
    let response = await fetch('https://65cb5414efec34d9ed87430b.mockapi.io/wb1/WB/');
    let banners = await response.json();
    return banners;
};
getData().then(item => {
    item.forEach(element => {
        createWBCard(element);
    });
})

function createWBCard(obj){
    let discount = Math.floor(5 + Math.random() * 40); // Рандомный размер скидки
    let oldPrice = Math.round(obj.price); //Вычленяем старую (зачёркнутую цену) из объекта
    let newPrice = Math.round(oldPrice - oldPrice * (discount / 100)); // Вычисляем новую цену
    const cardsWBZone = document.querySelector(".wb-container__cards");
    const cardContainer = createPageElement("div", "card-container", cardsWBZone, "", "", ""); //Контейнер для карточки товара
    const cardPictureZone = createPageElement("div", "card-box", cardContainer, "", "", ""); //Область с картинкой, скидкой и кнопкой "Добавить в корзину"
    const cardPicture = createPageElement("div", "card-box__image", cardPictureZone, "", "", ""); //Картинка товара
        // увеличение картинки
        cardPicture.addEventListener("click", () => {
            
        })
    const cardDiscount = createPageElement("h5", "card-box__discount", cardPictureZone, "","- " + discount + "%", ""); //Размер скидки в процентах
    const cardBuyBtn = createPageElement("img", "card-box__buybtn", cardPictureZone, "", "", ""); //Кнопка "Добавить в корзину"
        // добавление в корзину
        cardBuyBtn.addEventListener("click", () => {
            addToLS(obj.id, obj.title, Math.round(obj.price));
        })
    const cardInfoZone =createPageElement("div", "card-infozone", cardContainer, "", "", ""); //Область с ценой, старой ценой и наименованием товара
    const cardPrice = createPageElement("h4", "card-infozone__price", cardInfoZone, "",  newPrice + "$", ""); //Цена товара
    const cardPriceCancel = createPageElement("h4", "card-infozone__priceCancel", cardInfoZone, "",  oldPrice + "$", ""); //Бывшая цена товара
    const cardDiscription = createPageElement("h4", "card-infozone__discription", cardInfoZone, "", obj.title, ""); //Название товара

        // добавляем в LS
    function addToLS(itemId, itemTitle, itemPrice) {
        const item = {
            id: itemId,
            title: itemTitle,
            price: itemPrice,
        }

    localStorage.setItem("Products", JSON.stringify([...JSON.parse(localStorage.getItem("Products") || '[]'), item]));
    }


    // Добавляем аттрибуты элементам
    cardPicture.style.backgroundImage = `url('${obj.picture}?=random${obj.id}')`;
    cardBuyBtn.setAttribute("src", "https://www.expresselectrical.co.uk/imagecache/33034493-5989-403c-99d4-a9570075c59a/Order-Information_592x591.png");
}
  