import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVegetableProduct = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const navigate = useNavigate();

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    currentQuantity: "",
    price: "",
    category: "vegetables", // Set the category to "vegetables"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage.");
      navigate("/seller/signin");
    } else {
      const requestBody = {
        itemName: formData.itemName,
        itemDescription: formData.itemDescription,
        currentQuantity: formData.currentQuantity,
        price: formData.price,
        category: formData.category,
      };

      fetch("http://localhost:3000/seller/vegetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setIsOrderPlaced(true);
          delay(1000).then(() => {
            setIsOrderPlaced(false);
          });
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    console.log("Form data:", formData);
  };

  return (
    <div className="bg-lime-200 text-black min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Add Vegetable Products</h2>
      <div className="w-96 bg-lime-500 py-3 px-3 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="itemName" className="block mt-3">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              placeholder="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="block mt-1 rounded-sm w-full border-none text-black"
            />
            <label htmlFor="itemDescription" className="block mt-3">
              Item Description
            </label>
            <input
              type="text"
              id="itemDescription"
              placeholder="Item Description"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
              className="block mt-1 rounded-sm w-full border-none text-black"
            />
            <label htmlFor="currentQuantity" className="block mt-3">
              Current Quantity
            </label>
            <input
              type="number"
              id="currentQuantity"
              placeholder="Current Quantity"
              name="currentQuantity"
              value={formData.currentQuantity}
              onChange={handleChange}
              className="block mt-1 rounded-sm w-full border-none text-black"
            />
            <label htmlFor="price" className="block mt-3">
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="block mt-1 rounded-sm w-full border-none text-black"
              min="0"
            />
          </div>
          {!isOrderPlaced && (
            <button
              type="submit"
              className="w-full bg-lime-100 hover:bg-lime-300 text-black font-bold py-2 px-4 rounded-md mt-3"
            >
              Add Product
            </button>
          )}
        </form>
      </div>
      {isOrderPlaced && (
        <p className="text-sm text-zinc-700 font-semibold">
          Product Placed Successfully
        </p>
      )}
    </div>
  );
};

export default AddVegetableProduct;
