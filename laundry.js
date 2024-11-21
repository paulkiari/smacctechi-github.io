const menuIcon = document.querySelector('.menu-icon');
const popupMenu = document.querySelector('.popup-menu');

menuIcon.addEventListener('click', () => {
  popupMenu.classList.toggle('active');
});
const cartButton = document.querySelector('.cart-button');
const cart = document.querySelector('.cart');
const cartItems = document.querySelector('.cart-items');
const totalElement = document.querySelector('.total');

cartButton.addEventListener('click', () => {
    cart.classList.toggle('active');
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentNode;
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));

        // Check if the product is already in the cart
        const existingItem = cartItems.querySelector(`li[data-product="${productName}"]`);
        if (existingItem) {
            // Increase quantity
            const quantityInput = existingItem.querySelector('.quantity');
            quantityInput.value++;
            updateTotal();
            button.textContent = 'Added'; // Update button text
        } else {
            // Add new item to the cart
            const li = document.createElement('li');
            li.setAttribute('data-product', productName);
            li.innerHTML = `
                <span>${productName}</span>
                <span>$${productPrice}</span>
                <input type="number" class="quantity" value="1" min="1">
                <button class="remove">Remove</button>
            `;
            cartItems.appendChild(li);

            // Add event listener to remove button
            const removeButton = li.querySelector('.remove');
            removeButton.addEventListener('click', () => {
                li.remove();
                updateTotal();
                button.textContent = 'Add to Cart'; // Update button text
            });

            updateTotal();
            button.textContent = 'Added'; // Update button text
        }
    });
});
const buyNowButtons = document.querySelectorAll('.buy-now');
buyNowButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Implement your buy now logic here
        // This could involve redirecting to a checkout page,
        // processing the order, or any other desired action.

        // For example, you might redirect to a checkout page:
        window.location.href = 'checkout.html';
    });
});
const hideCartButton = document.querySelector('.hide-cart');

hideCartButton.addEventListener('click', () => {
    cart.classList.remove('active');
});
function updateTotal() {
    let total = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('span:nth-child(2)').textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector('.quantity').value);
        total += price * quantity;
    });
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}
