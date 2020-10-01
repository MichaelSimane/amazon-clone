import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';

function Payment() {

    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();


    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(""); 

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true); 
    const [clientSecret, setClientSecret] = useState(true); 


    // very important
    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async () => {
            // axios for fetch and postrequest or 
            const response = await axios({
                method: 'post',
                // stripe expects the total in a cr=urrencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });

            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log("the secret is >>>", clientSecret)

    const handleSubmit = async (event) => {
        // do all the fancy stirpe stuff

        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: "EMPTY_BASKET"
            })

            history.replace('/orders')
        })


    }

    const handleChange = event => {
        // listen for changes in the cardelement
        // and display any error as the customer types their card details

        // if the event is empty disable the button
        setDisabled(event.empty);
        // if there is an error show the error or show nothing
        setError(event.error ? event.error.message: "");
    }

    return (
        <div className="payment">
            <div className="payment_container">

                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                {/* payment section - delivery address */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery address</h3>
                    </div>

                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>cmc</p>
                        <p>Addis Ababa</p>
                    </div>
                </div>

                {/* payment section - review items */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>

                    <div className='payment_items'>
                        {basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* payment section - payment method */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment method</h3>
                    </div>

                    <div className="payment_details">
                        {/* using  stripe */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContainer">
                                <CurrencyFormat 
                                    renderText={(value) => (                                        
                                        <h3>Order Total: {value}</h3>                                         
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
                                </button>
                            </div>
                            {/* error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment
