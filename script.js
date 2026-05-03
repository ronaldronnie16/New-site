const furnitureItems = [
    { 
        id: 1,
        name: 
        "TV Stand",
        old: 470000,
        new: 450000,
        img: "images//tv-stand.jpg"
    },
    
    { 
        id: 2, 
        name: "Round Dinning Table",
        old: 600000,
        new: 500000,
        img: "images//Round Dinning Table.jpg"
    },
    
    { 
        id: 3,
        name: "6 Seater MI Sofaset",
        old: 1450000,
        new: 1400000,
        img: "images//6 seater MI sofaset.jpg"
    },
    
    { 
        id: 4,
        name: "6 Seater Dinning Table",
        old: 1450000,
        new: 1400000, 
        img: "images//6 seater dining table.jpg"
    },
   
    { 
        id: 5,
        name: "Majesty Dad Chair (Introduction)",
        old: 650000,
        new: 600000,
        img: "images//Majesty Dad Chair (Introduction).jpg"
    },
    
    { 
        id: 6,
        name: "Marble Centre Table", 
        old: 650000,
        new: 600000,
        img: "images//Marble centre table.jpg"
    },
   
    {
        id: 7, 
        name: "Modern Living Cupboard",
        old: 550000,
        new: 500000,
        img: "images//Modern Living Cupboard.jpg" 
    },
    
    { 
        id: 8,
        name: "Family Round Table Dinning(6 Seater)", 
        old: 1550000,
        new: 1500000,
        img: "images//Family Circle Dining Table (6-Seater).jpg"
    },
    
    { 
        id: 9, 
        name: "Executive Dinning Table",
        old: 2850000,
        new: 2800000, 
        img: "images//Executive-dinning.jpg"
    },
    
    {
        id: 10,
        name: "6 Seater MI Sofa Set",
        old: 1450000,
        new: 1400000, 
        img: "images//6 seater MI sofaset.jpg"
    },
    
    {
    id: 11, 
    name: "Wooden Doors (1)",
    old: 200000,
    new: 180000, 
    img: "images//Wooden doors.jpg" 
    },
    { 
        id: 12, name: '4 Seater Wooden Dinning Table',
        old: 600000, 
        new: 550000, 
        img: "images//4 seater wooden dinning table.jpg"
    },
    
    {
        id: 13,
        name: "6 Seater Wooden Dinning Table",
        old: 1300000,
        new: 1250000,
        img: "images//.6 seater wooden dinning table.jpg"
    },
    
    /*{ 
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
    }*/
    
];

    
let cart = [];
let showingAll = false;

function displayProducts(filter = "") {
    const grid = document.getElementById('product-display');
    const limit = showingAll ? 13 : 7;
    
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
