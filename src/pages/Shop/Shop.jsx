import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { Component, Fragment, useState } from "react";
import Search from "./Search";
import Pagination from "./Pagination";
import ShopCategory from "./ShopCategory";
import PopularPost from "./PopularPost";
import Tags from "./Tags";
import ProductCards from "./ProductCards";
const showResult = "Showing 01 - 12 of 139 Results";
import Data from "/src/products.json";
import { firestore } from "../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [products, setProducts] = useState([]);
  const [ogProducts, setOgProducts] = useState([]);
  //   category active colors
  const [selectedCategory, setSelectedCategory] = useState("All");

  // pagination
  // Get current products to display
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Number of products per page

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // category based filtering
  const menuItems = [ogProducts.map((Val) => Val.category)];

  const filterItem = (curcat) => {
    const newItem = ogProducts.filter((newVal) => {
      return newVal.category === curcat;
    });
    setSelectedCategory(curcat);
    setProducts(newItem);
  };

  // Functions

  const getProducts = async () => {
    try {
      const prod = [];
      const productSnap = await getDocs(collection(firestore, "products"));
      productSnap.forEach((product) => {
        prod.push({ id: product.id, ...product });
      });
      console.log("idhar dekh img kaha hai: ", prod);
      const products = [];
      prod.forEach((product) => {
        // Extract the fields object
        const fields = product._document.data.value.mapValue.fields;

        const extractedProduct = {
          category: fields.category.stringValue,
          img: fields.img.stringValue,
          id: fields.id.stringValue,
          name: fields.name.stringValue,
          price: fields.price.integerValue,
          quantity: fields.quantity.integerValue,
          ratings: fields.ratings.integerValue,
          ratingsCount: fields.ratingsCount.integerValue,
          seller: fields.seller.stringValue,
          shipping: fields.shipping.integerValue,
          stock: fields.stock.integerValue,
        };

        products.push(extractedProduct);
      });
      console.log("og prods: ", products);
      setOgProducts(products);
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(ogProducts);
  }, [products]);

  if (products.length == 0) return null;
  else
    return (
      <div>
        <PageHeader title={"Our Shop Pages"} curPage={"Shop"} />

        {/* shop page */}
        <div className="shop-page padding-tb">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-12">
                <article>
                  <div className="shop-title d-flex flex-wrap justify-content-between">
                    <p>{showResult}</p>
                    <div
                      className={`product-view-mode ${
                        GridList ? "gridActive" : "listActive"
                      }`}
                    >
                      <a
                        className="grid"
                        onClick={() => setGridList(!GridList)}
                      >
                        <i className="icofont-ghost"></i>
                      </a>
                      <a
                        className="list"
                        onClick={() => setGridList(!GridList)}
                      >
                        <i className="icofont-listine-dots"></i>
                      </a>
                    </div>
                  </div>
                  <div>
                    <ProductCards
                      products={currentProducts}
                      GridList={GridList}
                    />
                  </div>
                  <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={products.length}
                    paginate={paginate}
                    activePage={currentPage}
                  />
                </article>
              </div>
              <div className="col-lg-4 col-12">
                <aside>
                  <Search products={products} GridList={GridList} />
                  <PopularPost />
                  <Tags />
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Shop;