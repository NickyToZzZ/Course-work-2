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