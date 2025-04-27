import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [subCategorie, setSubCategorie] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategorie = (e) => {
    if (categorie.includes(e.target.value)) {
      setCategorie((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategorie((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategorie = (e) => {
    if (subCategorie.includes(e.target.value)) {
      setSubCategorie((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategorie((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categorie.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        categorie.includes(item.category)
      );
    }

    if (subCategorie.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategorie.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    console.log(categorie);
    console.log(subCategorie);
  }, [categorie, subCategorie]);

  useEffect(() => {
    applyFilter();
  }, [categorie, subCategorie, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/*  {/*filter options

      <div className="min-w-60">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : " "}`}
            alt=""
          />
        </p>

        {/*categorie filter 

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium ">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2 ">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategorie}
              />
              Men
            </p>
            <p className="flex gap-2 ">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategorie}
              />
              Women
            </p>
            <p className="flex gap-2 ">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategorie}
              />
              Kids
            </p>
          </div>
        </div>

        {/*Type filter 

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium ">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2 ">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategorie}
              />
              Topwear
            </p>
            <p className="flex gap-2 ">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategorie}
              />
              Bottomwear
            </p>
            <p className="flex gap-2 ">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategorie}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
 */}

      {/*right side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"جميع"} text2={"المجموعات"} />

          {/*Product sort */}

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 "
          >
            <option value="relevant">فرز حسب : ذات الصلة</option>
            <option value="low-high">الترتيب حسب: من الأقل إلى الأعلى</option>
            <option value="high-low">الترتيب حسب: من الأعلى إلى الأدنى</option>
          </select>
        </div>

        {/*Map Products */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterProducts.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
