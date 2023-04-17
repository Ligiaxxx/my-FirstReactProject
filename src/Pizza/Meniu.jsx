import { React, useState, useEffect } from "react";
import "../styles/Meniu.css";
import { Link } from "react-router-dom";

const Meniu = (id, name) => {
  const [activeItem, setActiveItem] = useState(null);
  const [Menu, setMenu] = useState(null);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      });
  }, []);

  const pizza = [
    {
      id: 1,
      name: "Pizza Capriciosa",
      description1: "sos de roșii, mozzarella, salam, măsline,",
      description2: "ceapă",
      description3: "750 gr - 32 cm",
      description4: "1100 gr - 40 cm",
      price: 10.99,
      img: "./src/assets/capriziosa.png",
      class: "pizza-img",
      classDiv: "capriciosa",
      quantity: 1,
    },
    {
      id: 2,
      name: "Pizza Provinciale",
      description1: "sos de roșii, șuncă, ciuperci,",
      description2: "mozzarella, porumb, bacon",
      description3: "750 gr - 32 cm",
      description4: "1100 gr - 40 cm",
      price: 10.99,
      img: "./src/assets/provinciale.png",
      class: "pizza-img",
      classDiv: "provinciale",
      quantity: 1,
    },
    {
      id: 3,
      name: "Pizza Quatro Stagioni",
      description1: "sos de roșii, mozzarella, șuncă, ciuperci,",
      description2: "porumb, ardei roșu",
      description3: "750 gr - 32 cm",
      description4: "1100 gr - 40 cm",
      price: 10.99,
      img: "./src/assets/quatro.png",
      class: "pizza-img",
      classDiv: "quatro",
      quantity: 1,
    },
    {
      id: 4,
      name: "Pizza Quatro Formaggi",
      description1: "sos de roșii, cașcaval, mozzarella,",
      description2: "cheddar și parmesan",
      description3: "700 gr - 32 cm",
      description4: "1100 gr - 40 cm",
      price: 10.99,
      img: "./src/assets/qf.png",
      class: "pizza-img",
      classDiv: "qf",
      quantity: 1,
    },
    {
      id: 5,
      name: "Pizza Casei",
      description1: "sos de roșii, mozzarella, șuncă,",
      description2: "ciuperci, cârnaț, ardei iute, măsline",
      description3: "700 gr - 32 cm",
      description4: "1000 gr - 40 cm",
      price: 10.99,
      img: "./src/assets/casei.png",
      class: "pizza-img",
      classDiv: "casei",
      quantity: 1,
    },
    {
      id: 6,
      name: "Pizza Tono",
      description1: "sos de roșii, ton, mozzarella, ceapă",
      description2: "cheddar ",
      description3: "700 gr - 32 cm",
      description4: "1100 gr - 40 cm",
      price: 10.99,
      img: "./src/assets/tono.png",
      class: "pizza-img",
      classDiv: "tono",
      quantity: 1,
    },
  ];

  const paste = [
    {
      id: 7,
      name: "Paste Carbonara ",
      description1: "tagliatelle sau pene, bacon, grancucina,",
      description2: "ou, parmezan",
      description3: "450 gr",
      price: 10.99,
      img: "./src/assets/carbonara.png",
      class: "paste-img",
      classDiv: "carbonara",
      quantity: 1,
    },
    {
      id: 8,
      name: "Paste Creamy Mushrooms ",
      description1: "tagliatelle sau pene, ciuperci,",
      description2: "grancucina, parmezan",
      description3: "400 gr",
      price: 10.99,
      img: "./src/assets/creamy.png",
      class: "paste-img",
      classDiv: "creamy",
      quantity: 1,
    },
  ];

  const meniuPui = [
    {
      id: 9,
      name: "Chicken box",
      description1: "200 grame de cartofi, 150 grame piept",
      description2: "crispy, sos bruno",
      price: 10.99,
      img: "./src/assets/chicken.png",
      class: "meniuPui-img",
      classDiv: "chicken",
      quantity: 1,
    },
    {
      id: 10,
      name: "Aripioare de pui",
      description1: "200 grame cartofi, 5 aripioare de pui,",
      description2: "sos: sos bruno, usturoi, ketchup",
      price: 10.99,
      img: "./src/assets/aripioare.png",
      class: "meniuPui-img",
      classDiv: "aripioare",
      quantity: 1,
    },
  ];
  async function handleAddPizzaToCart(e) {
    e.preventDefault();

    const selectedId = parseInt(e.target.dataset.id);
    const selectedDish = pizza.find((dish) => dish.id === selectedId);
    const existingCartItem = cart.find((item) => item.id === selectedId);

    if (existingCartItem) {
      const updatedCart = [...cart];
      const existingCartItemIndex = updatedCart.findIndex(
        (item) => item.id === selectedId
      );
      updatedCart[existingCartItemIndex].quantity += 1;
      setCart(updatedCart);
      setAddedToCart(true);
      // alert("Item added to cart!");

      try {
        const newItem = {
          name: selectedDish.name,
          id: selectedDish.id,
          price: selectedDish.price,
          quantity: selectedDish.quantity, // set the quantity to 1 for new items
        };
        const response = await fetch(
          `http://localhost:3000/items?id=${newItem.id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const existingItem = await response.json();

        if (existingItem.length > 0) {
          const updatedItem = {
            ...existingItem[0],
            quantity: existingItem[0].quantity + 1,
          };

          const response = await fetch(
            `http://localhost:3000/items/${existingItem[0].id}`,
            {
              method: "PUT",
              body: JSON.stringify(updatedItem),
              headers: {
                "Content-type": "application/json",
              },
            }
          );

          if (response.ok) {
            setCart([...cart, updatedItem]);
            setAddedToCart(true);
            alert("Item added to cart!");
          } else {
            throw new Error("Failed to add item to cart");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const newItem = {
        name: selectedDish.name,
        id: selectedDish.id,
        price: selectedDish.price,
        quantity: selectedDish.quantity,
      };
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        setCart([...cart, { ...newItem, quantity: 1 }]);
        setAddedToCart(true);
        alert("Item added to carttttttttt!");
      } else {
        throw new Error("Failed to add item to cart");
      }
    }
  }

  async function pizzahandleAddPasteToCart(e) {
    e.preventDefault();

    const selectedId = parseInt(e.target.dataset.id);
    const selectedDish = paste.find((dish) => dish.id === selectedId);
    const existingCartItem = cart.find((item) => item.id === selectedId);

    if (existingCartItem) {
      const updatedCart = [...cart];
      const existingCartItemIndex = updatedCart.findIndex(
        (item) => item.id === selectedId
      );
      updatedCart[existingCartItemIndex].quantity += 1;
      setCart(updatedCart);
      setAddedToCart(true);
      // alert("Item added to cart!");

      try {
        const newItem = {
          name: selectedDish.name,
          id: selectedDish.id,
          price: selectedDish.price,
          quantity: selectedDish.quantity, // set the quantity to 1 for new items
        };
        const response = await fetch(
          `http://localhost:3000/items?id=${newItem.id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const existingItem = await response.json();

        if (existingItem.length > 0) {
          const updatedItem = {
            ...existingItem[0],
            quantity: existingItem[0].quantity + 1,
          };

          const response = await fetch(
            `http://localhost:3000/items/${existingItem[0].id}`,
            {
              method: "PUT",
              body: JSON.stringify(updatedItem),
              headers: {
                "Content-type": "application/json",
              },
            }
          );

          if (response.ok) {
            setCart([...cart, updatedItem]);
            setAddedToCart(true);
            alert("Item added to cart!");
          } else {
            throw new Error("Failed to add item to cart");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const newItem = {
        name: selectedDish.name,
        id: selectedDish.id,
        price: selectedDish.price,
        quantity: selectedDish.quantity,
      };
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        setCart([...cart, { ...newItem, quantity: 1 }]);
        setAddedToCart(true);
        alert("Item added to carttttttttt!");
      } else {
        throw new Error("Failed to add item to cart");
      }
    }
  }

  async function pizzahandleAddMeniuToCart(e) {
    e.preventDefault();

    const selectedId = parseInt(e.target.dataset.id);
    const selectedDish = meniuPui.find((dish) => dish.id === selectedId);
    const existingCartItem = cart.find((item) => item.id === selectedId);

    if (existingCartItem) {
      const updatedCart = [...cart];
      const existingCartItemIndex = updatedCart.findIndex(
        (item) => item.id === selectedId
      );
      updatedCart[existingCartItemIndex].quantity += 1;
      setCart(updatedCart);
      setAddedToCart(true);
      // alert("Item added to cart!");

      try {
        const newItem = {
          name: selectedDish.name,
          id: selectedDish.id,
          price: selectedDish.price,
          quantity: selectedDish.quantity, // set the quantity to 1 for new items
        };
        const response = await fetch(
          `http://localhost:3000/items?id=${newItem.id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const existingItem = await response.json();

        if (existingItem.length > 0) {
          const updatedItem = {
            ...existingItem[0],
            quantity: existingItem[0].quantity + 1,
          };

          const response = await fetch(
            `http://localhost:3000/items/${existingItem[0].id}`,
            {
              method: "PUT",
              body: JSON.stringify(updatedItem),
              headers: {
                "Content-type": "application/json",
              },
            }
          );

          if (response.ok) {
            setCart([...cart, updatedItem]);
            setAddedToCart(true);
            alert("Item added to cart!");
          } else {
            throw new Error("Failed to add item to cart");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const newItem = {
        name: selectedDish.name,
        id: selectedDish.id,
        price: selectedDish.price,
        quantity: selectedDish.quantity,
      };
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        setCart([...cart, { ...newItem, quantity: 1 }]);
        setAddedToCart(true);
        alert("Item added to carttttttttt!");
      } else {
        throw new Error("Failed to add item to cart");
      }
    }
  }

  return (
    <>
      <div className="meniu">
        <img src="./src/assets/main.jpg" alt="main-img" className="main-img" />

        <div className="container">
          <div className="cart-img">
            <ul>
              <li>
                <Link to="/shopping-list">
                  <img src="./src/assets/cart.png" alt="cart-img" />
                </Link>
              </li>
            </ul>
          </div>
          <h1>Meniu</h1>
          <div className="navbar">
            <ul>
              <li onClick={() => handleClick("Pizza")}>Pizza</li>
              <li onClick={() => handleClick("Paste")}>Paste</li>
              <li onClick={() => handleClick("Meniu Pui")}>Meniu Pui</li>
              <li onClick={() => handleClick("Burger")}>Burger</li>
            </ul>
            {(activeItem === "Pizza" || activeItem === null) && (
              <div>
                {pizza.map((dish) => (
                  <div key={dish.id} data={dish} className={dish.classDiv}>
                    <img
                      src={dish.img}
                      alt={dish.titlu}
                      className={dish.class}
                    />
                    <h2>{dish.name}</h2>
                    <p>{dish.description1}</p>
                    <p>{dish.description2}</p>
                    <p>{dish.description3}</p>
                    <p>{dish.description4}</p>
                    <p>${dish.price}</p>
                    <button
                      data-id={dish.id}
                      className="addBtn"
                      type="submit"
                      onClick={handleAddPizzaToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeItem === "Paste" && (
              <div>
                <div className="meniu-paste">
                  {paste.map((dish) => (
                    <div key={dish.id} data={dish} className={dish.classDiv}>
                      <img
                        src={dish.img}
                        alt={dish.titlu}
                        className={dish.class}
                      />
                      <h2>{dish.name}</h2>
                      <p>{dish.description1}</p>
                      <p>{dish.description2}</p>
                      <p>{dish.description3}</p>
                      <p>${dish.price}</p>
                      <button
                        data-id={dish.id}
                        className="addBtn"
                        type="submit"
                        onClick={pizzahandleAddPasteToCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeItem === "Meniu Pui" && (
              <div>
                <div className="meniu-pui">
                  {meniuPui.map((dish) => (
                    <div key={dish.id} data={dish} className={dish.classDiv}>
                      <img
                        src={dish.img}
                        alt={dish.titlu}
                        className={dish.class}
                      />
                      <h2>{dish.name}</h2>
                      <p>{dish.description1}</p>
                      <p>{dish.description2}</p>
                      <p>{dish.description3}</p>
                      <p>${dish.price}</p>
                      <button
                        data-id={dish.id}
                        className="addBtn"
                        type="submit"
                        onClick={pizzahandleAddMeniuToCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeItem === "Burger" && (
              <div>
                <p>Aici puteti vedea meniul de burger.</p>
                <div className="meniu-burger"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Meniu;
