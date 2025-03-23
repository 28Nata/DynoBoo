document.addEventListener("DOMContentLoaded", function () {
    /* Sidebar Menu */
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-button");
    const closeSidebar = document.getElementById("close-sidebar");
    const loginButton = document.getElementById("login-button");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            sidebar.classList.toggle("open");
        });

        closeSidebar?.addEventListener("click", function (event) {
            event.stopPropagation();
            sidebar.classList.remove("open");
        });

        document.addEventListener("click", function (event) {
            if (!sidebar.contains(event.target) && event.target !== menuToggle) {
                sidebar.classList.remove("open");
            }
        });
    }

    /* Tombol Login */
    loginButton?.addEventListener("click", function (event) {
        event.stopPropagation();
        alert("Tombol Masuk / Daftar ditekan!");
    });

    /* Footer Link Peringatan */
    document.querySelectorAll(".footer-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Halaman ini masih dalam pengembangan!");
        });
    });

    /* Tombol Sembunyikan Gambar Dino */
    const hideButton = document.getElementById("hide-dino");
    const dinoImages = document.querySelectorAll(".dino-img");

    hideButton?.addEventListener("click", function () {
        dinoImages.forEach(dino => dino.style.display = "none");
    });

    /* Slider Produk */
    document.querySelectorAll(".product-slider").forEach(slider => {
        let slides = slider.querySelectorAll(".slide");
        let index = 0;

        function showSlide(i) {
            slides.forEach(slide => {
                slide.style.opacity = "0";
                slide.style.visibility = "hidden";
            });
            slides[i].style.opacity = "1";
            slides[i].style.visibility = "visible";
        }

        function nextSlide() {
            index = (index + 1) % slides.length;
            showSlide(index);
        }

        showSlide(index);
        setInterval(nextSlide, 3000);
    });

    /* Video Play/Pause saat Diklik */
    document.querySelectorAll(".video-container video").forEach(video => {
        video.addEventListener("click", function () {
            this.paused ? this.play() : this.pause();
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cart-icon");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCart = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const cartTotalDisplay = document.getElementById("cart-total");
    const cartButtons = document.querySelectorAll(".cart-btn");
    const cartCountDisplay = document.getElementById("cart-count"); // Menampilkan jumlah item di ikon keranjang

    let cart = [];

    // 🔹 Menampilkan sidebar saat ikon keranjang diklik
    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            cartSidebar.style.right = "0";
        });
    }

    // 🔹 Menutup sidebar
    if (closeCart) {
        closeCart.addEventListener("click", () => {
            cartSidebar.style.right = "-100%";
        });
    }

    // 🔹 Event listener untuk tombol "Tambah ke Keranjang"
    cartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product");
            if (!productElement) return;

            const productName = productElement.querySelector("h3").textContent;
            const productPrice = parseInt(productElement.querySelector(".price").textContent.replace("Rp ", "").replace(".", ""));
            const productImage = productElement.querySelector("img").src;

            addToCart(productName, productPrice, productImage);
        });
    });

    function addToCart(name, price, image) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;
        let totalItems = 0;

        cart.forEach((item, index) => {
            totalPrice += item.price * item.quantity;
            totalItems += item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-img">
                <div class="cart-details">
                    <h4>${item.name}</h4>
                    <p>Rp ${formatRupiah(item.price * item.quantity)}</p>
                    <div class="cart-controls">
                        <button class="decrease-btn" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-btn" data-index="${index}">+</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // ✅ Update total harga
        if (cartTotalDisplay) {
            cartTotalDisplay.textContent = `Total: Rp ${formatRupiah(totalPrice)}`;
        }

        // ✅ Update jumlah item di ikon keranjang
        if (cartCountDisplay) {
            cartCountDisplay.textContent = totalItems;
        }
    }

    // 🔹 Event Delegation untuk tombol tambah/kurang item
    cartItemsContainer.addEventListener("click", (event) => {
        const button = event.target;
        const index = button.dataset.index;
        if (index === undefined) return;

        if (button.classList.contains("increase-btn")) {
            cart[index].quantity += 1;
        }

        if (button.classList.contains("decrease-btn")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
        }

        updateCartDisplay();
    });

    function formatRupiah(angka) {
        return angka.toLocaleString("id-ID");
    }

    // 🔹 Logika checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length > 0) {
                alert("Checkout berhasil!");
                cart = [];
                updateCartDisplay();
            } else {
                alert("Keranjang kosong!");
            }
        });
    }
});
