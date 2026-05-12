//Получение всех нужных элементов со страницы
document.addEventListener("DOMContentLoaded", () => {
const addButtons = document.querySelectorAll(".add-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const clearCartBtn = document.getElementById("clear-cart");
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
//Эта штука делает корзину общей для всех страниц
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Открытие корзины
if (cartIcon) {
cartIcon.addEventListener("click", () => {
cartModal.style.display = "flex";
updateCartDisplay();
});
}
// Закрытие корзины
if (closeCartBtn) {
closeCartBtn.addEventListener("click", () => {
cartModal.style.display = "none";
});
}
document.addEventListener("keydown", (event) => {
if (event.key === "Escape") {
cartModal.style.display = "none";
}
});
// Очистка корзины
if (clearCartBtn) {
clearCartBtn.addEventListener("click", () => {//при клике на кнопку массив cart становится пустым
cart = [];
saveCart();
updateCartDisplay();
});
}
// Добавление товара в корзину
addButtons.forEach(button => {
button.addEventListener("click", () => {//обработчик клика 
const name = button.getAttribute("data-name");//название товара
const price = parseInt(button.getAttribute("data-price"));//цена товара
const existingItem = cart.find(item => item.name === name);//проверяем, естли такой товар в корзине
if (existingItem) {
existingItem.quantity++;//если есть просто прибавляем уже к существууещему обЪекту
} else {
cart.push({ name, price, quantity: 1 });//если нет добавляем новый объект в массив cart
}
saveCart();
updateCartDisplay();

});
});
// Сохранение корзины в localStorage
function saveCart() {
localStorage.setItem("cart", JSON.stringify(cart));//сохранение массива cart
}
// Обновление отображения корзины
function updateCartDisplay() {
if (!cartItemsContainer || !cartTotal || !cartCount) return;
cartItemsContainer.innerHTML = "";
let total = 0;//обнуление общих сумм
let count = 0;//обнуление общих сумм
cart.forEach(item => {
const itemTotal = item.price * item.quantity;//считаем стоимость цена*количество
total += itemTotal;//добавляем в общей сумме
count += item.quantity;//добавление к количеству товара 
//Создание hnml элемента для каждого товара и вставляем в корзину.
const div = document.createElement("div");
div.classList.add("cart-item");
div.innerHTML = `
<span>${item.name} × ${item.quantity}</span>
<span>${itemTotal.toLocaleString()} ₽</span>
`;
cartItemsContainer.appendChild(div);
});
cartTotal.textContent = total.toLocaleString();
if (cartCount) cartCount.textContent = count;
}
// При загрзке страницы сразу обновляем счетчик корзины
updateCartDisplay();
menuIcon.addEventListener('click', () => {
sideMenu.classList.add('active');
});
closeMenu.addEventListener('click', () => {
sideMenu.classList.remove('active');});
// Закрытие меню при клике вне
document.addEventListener('click', (e) => {
if (!sideMenu.contains(e.target) && !menuIcon.contains(e.target)) {
sideMenu.classList.remove('active');
}
});

    
    /*Карусель */
    
    const carouselInner = document.querySelector('.carousel-inner');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('indicators');

    // Проверяем, существует ли элемент карусели на странице, прежде чем запускать логику
    if (carouselInner) {
        const carouselItems = document.querySelectorAll('.carousel-item');
        const totalItems = carouselItems.length;
        let currentIndex = 0;
        // Получаем индикаторы
        const indicators = indicatorsContainer ? indicatorsContainer.children : [];
        function updateCarousel() {
            // Вычисляем смещение. Предполагаем, что каждый слайд занимает 25% ширины
            const offset = -currentIndex * 25;
            carouselInner.style.transform = `translateX(${offset}%)`;
            // Обновление индикаторов
            if (indicators.length > 0) {
                for (let i = 0; i < indicators.length; i++) {
                    indicators[i].classList.remove('active');
                }
                if (indicators[currentIndex]) {
                    indicators[currentIndex].classList.add('active');
                }
            }
        }
        // Обработчик кнопки "Назад"
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
                updateCarousel();
            });
        }
        // Обработчик кнопки "Вперед"
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
                updateCarousel();
            });
        }
        // Обработчик индикаторов
        if (indicators.length > 0) {
            for (let i = 0; i < indicators.length; i++) {
                indicators[i].addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                });
            }
        }
        // Автоматическое переключение каждые 5 секунд
        setInterval(() => {
            currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }, 5000); 
        // Инициализация
        updateCarousel();
    }
});