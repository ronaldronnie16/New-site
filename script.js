// MANUAL PRODUCT DATA (30 Items)
const furnitureItems = [
    { 
        id: 1,
        name: 
        "L-Shaped Royal Sofa",
        old: 1100000,
        new: 900000,
        img: "images//5-seater.jpg"
    },
    
    { 
        id: 2, 
        name: "Mahogany Dining Table",
        old: 600000,
        new: 500000,
        img: "images//dinning table.jpg"
    },
    
    { 
        id: 3,
        name: "King Size Velvet Bed",
        old: 1200000,
        new: 1100000,
        img: "images//bed.jpg"
    },
    
    { 
        id: 4,
        name: "Leafy Centre Table",
        old: 200000,
        new: 170000, 
        img: "images//leafy-centretable.jpg"
    },
   
    { 
        id: 5,
        name: "Office Executive Chair",
        old: 100000,
        new: 90000,
        img: "images//executive.jpg"
    },
    
    { 
        id: 6,
        name: "Centre Table + TV Stand", 
        old: 250000,
        new: 180000,
        img: "images//centretable.jpg"
    },
   
    {
        id: 7, 
        name: "Staff Chair",
        old: 80000,
        new: 70000,
        img: "images//chair.jpg" 
    },
    
    { 
        id: 8,
        name: "3-Door Wardrobe", 
        old: 800000,
        new: 700000,
        img: "images//wardrobe.jpg"
    },
    
    { 
        id: 9, 
        name: "TV Stand",
        old: 180000,
        new: 150000, 
        img: "images//tv-stand.jpg"
    },
    
    {
        id: 10,
        name: "Classic Armchair",
        old: 100000,
        new: 80000, 
        img: "images//classic-chair.jpg"
    },
    
    {
    id: 11, 
    name: "Wooden frame + Door",
    old: 600000,
    new: 550000, 
    img: "images//door-frame.jpg" 
    },
    { 
        id: 12, name: 'Sofa Chair',
        old: 120000, 
        new: 100000, 
        img: "images//soft-chair.jpg"
    },
    
    {
        id: 13,
        name: "Centre Table",
        old: 300000,
        new: 250000,
        img: "images//Centre table.jpg"
    },
    
    { 
        id: 14,
        name: "Wooden Door Frame",
        old: 200000,
        new: 180000,
        img: "images//wooden door frame.jpg"
    },
    
    { 
        id: 15,
        name: "Office Chair + Table",
        old: 700000,
        new: 600000,
        img: "images//office chair.jpg"
    }
    
];

    
let cart = [];
let showingAll = false;

function displayProducts(filter = "") {
    const grid = document.getElementById('product-display');
    const limit = showingAll ? 15 : 10;
    
    const filteredItems = furnitureItems.filter(item => 
        item.name.toLowerCase().includes(filter.toLowerCase())
    ).slice(0, limit);

    grid.innerHTML = filteredItems.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <div class="card-body">
                <h3>${p.name}</h3>
                <div class="price-row">
                    <span class="old-p">UGX ${p.old.toLocaleString()}</span>
                    <span class="new-p">UGX ${p.new.toLocaleString()}</span>
                </div>
                <button class="add-btn" onclick="addToCart(${p.id})">ADD TO CART</button>
            </div>
        </div>
    `).join('');

    document.getElementById('view-more-container').style.display = (showingAll || filter !== "") ? "none" : "block";
}

function searchFurniture() {
    const query = document.getElementById('furnitureSearch').value;
    displayProducts(query);
}

function revealAllProducts() {
    showingAll = true;
    displayProducts();
}

function addToCart(id) {
    const item = furnitureItems.find(p => p.id === id);
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
    toggleCart(true);
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').innerText = count;
    
    const body = document.getElementById('cart-items');
    let subtotal = 0;
    
    body.innerHTML = cart.map((item, index) => {
        subtotal += (item.new * item.qty);
        return `
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #222; padding-bottom:10px;">
                <div>
                    <strong>${item.name}</strong><br>
                    Qty: ${item.qty}
                </div>
                <div style="text-align:right">
                    UGX ${(item.new * item.qty).toLocaleString()}<br>
                    <small style="color:red; cursor:pointer" onclick="removeFromCart(${index})">Remove</small>
                </div>
            </div>
        `;
    }).join('');
    
    calculateTotal(subtotal);
}

function calculateTotal(sub = null) {
    if (sub === null) {
        sub = cart.reduce((sum, item) => sum + (item.new * item.qty), 0);
    }
    const delivery = parseInt(document.querySelector('input[name="delivery"]:checked').value);
    document.getElementById('grand-total').innerText = `UGX ${(sub + delivery).toLocaleString()}`;
}

function toggleCart(forceOpen = false) {
    const sidebar = document.getElementById('cart-sidebar');
    if (forceOpen) sidebar.classList.add('active');
    else sidebar.classList.toggle('active');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function sendToWhatsApp() {
    if (cart.length === 0) return alert("Cart is empty!");
    let msg = "Hello Biyinzika, I'd like to order:\n\n";
    cart.forEach(i => msg += `• ${i.name} (Qty: ${i.qty})\n`);
    msg += `\nDelivery: ${document.querySelector('input[name="delivery"]:checked').parentElement.innerText}`;
    msg += `\nTotal: ${document.getElementById('grand-total').innerText}`;
    window.open(`https://wa.me/256787141752?text=${encodeURIComponent(msg)}`);
}

window.onload = () => displayProducts();
