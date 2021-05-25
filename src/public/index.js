"use strict";

(function() {
  const DOMAIN = 'http://localhost:8000'

  window.addEventListener("load", () => {
    id("search").addEventListener('submit', searchOrder);
  });

  async function searchOrder(e) {
    e.preventDefault();
    let url = new URL(DOMAIN + "/orders/" + qs("#order-num").value)

    let order = await fetch(url, {mode: 'no-cors'})
      .then(res => res.json())
      .catch(e => {
        console.log(e)
      })

    displayOrder(order)
  }

  function displayOrder(order) {
    // Customer info
    qs("#c-name output").textContent = order.sold_to_name
    qs("#c-address output").textContent = order.sold_to_address
    qs("#c-city output").textContent = order.sold_to_city
    qs("#c-state output").textContent = order.sold_to_state
    qs("#c-country output").textContent = order.sold_to_country
    qs("#c-zip output").textContent = order.sold_to_zip

    // Recipient info
    qs("#r-name output").textContent = order.ship_to_name
    qs("#r-address output").textContent = order.ship_to_address
    qs("#r-city output").textContent = order.ship_to_city
    qs("#r-state output").textContent = order.ship_to_state
    qs("#r-country output").textContent = order.ship_to_country
    qs("#r-zip output").textContent = order.ship_to_zip

    // Product info
    qs("#sku-name output").textContent = order.sku_name
    qs("#sku output").textContent = order.sku
    qs("#price output").textContent = order.unit_price
    qs("#quantity output").textContent = order.quantity

    // Shipping info
    let ship_date_field = qs("#ship-date output")
    if (order.ship_date == null) {
      ship_date_field.textContent = "Not yet uploaded"
    } else {
      ship_date_field.textContent = order.ship_date
    }

    let tracking_field = qs("#tracking output")
    if (order.tracking_num == null) {
      tracking_field.textContent = "Not yet uploaded"
    } else {
      tracking_field = order.tracking_num
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
   function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

  /**
   * Appends a node to the given parent node
   * @param {string} parent - The parent node
   * @param {string} child - The child node to be appended to parent node
   */
  function append(parent, child) {
    parent.appendChild(child);
  }
})();