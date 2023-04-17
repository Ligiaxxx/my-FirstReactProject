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

  // async function handleDelete(meniuId){
  //   console.log(meniuId)

  //   await fetch(`http://localhost:3000/items/${meniuId}`, {
  //     method: "DELETE",
  //   })
  //   const updatedMeniu = items.filter((item) => item.id !== meniuId);
  //   setItems(updatedMeniu);
  // }

  async function handleDelete(itemId) {
    const item = items.find((item) => item.id === itemId);
    if (!item) {
      return;
    }

    if (item.quantity > 1) {
      // Decrease the quantity by 1
      await fetch(`http://localhost:3000/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          quantity: item.quantity - 1,
        }),
      });

      const updatedItems = items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setItems(updatedItems);
    } else {
      // Delete the item
      await fetch(`http://localhost:3000/items/${itemId}`, {
        method: "DELETE",
      });

      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    }
  }
  return (
    <div>
      <h2>Shopping List</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} - ${item.price * item.quantity}
              <button onClick={() => handleDelete(item.id)}>&times;</button>
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
