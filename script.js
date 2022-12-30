const togglebtn = document.querySelector(".toggle-btn");

const logo = document.querySelector(".logo");

const sections = document.querySelectorAll(".section");
const anchorlink = document.querySelectorAll(".a-link");

const mentbtn = document.querySelector(".menu-btn");

const closebtn = document.querySelector(".close-btn");

const ul = document.querySelector(".ul");

const count = document.querySelector(".count");

const notification = document.querySelector(".notification");

const headerdivs = document.querySelectorAll(".header-div");

const forms = document.querySelectorAll(".form");

const forgottentag = document.querySelector(".forgotten-tag");

const emailnotif = document.querySelector(".forgot-password-notif");

const closenotif = document.querySelector(".close-notif");

const productsbtn = document.querySelector(".products-btn");

const discoverbtns = document.querySelectorAll(".discover-btn");

// themeButton.classList.contains(iconTheme)
function switchtheme() {
  const moonicon = "fa-moon";
  if (togglebtn.classList.contains(moonicon)) {
    document.documentElement.setAttribute("data-theme", "dark");
    togglebtn.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
    // mode.textContent = "light mode";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    togglebtn.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
    // mode.textContent = "dark mode";
  }
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    togglebtn.classList.replace("fa-moon", "fa-sun");
    // mode.textContent = "light mode";
  }
}

// event listeners
togglebtn.addEventListener("click", switchtheme);

// swiper for testimonial section

