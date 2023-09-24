document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.querySelector(".cart-icon");
    const cartItemCount = document.querySelector(".cart-item-count");
    const cartContent = document.querySelector(".cart-content");
    const cartTotal = document.getElementById("cart-total");

    let cartItems = [];
    let total = 0;

    //  لحساب المجموع الإجمالي
    function calculateTotal() {
        let newTotal = 0;
        for (const item of cartItems) {
            newTotal += item.price;
        }
        return newTotal;
    }

    //  لتحديث واجهة سلة المشتريات
    function updateCart() {
        cartItemCount.textContent = cartItems.length;
        cartContent.innerHTML = "";

        for (const item of cartItems) {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price.toFixed(2)}</span>
                <button class="remove-item">Remove</button>
            `;

            cartContent.appendChild(cartItem);
        }

        total = calculateTotal(); // تحديث القيمة الإجمالية
        cartTotal.textContent = total.toFixed(2);
    }

    //  لإضافة عنصر إلى سلة المشتريات
    function addItemToCart(name, price) {
        cartItems.push({ name, price });
        total += price;
        updateCart();
    }

    //  لإزالة عنصر من سلة المشتريات
    function removeItemFromCart(index) {
        total -= cartItems[index].price;
        cartItems.splice(index, 1);
        updateCart();
    }

    // التعامل مع حدث النقر على زر "Order"
    document.querySelectorAll(".order-button").forEach((button, index) => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-name");
            const productPrice = parseFloat(button.getAttribute("data-price"));
            addItemToCart(productName, productPrice);
        });
    });

    // التعامل مع حدث النقر على زر "Remove" داخل سلة المشتريات
    cartContent.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = Array.from(cartContent.children).indexOf(event.target.parentElement);
            if (index !== -1) {
                removeItemFromCart(index);
            }
        }
    });

    // تحديث سلة المشتريات الأولي
    updateCart();

    cartIcon.addEventListener("click", function() {
        cartContent.classList.toggle("show-cart");
    });
});
