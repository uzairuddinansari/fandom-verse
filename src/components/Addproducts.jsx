
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import "../styles/AddProducts.css";

const AddProducts = () => {
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageURL: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const showPopup = (type, title, message) => {
    setPopup({
      show: true,
      type,
      title,
      message,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: "success",
      title: "",
      message: "",
    });
  };

  const getProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setProducts(data);
    } catch (error) {
      console.error("Unable to load products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      if (
        !product.name ||
        !product.price ||
        !product.category ||
        !product.description
      ) {
        showPopup(
          "error",
          "Missing Details",
          "Please fill all fields before continuing."
        );
        return;
      }

      if (!editingId && !image) {
        showPopup(
          "error",
          "Missing Details",
          "Please select a product image before continuing."
        );
        return;
      }

      let imageURL = product.imageURL || "";

      if (image) {
        const formData = new FormData();

        formData.append("file", image);
        formData.append("upload_preset", "my_products");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/i6su4pd1/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error?.message || "Image upload failed"
          );
        }

        imageURL = data.secure_url;
      }

      if (editingId) {
        const updatedProduct = {
          name: product.name,
          price: Number(product.price),
          category: product.category,
          description: product.description,
          imageURL,
        };

        await updateDoc(
          doc(db, "products", editingId),
          updatedProduct
        );

        setProducts((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  ...updatedProduct,
                }
              : item
          )
        );

        showPopup(
          "success",
          "Product Updated",
          "The product has been updated successfully."
        );
      } else {
        const newProduct = {
          name: product.name,
          price: Number(product.price),
          category: product.category,
          description: product.description,
          imageURL,
        };

        const ref = await addDoc(
          collection(db, "products"),
          newProduct
        );

        setProducts((prev) => [
          ...prev,
          {
            id: ref.id,
            ...newProduct,
          },
        ]);

        showPopup(
          "success",
          "Product Added",
          "The product has been added successfully."
        );
      }

      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
        imageURL: "",
      });

      setImage(null);
      setEditingId(null);

      e.target.reset();
    } catch (error) {
      console.error(error);

      showPopup(
        "error",
        "Something Went Wrong",
        "Unable to save the product."
      );
    }
  };

  const startUpdate = (item) => {
    setEditingId(item.id);

    setProduct({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description,
      imageURL: item.imageURL,
    });

    setImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelUpdate = () => {
    setEditingId(null);

    setProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      imageURL: "",
    });

    setImage(null);
  };

  const deleteProduct = async (id) => {
    if (!id) return;

    try {
      await deleteDoc(doc(db, "products", id));

      setProducts((prev) =>
        prev.filter((item) => item.id !== id)
      );

      setDeleteId(null);

      showPopup(
        "success",
        "Product Deleted",
        "The product has been removed successfully."
      );
    } catch (error) {
      console.error("Delete error:", error);

      setDeleteId(null);

      showPopup(
        "error",
        "Delete Failed",
        "Unable to delete this product."
      );
    }
  };

  const previewImage = image
    ? URL.createObjectURL(image)
    : product.imageURL;

  return (
    <div className="products-page">

      <div className="page-title">
        <div>
          <span className="page-kicker">
            PRODUCT MANAGEMENT
          </span>

          <h1>
            {editingId ? "Update Product" : "Add Products"}
          </h1>

          <p>
            Add and manage your products from one place.
          </p>
        </div>

        <div className="product-count">
          <strong>{products.length}</strong>
          <span>Products</span>
        </div>
      </div>

      <div className="product-manager">

        <div className="product-form">

          <div className="section-heading">
            <div>
              <span>
                {editingId ? "EDIT PRODUCT" : "NEW PRODUCT"}
              </span>

              <h2>
                {editingId
                  ? "Update details"
                  : "Create a product"}
              </h2>
            </div>

            <div className="form-status">
              <span></span>
              {editingId ? "Editing" : "Ready"}
            </div>
          </div>

          <form onSubmit={saveProduct}>

            <div className="form-row">

              <div className="input-group">
                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-row">

              <div className="input-group">
                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Electronics"
                  value={product.category}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Product Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

            </div>

            <div className="input-group">

              <label>Description</label>

              <textarea
                name="description"
                placeholder="Write a detailed product description..."
                value={product.description}
                onChange={handleChange}
              ></textarea>

            </div>

            <div className="form-buttons">

              <button
                className="primary-btn"
                type="submit"
              >
                <span>
                  {editingId ? "✓" : "+"}
                </span>

                {editingId
                  ? "Save Update"
                  : "Add Product"}
              </button>

              {editingId && (
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={cancelUpdate}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        {(product.name ||
          product.price ||
          product.category ||
          product.description ||
          image ||
          product.imageURL) && (

          <div className="product-preview">

            <div className="preview-header">

              <div>
                <span>LIVE PREVIEW</span>
                <h2>Product Card</h2>
              </div>

              <div className="preview-dot"></div>

            </div>

            <div className="preview-card">

              <div className="preview-image">

                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Product preview"
                  />
                ) : (
                  <div className="image-placeholder">
                    <span>＋</span>
                    <p>Product image</p>
                  </div>
                )}

                {product.category && (
                  <span className="preview-category">
                    {product.category}
                  </span>
                )}

              </div>

              <div className="preview-content">

                <h3>
                  {product.name || "Your Product Name"}
                </h3>

                <div className="preview-price">
                  {product.price || "0"}
                </div>

                <p>
                  {product.description ||
                    "Your product description will appear here once you start filling the form."}
                </p>

                <div className="preview-footer">

                  <span>
                    {product.category || "Category"}
                  </span>

                  <span>
                    ● Available
                  </span>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      <div className="products-section">

        <div className="products-section-header">

          <div>
            <span>YOUR INVENTORY</span>
            <h2>All Products</h2>
          </div>

          <div className="inventory-count">
            {products.length} items
          </div>

        </div>

        {products.length === 0 ? (

          <div className="empty-products">

            <div>＋</div>

            <h3>No products yet</h3>

            <p>
              Add your first product using the form above.
            </p>

          </div>

        ) : (

          <div className="products-grid">

            {products.map((item) => (

              <div
                className="product-card"
                key={item.id}
              >

                <div className="product-image">

                  <img
                    src={item.imageURL}
                    alt={item.name}
                  />

                  <span className="product-category">
                    {item.category}
                  </span>

                </div>

                <div className="product-details">

                  <div className="product-top">

                    <h3>{item.name}</h3>

                    <span className="product-price">
                      {item.price}
                    </span>

                  </div>

                  <p className="product-description">
                    {item.description}
                  </p>

                  <div className="product-meta">

                    <span>
                      ● Active
                    </span>

                    <span>
                      {item.category}
                    </span>

                  </div>

                </div>

                <div className="card-buttons">

                  <button
                    className="update-btn"
                    type="button"
                    onClick={() => startUpdate(item)}
                  >
                    <span>↻</span>
                    Update
                  </button>

                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                  >
                    <span>×</span>
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {deleteId && (

        <div className="delete-modal">

          <div className="delete-modal-content">

            <h3>Delete Product?</h3>

            <p>
              Are you sure you want to delete this product?
              This action cannot be undone.
            </p>

            <div className="delete-modal-buttons">

              <button
                type="button"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => deleteProduct(deleteId)}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

      {popup.show && (

        <div className={`popup ${popup.type}`}>

          <div className="popup-content">

            <h3>{popup.title}</h3>

            <p>{popup.message}</p>

            <button
              type="button"
              onClick={closePopup}
            >
              OK
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default AddProducts;