var swiper = new Swiper(".swiper", {
  // effect: "coverflow",
  grabCursor: true,
  loop: true,
  spaceBetween: 32,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// snavbar scroll function

function scrollHeader() {
  const nav = document.querySelector(".nav");
  // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", scrollHeader);

// showing clicked pages

anchorlink.forEach((link, index) => {
  link.addEventListener("click", () => {
    removeactivepage();
    removehighlight();
    sections[index].classList.add("active-page");
    anchorlink[index].classList.add("highlight");
  });
});

function removeactivepage() {
  sections.forEach((section) => {
    section.classList.remove("active-page");
  });
}

function removehighlight() {
  anchorlink.forEach((link) => {
    link.classList.remove("highlight");
  });
}

// funtions

function movetohomepage() {
  removeactivepage();
  sections[0].classList.add("active-page");
  removehighlight();
  anchorlink[0].classList.add("highlight");
}

function showsidenavbar() {
  ul.classList.add("show");
}

function closesidenavbar() {
  ul.classList.remove("show");
}

// event listeners

logo.addEventListener("click", movetohomepage);

mentbtn.addEventListener("click", showsidenavbar);

closebtn.addEventListener("click", closesidenavbar);

// shopping cart code

const shoppingbtn = document.querySelector(".shopping-btn");
const btn = document.querySelector(".btn");

const home = document.querySelector(".home");

const cart = document.querySelector(".cart");

const products = document.querySelector(".products");

const cartproducts = document.querySelector(".cart-products");

let total = document.querySelector(".total");

const cartbox = document.querySelector(".cart-box");

total.innerHTML = 0;

console.log(typeof total.innerHTML);

let quantity = 0;

let localproducts = [];

const addcardbtn = document.querySelectorAll(".add-card-btn");

// functions

function additemstocard(e) {
  const buttonclicked = e.target;

  console.log(buttonclicked);

  const productname =
    buttonclicked.parentElement.parentElement.children[1].innerHTML;
  const productprice =
    buttonclicked.parentElement.parentElement.children[2].children[0].innerHTML;

  const productimg = buttonclicked.parentElement.parentElement.children[0].src;

  console.log(productprice);

  createcart(productimg, productname, productprice);
  console.log(productprice);
}

function createcart(productimg, productname, productprice) {
  const productName = document.querySelectorAll(".product-name");
  // console.log(productName);
  let alreadyincluded = false;

  productName.forEach((item) => {
    // console.log(productname);
    // console.log(item.innerHTML);

    // console.log(item.innerHTML);
    if (item.innerHTML == productname) {
      alreadyincluded = true;
      // alert("this product is already included in the cart");
    }
  });

  if (!alreadyincluded) {
    createcartconfirm(productimg, productname, productprice);

    notification.classList.add("show-notif");
    notification.innerHTML = `
       <h2> ${productname} is added to cart </h2> 
      `;
    setTimeout(() => {
      notification.classList.remove("show-notif");
    }, 2000);
  }

  if (alreadyincluded) {
    notification.classList.add("show-notif");
    notification.innerHTML = `
         <h2> ${productname} is already included in cart </h2> 
        `;
    setTimeout(() => {
      notification.classList.remove("show-notif");
    }, 2000);
  }
}

// create confirmed

function createcartconfirm(productimg, productname, productprice) {
  const cartproduct = document.createElement("div");
  cartproduct.classList.add("cart-product");

  cartproduct.innerHTML = `
              <div class="first">
                <img src=${productimg} alt="" />
                <p class="product-name">${productname}</p>
              </div>
              <p>$ <span class ="price">${productprice}</p>
              <div class="quantity-div">
                  <div class="inner-div">
                    <p class="minus">-</p>
                    <p class="quantity">1</p>
                    <p class="plus">+</p>
                  </div>
                  <p class="remove-btn">remove</p>
              </div>
              `;

  cartproducts.appendChild(cartproduct);

  const cartprod = {
    prodimg: productimg,
    prodname: productname,
    prodprice: productprice,
  };

  let alreadyinlocal = false;

  localproducts.forEach((item) => {
    if (item.prodname == productname) {
      alreadyinlocal = true;
    }

    // console.log(item.prodname, productname);
  });

  if (!alreadyinlocal) {
    localproducts.push(cartprod);
  }

  const removebtns = document.querySelectorAll(".remove-btn");

  removebtns.forEach((btn) => {
    btn.addEventListener("click", removeitem);

    notification.classList.add("show-notif");
    notification.innerHTML = `
       <h2> item is removed from cart </h2> 
      `;
    setTimeout(() => {
      notification.classList.remove("show-notif");
    }, 2000);
  });

  const plus = document.querySelectorAll(".plus");

  plus.forEach((plussign) => {
    plussign.addEventListener("click", addcount);
  });

  const minus = document.querySelectorAll(".minus");

  minus.forEach((minussign) => {
    minussign.addEventListener("click", decreasecount);
  });

  updatecarttotal();

  // console.log(cartproduct);
  // local storage

  localStorage.setItem("localprod", JSON.stringify(localproducts));
  count.innerHTML = localproducts.length;

  emptycart();
}

// remove item function

function removeitem(e) {
  // console.log("item removed");
  const buttonremoved = e.target;

  const removedproductname =
    buttonremoved.parentElement.parentElement.children[0].children[1].innerHTML;

  localproducts.forEach((item, idx) => {
    if (item.prodname == removedproductname) {
      // console.log(idx);

      // const index = localproducts.indexOf(idx)

      localproducts.splice(idx, 1);
    }
  });

  buttonremoved.parentElement.parentElement.remove();
  updatecarttotal();
  localStorage.setItem("localprod", JSON.stringify(localproducts));

  count.innerHTML = localproducts.length;

  // console.log(cartproducts.children);

  emptycart();
}

// adding count funtion

function addcount(e) {
  const clickedplus = e.target;

  let quantitymain = clickedplus.parentElement.children[1];

  quantitymain.innerHTML = +quantitymain.innerHTML + 1;
  updatecarttotal();
}

// decreasing count function

function decreasecount(e) {
  const clickedminus = e.target;

  let quantitymain = clickedminus.parentElement.children[1];

  if (quantitymain.innerHTML > 1) {
    quantitymain.innerHTML = +quantitymain.innerHTML - 1;

    updatecarttotal();
  }
}

// updating total

function updatecarttotal() {
  const cartproduct = document.querySelectorAll(".cart-product");

  let currenttotal = 0;
  // console.log(typeof currenttotal);
  cartproduct.forEach((prod) => {
    const price = +prod.querySelector(".price").innerHTML;

    const quantity = +prod.querySelector(".quantity").innerHTML;

    console.log(price, quantity);
    currenttotal = currenttotal + price * quantity;

    // console.log(currenttotal);
  });

  // console.log(currenttotal);
  total.innerHTML = currenttotal;
}

// fetching data from local storage

function fetchproducts() {
  if (localStorage.getItem("localprod")) {
    localproducts = JSON.parse(localStorage.getItem("localprod"));
  } else {
    localproducts = [];
    localStorage.setItem("localprod", JSON.stringify(localproducts));
  }

  localproducts.forEach((prod) => {
    createcart(prod.prodimg, prod.prodname, prod.prodprice);
  });
}

fetchproducts();

// empty cart

const emptynotif = document.querySelector(".empty-notif");

function emptycart() {
  if (localproducts.length <= 0) {
    // cartbox.classList.add("empty-cart");

    emptynotif.style.display = "flex";
    cartbox.style.display = "none";
  } else {
    // cartbox.classList.remove("empty-cart");
    const emptynotif = document.querySelector(".empty-notif");

    emptynotif.style.display = "none";
    cartbox.style.display = "flex";
  }
}

function gotoproducts() {
  removeactivepage();
  sections[1].classList.add("active-page");
  removehighlight();
  anchorlink[1].classList.add("highlight");
}

// event listeners

addcardbtn.forEach((btn, index) => {
  btn.addEventListener("click", additemstocard);
  updatecarttotal();
});

count.innerHTML = localproducts.length;

// form event listeners

headerdivs[0].addEventListener("click", () => {
  forms[0].classList.add("show-form");
  forms[1].classList.remove("show-form");
  headerdivs[0].classList.add("change-color");
  headerdivs[1].classList.remove("change-color");
});

headerdivs[1].addEventListener("click", () => {
  forms[1].classList.add("show-form");
  forms[0].classList.remove("show-form");
  headerdivs[1].classList.add("change-color");
  headerdivs[0].classList.remove("change-color");
});

headerdivs[0].classList.add("change-color");
headerdivs[1].classList.remove("change-color");

// add event listener

forgottentag.addEventListener("click", (e) => {
  e.preventDefault();
  emailnotif.classList.add("show-email-notif");
});

closenotif.addEventListener("click", () => {
  emailnotif.classList.remove("show-email-notif");
});

productsbtn.addEventListener("click", gotoproducts);

discoverbtns.forEach((btn) => {
  btn.addEventListener("click", gotoproducts);
});
