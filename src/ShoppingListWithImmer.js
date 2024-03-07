import React from 'react';
import { useImmer } from 'use-immer';

// Initialize state w/ immer
function ShoppingListWithImmer() {
  const [shoppingList, setShoppingList] = useImmer([
    { id: 1, name: 'Apples', quantity: 3, details: { category: 'Fruit', notes: 'Cosmic Crisp' } },
    { id: 2, name: 'Milk', quantity: 1, details: { category: 'Dairy', notes: 'Whole' } },
    { id: 3, name: 'Bread', quantity: 2, details: { category: 'Bakery', notes: 'Baguette' } }
  ]);

// Add new item to list & update 
  const addItem = newItem => {
    setShoppingList(draft => {
      draft.push(newItem);
    });
  };

// Update item & list
  const updateItem = (itemId, updatedItem) => {
    setShoppingList(draft => {
      const itemIndex = draft.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        draft[itemIndex] = updatedItem;
      }
    });
  };

// Remove item & update list
  const removeItem = itemId => {
    setShoppingList(draft => {
      const itemIndex = draft.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        draft.splice(itemIndex, 1);
      }
    });
  };

// Buttons, event handlers, input fields, & ID 
  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {shoppingList.map(item => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - Category: {item.details.category} - Notes: {item.details.notes}
            <button onClick={() => updateItem(item.id, { ...item, quantity: item.quantity + 1 })}>Increase Quantity</button>
            <button onClick={() => updateItem(item.id, { ...item, quantity: item.quantity - 1 })}>Decrease Quantity</button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add New Item</h3>
        <label>Name:</label>
        <input type="text" id="itemName" />
        <label>Quantity:</label>
        <input type="number" id="itemQuantity" />
        <label>Category:</label>
        <input type="text" id="itemCategory" />
        <label>Notes:</label>
        <input type="text" id="itemNotes" />
        <button onClick={() => addItem({
          id: Date.now(), 
          name: document.getElementById('itemName').value,
          quantity: parseInt(document.getElementById('itemQuantity').value),
          details: {
            category: document.getElementById('itemCategory').value,
            notes: document.getElementById('itemNotes').value
          }
        })}>Add Item</button>
      </div>
    </div>
  );
}

export default ShoppingListWithImmer;


