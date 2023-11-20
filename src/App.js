import { useState } from "react";

export default function App() {
  const [items,setItems] = useState([])
  // in react it is not allowed to mutate an existing array, and hence we have to create a new array and include the new item in it as shown in the function. 
  function handleAddItems(item) {
    setItems(items=> [...items,item])
  }

  function handleDeleteItems(id) {
    console.log(id);
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? {...item,packed:!item.packed} : item))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems = {handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItems} onToggleItem={handleToggleItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Pack-ur-Bag</h1>;
}

function Form({onAddItems}) {
  const [description, setDesciprtion] = useState("");
  const [quantity,setQuantity] = useState(1)
  //The initial state for the packing list is an empty list, and as we move forward we can keep adding items in the list
  

  function handleSubmit(e) {
    e.preventDefault();

    if(!handleSubmit) return;

    // specifying a new item and the different properties of each item. 
    const newItem = {quantity,description, packed:false, id:Date.now()}
    console.log(newItem)

    onAddItems(newItem)

    setDesciprtion('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>What do you need for your trip?</h2>
      <select value={quantity} onChange={(e) => {setQuantity(Number(e.target.value))}}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => {setDesciprtion(e.target.value)}
        }
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items,onDeleteItem,onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} onToggleItem={onToggleItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item,onDeleteItem,onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}> ❌ </button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list. You have packed X% of your list.</em>
    </footer>
  );
}
