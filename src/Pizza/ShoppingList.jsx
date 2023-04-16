import { useEffect, useState } from "react";

const ShoppingList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Shopping List</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in shopping list.</p>
      )}
    </div>
  );
};

export default ShoppingList;
