import {createPageElement} from "./module.js";
import {addToLS} from "./module.js";
import {getFromLS} from "./module.js";

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
            return modalCart.style.display = "flex"
        })
        const modalCart = createPageElement("div", "wb-header-modal", mainContainer, "", "", ""); // модальное окно
        const modalHeader = createPageElement("header", "wb-header-modal-header", modalCart, "", "", ""); // header модального окна
        const modalContent = createPageElement("div", "wb-header-modal-content", modalCart, "", "", ""); // содержимое модального окна
        const modalClearBtn = createPageElement("button", "wb-header-modal__clear-btn", modalHeader, "", "Очистить корзину", ""); // кнопка очистить корзину
            modalClearBtn.addEventListener("click", () => {
                localStorage.clear();
                modalContent.innerHTML = "";
                modalSumCalc.innerHTML = "";
            })
        const modalCloseBtn = createPageElement("button", "wb-header-modal__close-btn", modalHeader, "", "X", ""); // кнопка закрытия модального окна
        const modalSumZone = createPageElement("div", "wb-header-modal-footer", modalCart,"", "", ""); // Футтер с суммой всех товаров
        const modalSumText = createPageElement("h3", "wb-header-modal-footer__text", modalSumZone,"", "Сумма всех товаров:", ""); //Просто заголовок "Сумма"
        const modalSumCalc = createPageElement("h3", "wb-header-modal-footer__sum", modalSumZone,"", "", ""); 
      
    //настриваем закрытие модального окна
        modalCloseBtn.addEventListener("click", () => {
            if (modalCart.style.display = "block") {
                return modalCart.style.display = "none"
            }
        })
        const sliderWB = createPageElement("div", "wb-container__slider", mainContainer, "", "", "");
            sliderWB.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="carousel__img" src="https://loremflickr.com/640/480/food?random=1" alt="logo">
                </div>
                <div class="carousel-item">
                    <img class="carousel__img" src="https://loremflickr.com/640/480/food?random=2" alt="logo">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Предыдущий</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Следующий</span>
            </button>
          </div>
        </div>`
    const hitsWB = createPageElement("h1", "wb-container__hits", mainContainer, "", "Хиты продаж:", ""); //Заголовок "Хиты продаж"
    const cardsWB = createPageElement("div", "wb-container__cards", mainContainer, "", "", ""); //Область с карточками товара"

    // Добавляем аттрибуты элементам
    logoWB.setAttribute("src", "https://static.tildacdn.com/tild3134-3336-4530-b166-653865636661/i_1.png");
    cartWB.setAttribute("src", "https://avatanplus.com/files/resources/original/5ed9e94e590e117283375a1d.png");
};
createWBElements();

// функция получения mockap 
async function getData() {
    let response = await fetch('https://65cb5414efec34d9ed87430b.mockapi.io/wb1/WB/');
    let productCards = await response.json();
    return productCards;
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
        //Показываем кнопку "Быстрый просмотр" при наведении на карточку товара
        cardPictureZone.addEventListener('mouseover', function(){
        cardPictureQuickBtn.style.display = "block";
        })
        cardPictureZone.addEventListener('mouseout', function(){
        cardPictureQuickBtn.style.display = "none";
        })
    const cardPicture = createPageElement("div", "card-box__image", cardPictureZone, "", "", ""); //Картинка товара
    const cardPictureQuickBtn = createPageElement("button", "card-box__quickview", cardPictureZone, "", "Быстрый просмотр", ""); //кнопка "Быстрый просмотр"
    const cardDiscount = createPageElement("h5", "card-box__discount", cardPictureZone, "","- " + discount + "%", ""); //Размер скидки в процентах
    const cardBuyBtn = createPageElement("img", "card-box__buybtn", cardPictureZone, "", "", ""); //Кнопка "Добавить в корзину"
        // добавляем карту в LS
        cardBuyBtn.addEventListener("click", () => {
            addToLS(obj.id, obj.title, newPrice);
            getFromLS(document.querySelector(".wb-header-modal-content"));
        })
    const cardInfoZone =createPageElement("div", "card-infozone", cardContainer, "", "", ""); //Область с ценой, старой ценой и наименованием товара
    const cardPrice = createPageElement("h4", "card-infozone__price", cardInfoZone, "",  newPrice + "$", ""); //Цена товара
    const cardPriceCancel = createPageElement("h4", "card-infozone__priceCancel", cardInfoZone, "",  oldPrice + "$", ""); //Бывшая цена товара
    const cardDiscription = createPageElement("h4", "card-infozone__discription", cardInfoZone, "", obj.title, ""); //Название товара

    // Добавляем аттрибуты элементам
    cardPicture.style.backgroundImage = `url('${obj.picture}?=random${obj.id}')`;
    cardBuyBtn.setAttribute("src", "https://www.expresselectrical.co.uk/imagecache/33034493-5989-403c-99d4-a9570075c59a/Order-Information_592x591.png");
    modalPictureZone.style.backgroundImage = cardPicture.style.backgroundImage; //вставляем увеличенную картинку. ПРОБЛЕМА! вставляется рандомная картинка!

    //Открытие окна "Быстрого просмотра"
    cardPictureQuickBtn.addEventListener("click", () => {
        modalPictureWindow.style.display = "block";
    })

    //Закрытие модального окна "Быстрого просмотра"
    modalPictureClose.addEventListener("click", () => {
    if (modalPictureWindow.style.display = "block") {
        return modalPictureWindow.style.display = "none"
    }
    })
}

// Создаём модальное окно "Быстрого просмотра"
const selectMain = document.querySelector(".wb-container");
const modalPictureWindow = createPageElement("div", "modalPicture-window", selectMain, "", "", ""); //главное окно "Быстрого просмотра"
const modalPictureClose = createPageElement("button", "modalPicture-windows__closebtn", modalPictureWindow, "", "Закрыть", ""); //кнопка "Закрыть" окна "Быстрого просмотра"
const modalPictureZone = createPageElement("div", "modalPictureZone", modalPictureWindow, "", "", ""); //Область с увеличенной картинкой
