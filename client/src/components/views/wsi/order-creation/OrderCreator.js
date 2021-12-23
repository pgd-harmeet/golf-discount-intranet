import './OrderCreator.css';
import { useState } from 'react';

/**
 * Component that handles creating a WSI order
 * @returns JSX React component
 */
function OrderCreator() {
  const [displayRecipient, setDisplayRecipient] = useState(true);

  function submitOrder(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    let orderInfo = {
      orderNum: formData.get('orderNum'),
      storeNum: formData.get('storeNum'),
      shippingMethod: formData.get('shippingMethod'),
      customer: {},
      recipient: {},
      products: []
    }

    const skus = formData.getAll('sku');
    const quantities = formData.getAll('quantity');
    const prices = formData.getAll('price');

    for (let i = 0; i < skus.length; i++) {
      let product = {
        sku: skus[i],
        quantity: quantities[i],
        prices: prices[i]
      }

      orderInfo.products.push(product);
    }

    const names = formData.getAll('name');
    const addresses = formData.getAll('address');
    const cities = formData.getAll('city')
    const states = formData.getAll('state');
    const countries = formData.getAll('country');
    const zips = formData.getAll('zip');

    const customer = {
      name: names[0],
      address: addresses[0],
      city: cities[0],
      state: states[0],
      country: countries[0],
      zip: zips[0]
    }

    orderInfo.customer = customer;

    if(formData.get('sameAddress')) {
      orderInfo.recipient = customer;
    } else {
      orderInfo.recipient = {
        name: names[1],
        address: addresses[1],
        city: cities[1],
        state: states[1],
        country: countries[1],
        zip: zips[1]
      }
    }

    console.log(orderInfo);
  }

  return (
    <div className='tab-content'>
      <form onSubmit={submitOrder}>
        <div className='order-creator'>
          <div>
            <OrderInfo />
            <Address type='customer' header='Customer' />
            <label><input type='checkbox' name='sameAddress' onChange={e => setDisplayRecipient(!e.target.checked)}/>Shipping and billing address are the same</label>
            {displayRecipient && <Address type='recipient' header='Recipient' />}
          </div>
          <ProductList />
        </div>
        <button type='submit'>Submit Order</button>
      </form>
    </div>
  );
}

/**
 * Component containing order information such as order number, shipping method etc.
 * @returns JSX React component
 */
function OrderInfo() {
  const [orderNum, setOrderNum] = useState('');
  return (
    <div className='vertical-form'>
      <h1>Order Creation</h1>
      {/** Store number selectors */}
      <label>
        Store Number:
        <label>
          <input type='radio' name='storeNum' value='1' defaultChecked />
          1
        </label>
        <label>
          <input type='radio' name='storeNum' value='2'/>
          2
        </label>
        <label>
          <input type='radio' name='storeNum' value='3'/>
          3
        </label>
        <label>
          <input type='radio' name='storeNum' value='5'/>
          5
        </label>
        <label>
          <input type='radio' name='storeNum' value='6'/>
          6
        </label>
        <label>
          <input type='radio' name='store_num' value='7'/>
          7
        </label>
      </label>
      {/** Order number entry */}
      <label className='text-input'>
        Order Number:
        <input required value={orderNum} onChange={e => setOrderNum(e.target.value)} name='orderNum'/>
      </label>
      {/** Shipping method selector with default as FDXH */}
      <label>
        Shipping Method:
        <select defaultValue={"FDXH"} name='shippingMethod'>
          <option value="FDXH">FedEx Home Delivery</option>
          <option value="FXES">FedEx 3-Day</option>
          <option value="FX2D">FedEx 2-Day</option>
          <option value="FXSO">FedEx 1-Day</option>
        </select>
      </label>
    </div>
  );
}

/**
 * Address component with a default of US for the country
 * @returns JSX React component
 */
function Address(props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('US');
  const [zip, setZip] = useState('');

  return (
    <div className='vertical-form'>
      <h2>{props.header} Address</h2>
      <label>Name: <input required value={name} onChange={e => setName(e.target.value)} name='name' /></label>
      <label>Address: <input required value={address} onChange={e => setAddress(e.target.value)} name='address' /></label>
      <label>City: <input required value={city} onChange={e => setCity(e.target.value)} name='city' /></label>
      <label>State: <input required value={state} onChange={e => setState(e.target.value)} name='state' /></label>
      <label>Country: <input required value={country} onChange={e => setCountry(e.target.value)} name='country' /></label>
      <label>Zip Code: <input required value={zip} onChange={e => setZip(e.target.value)} name='zip' /></label>
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = useState([{id: 1}]);

  /**
   * Adds another product entry to the current set of products
   */
  function addProduct() {
    let productCopy = products.map(product => {
      return product;
    });
    productCopy.push({id: products[products.length - 1].id + 1});
    setProducts(productCopy);
  }

  /**
   * Removes a product from the product list based on id
   */
  function RemoveProduct(id) {
    if (products.length !== 1) {
      let newProducts = products.filter(product => product.id !== id);
      setProducts(newProducts);
    }

  }

  return (
    <div className='product-container'>
      <h2>Products</h2>
      {products.map(product => <Product id={product.id} key={product.id} removeProduct={RemoveProduct}/>)}
      <button type='button' onClick={addProduct}>Add another product</button>
    </div>
  );
}

/**
 * Product component with a default of 1 for quantity
 * @param {Object} props Object with id assigned to this product entry
 * @returns JSX React component 
 */
function Product(props) {
  const id = props.id;
  const RemoveProduct = props.removeProduct;

  return(
    <div className='vertical-form'>
      <label className='text-input'>SKU: <input required name='sku'/></label>
      <label className='text-input'>Quantity: <input type='number' defaultValue={'1'} required name='quantity'/></label>
      <label className='text-input'>Price: $<input required name='price'/></label>
      <button type='button' onClick={() => RemoveProduct(id)}>Remove Product</button>
      <hr />
    </div>
  );
}

export default OrderCreator;