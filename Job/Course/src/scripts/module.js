//Функция создания элементов страницы:

function createPageElement(tag, className, placeOnPage, idName, text, placeholder) {
    const element = document.createElement(tag);
    element.classList.add(className);
    placeOnPage.append(element);
    element.setAttribute("id", idName);
    element.innerHTML = text;
    element.placeholder = placeholder;
    return element;
}
export {createPageElement}

// добавляем в LS
export function addToLS(itemId, itemTitle, itemPrice) {
    const item = {
        id: itemId,
        title: itemTitle,
        price: itemPrice,
    }   
    localStorage.setItem("Products", JSON.stringify([...JSON.parse(localStorage.getItem("Products") || '[]'), item]));
}

// извлекаем из LS
export function getFromLS (holder) {
    let items = localStorage.getItem("Products") ? Array.from(JSON.parse(localStorage.getItem("Products"))) : [];
    let totalPrice = 0;
    if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            holder.innerHTML += "Товар: " + items[i].title + ", " + " Цена: " + items[i].price;
            totalPrice += +items[i].price;
        }
        document.querySelector(".wb-header-modal-footer__text").innerHTML = totalPrice;
    } 
}