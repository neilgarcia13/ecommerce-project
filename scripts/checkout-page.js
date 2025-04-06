//Importing and calling of functions for organization of code purposes
import { renderCheckoutHeader } from "./checkout-page/checkoutHeader.js";
import { renderOrderSummary } from "./checkout-page/orderSummary.js";
import {renderPaymentSummary} from "./checkout-page/paymentSummary.js";
import '../data/cart-oop.js'

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();