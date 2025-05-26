import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import Spinner from '../components/Spinner'

const PaymentVerify = () => {
    const { backendUrl, token, loadCreditData } = useContext(AppContext)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    const verifyPayment = async () => {
        const reference = searchParams.get('reference');

        if (!reference) {
            toast.error('Transaction reference missing');
            return navigate('/buy-credit')
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/verify-paystack`, { reference }, { headers: { token } });

            if (data.success) {
                loadCreditData();
                toast.success("Payment successful! Credits added");
                navigate('/payment-success')
            } else {
                toast.error(data.message || "Verification failed");
                navigate('/payment-failed')
            }
        } catch (error) {
            toast.error("Something went wrong verifying payment");
            navigate('/payment-failed')
        }
    };

    useEffect(() => {
        verifyPayment()
    }, [])


    return (
        <div className='min-h-[70vh] flex flex-col items-center justify-center text-center'>
            <h1 className='text-2xl italic text-purple-600'>Verifying payment... please wait</h1>
            <Spinner></Spinner>
        </div>
    )
}

export default PaymentVerify