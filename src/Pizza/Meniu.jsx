import { React, useState, useEffect } from "react";
import "../styles/Meniu.css";
import { Link } from "react-router-dom";
import { MeniuItem } from "./MeniuItem";

const Meniu = (id, name) => {
  const [activeItem, setActiveItem] = useState(null);
  const [Menu, setMenu] = useState(null);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [newDishName, setnewDishName] = useState("");

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

  const dishes = [
    {
      id: 1,
      name: "Pizza Capriciosa",
      description1: "sos de roșii, mozzarella, salam, măsline,",
      description2: "ceapă",
      description3: "750 gr - 32 cm",
      description4: "1100 gr - 40 cm",
      price: 10.99,
      img: "./src/assets/capriziosa.png",
      class: "capriciosa-img",
      classDiv: "capriciosa",
      quantity: 1
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
      class: "provinciale-img",
      classDiv: "provinciale",
      quantity: 1
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
      class: "quatro-img",
      classDiv: "quatro",
      quantity: 1
    },
  ];

  async function handleAddToCart(e) {
    e.preventDefault();

    const selectedId = parseInt(e.target.dataset.id);
    const selectedDish = dishes.find((dish) => dish.id === selectedId);
    const existingCartItem = cart.find((item) => item.id === selectedId);

    if (existingCartItem) {
      const updatedCart = [...cart];
      const existingCartItemIndex = updatedCart.findIndex((item) => item.id === selectedId);
      updatedCart[existingCartItemIndex].quantity += 1;
      setCart(updatedCart);
      setAddedToCart(true);
      // alert("Item added to cart!");

      try {
        const newItem = {
          name: selectedDish.name,
          id: selectedDish.id,
          price: selectedDish.price,
          quantity: selectedDish.quantity // set the quantity to 1 for new items
        }
        const response = await fetch(`http://localhost:3000/items?id=${newItem.id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        const existingItem = await response.json();

        if (existingItem.length > 0) {
          const updatedItem = {
            ...existingItem[0],
            quantity: existingItem[0].quantity + 1,
          };

          const response = await fetch(`http://localhost:3000/items/${existingItem[0].id}`, {
            method: "PUT",
            body: JSON.stringify(updatedItem),
            headers: {
              "Content-type": "application/json",
            },
          });

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
        quantity: selectedDish.quantity
      }
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
                {dishes.map((dish) => (
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
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeItem === "Paste" && (
              <div>
                <div className="meniu-paste"></div>
              </div>
            )}
            {activeItem === "Meniu Pui" && (
              <div>
                <p>Aici puteti vedea meniul de pui.</p>
                <div className="meniu-pui"></div>
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
