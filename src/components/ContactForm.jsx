// eslint-disable-next-line no-unused-vars
import { useState, useRef, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ContactForm = () => {
  // Get cart data from your ShopContext
  const { getCartAmout, currency, delivery_fee, cartItems, products } =
    useContext(ShopContext);

  // Replace this with your Google Apps Script Web App URL
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwFuoULR0vLVhlZm5zqzPVSja0pky87yOvo2Th_nR2NkJYDiPy0zdFKWCgIFqu6RJJE/exec";

  // Algeria wilayas data - name and code
  const algeriaWilayas = [
    { name: "أدرار", code: "01" },
    { name: "الشلف", code: "02" },
    { name: "الأغواط", code: "03" },
    { name: "أم البواقي", code: "04" },
    { name: "باتنة", code: "05" },
    { name: "بجاية", code: "06" },
    { name: "بسكرة", code: "07" },
    { name: "بشار", code: "08" },
    { name: "البليدة", code: "09" },
    { name: "البويرة", code: "10" },
    { name: "تمنراست", code: "11" },
    { name: "تبسة", code: "12" },
    { name: "تلمسان", code: "13" },
    { name: "تيارت", code: "14" },
    { name: "تيزي وزو", code: "15" },
    { name: "الجزائر", code: "16" },
    { name: "الجلفة", code: "17" },
    { name: "جيجل", code: "18" },
    { name: "سطيف", code: "19" },
    { name: "سعيدة", code: "20" },
    { name: "سكيكدة", code: "21" },
    { name: "سيدي بلعباس", code: "22" },
    { name: "عنابة", code: "23" },
    { name: "قالمة", code: "24" },
    { name: "قسنطينة", code: "25" },
    { name: "المدية", code: "26" },
    { name: "مستغانم", code: "27" },
    { name: "المسيلة", code: "28" },
    { name: "معسكر", code: "29" },
    { name: "ورقلة", code: "30" },
    { name: "وهران", code: "31" },
    { name: "البيض", code: "32" },
    { name: "إليزي", code: "33" },
    { name: "برج بوعريريج", code: "34" },
    { name: "بومرداس", code: "35" },
    { name: "الطارف", code: "36" },
    { name: "تندوف", code: "37" },
    { name: "تيسمسيلت", code: "38" },
    { name: "الوادي", code: "39" },
    { name: "خنشلة", code: "40" },
    { name: "سوق أهراس", code: "41" },
    { name: "تيبازة", code: "42" },
    { name: "ميلة", code: "43" },
    { name: "عين الدفلى", code: "44" },
    { name: "النعامة", code: "45" },
    { name: "عين تموشنت", code: "46" },
    { name: "غرداية", code: "47" },
    { name: "غليزان", code: "48" },
    { name: "تيميمون", code: "49" },
    { name: "برج باجي مختار", code: "50" },
    { name: "أولاد جلال", code: "51" },
    { name: "بني عباس", code: "52" },
    { name: "عين صالح", code: "53" },
    { name: "عين قزام", code: "54" },
    { name: "تقرت", code: "55" },
    { name: "جانت", code: "56" },
    { name: "المغير", code: "57" },
    { name: "المنيعة", code: "58" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    numero: "",
    localisation: "", // This will store both name and code in format: "الجزائر (16)"
  });

  const [status, setStatus] = useState({
    submitting: false,
    message: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Create an array of products currently in the cart
  const productsInCart = [];
  for (const itemId in cartItems) {
    const productInfo = products.find((product) => product._id === itemId);
    if (productInfo) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          productsInCart.push({
            id: itemId,
            name: productInfo.name,
            size: size,
            quantity: cartItems[itemId][size],
            price: productInfo.price,
          });
        }
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, message: null });

    // Calculate order totals
    const subtotal = getCartAmout();
    const shipping = delivery_fee;
    const total = subtotal === 0 ? 0 : subtotal + shipping;

    // Create a unique iframe name
    const iframeName = `hidden-iframe-${Date.now()}`;

    // Set up an invisible iframe
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Create a form element
    const form = document.createElement("form");
    form.method = "POST";
    form.action = SCRIPT_URL;
    form.target = iframeName; // Target the hidden iframe

    // Add customer info from the form
    Object.keys(formData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = formData[key];
      form.appendChild(input);
    });

    // Add order information
    const orderFields = {
      currency: currency,
      subtotal: subtotal + ".00",
      shipping_fee: shipping + ".00",
      total_amount: total + ".00",
    };

    // Add order info to the form
    Object.keys(orderFields).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = orderFields[key];
      form.appendChild(input);
    });

    // Create strings with all products info
    let productsList = "";
    let sizesList = "";
    let quantitiesList = "";

    productsInCart.forEach((product, index) => {
      productsList +=
        product.name + (index < productsInCart.length - 1 ? ", " : "");
      sizesList +=
        product.size + (index < productsInCart.length - 1 ? ", " : "");
      quantitiesList +=
        product.quantity + (index < productsInCart.length - 1 ? ", " : "");
    });

    // Add products information
    const productsInput = document.createElement("input");
    productsInput.type = "hidden";
    productsInput.name = "products";
    productsInput.value = productsList;
    form.appendChild(productsInput);

    // Add sizes information
    const sizesInput = document.createElement("input");
    sizesInput.type = "hidden";
    sizesInput.name = "sizes";
    sizesInput.value = sizesList;
    form.appendChild(sizesInput);

    // Add quantities information
    const quantitiesInput = document.createElement("input");
    quantitiesInput.type = "hidden";
    quantitiesInput.name = "quantities";
    quantitiesInput.value = quantitiesList;
    form.appendChild(quantitiesInput);

    // Add the form to the document and submit it
    document.body.appendChild(form);
    form.submit();

    // Clean up the form after submission
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1000);

    // Reset form and update status
    setFormData({ name: "", numero: "", localisation: "" });
    setStatus({
      submitting: false,
      message: "تم تقديم طلبك بنجاح! شكرًا لك على الشراء.",
    });
  };

  // Get the currency symbol and totals for display
  const subtotal = getCartAmout();
  const shipping = delivery_fee;
  const total = subtotal === 0 ? 0 : subtotal + shipping;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">أكمل طلبك</h2>

      {status.message && (
        <div className="p-3 mb-4 rounded bg-green-100 text-green-700">
          {status.message}
        </div>
      )}

      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h3 className="font-bold mb-2">ملخص الطلب</h3>

        {/* Product list */}
        <div className="mb-3">
          {productsInCart.map((product, index) => (
            <div key={index} className="flex justify-between text-sm mb-1">
              <span>
                {product.name} ({product.size}) x{product.quantity}
              </span>
              <span>
                {currency} {product.price * product.quantity}.00
              </span>
            </div>
          ))}
        </div>

        <hr className="my-2" />

        <div className="flex justify-between mb-2">
          <span>المجموع الفرعي</span>
          <span>
            {currency} {subtotal}.00
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>رسوم الشحن</span>
          <span>
            {currency} {shipping}.00
          </span>
        </div>
        <div className="flex justify-between font-bold">
          <span>المجموع</span>
          <span>
            {currency} {total}.00
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            الاسم واللقب
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numero" className="block text-gray-700 mb-2">
            رقم الهاتف
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="localisation" className="block text-gray-700 mb-2">
            ولاية
          </label>
          <select
            id="localisation"
            name="localisation"
            value={formData.localisation}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 rtl"
          >
            <option value="">-- اختر الولاية --</option>
            {algeriaWilayas.map((wilaya) => (
              <option
                key={wilaya.code}
                value={`${wilaya.name} (${wilaya.code})`}
              >
                {wilaya.name} ({wilaya.code})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={status.submitting || subtotal === 0}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {status.submitting ? "Processing..." : "Complete Purchase"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
