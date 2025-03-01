import { Button, Input } from '@heroui/react';
import axios from 'axios';
import React from 'react'
import *as Yup  from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';


export default function Adress() {
  const {cartId}=useParams()
  async function checkOut( ) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: {
            details: "details",
            phone: "010107000999",
            city: "city",
          },
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: { url: "http://localhost:5173" },
        }
      );

      if (data.session?.url) {
        window.location.href = data.session.url; // Redirect to checkout
      }
    } catch (error) {
      console.error("Checkout error:", error)
    }
  }
  const initialValues = {
    details: "details",
    phone: "010107000999",
    city: "cairo",
   
  };

 const validationSchema = Yup.object({
  details: Yup.string().required("details is required"),
  city: Yup.string()
     
      .required("city is required"),
    
    phone: Yup.string().matches(
      /^(\+\d{1,3}[-.\s]?)?\d{1,14}$/,
      "Invalid phone number"
    ),
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      onSubmit:checkOut,
      validationSchema,
     
    });

  return (
   <div className="">
     <div className="my-10">
    <form onSubmit={handleSubmit}>
      <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
        <Input isInvalid={touched.details &&errors.details } errorMessage={errors.details}

          onBlur={handleBlur}
          onChange={handleChange}
          value={values.details}
          details="details"
          variant="bordered"
          className="col-span-2"
          label="details"
          type="text"
        />
       
       <Input isInvalid={touched.city &&errors.city } errorMessage={errors.city}

              onBlur={handleBlur}
              onChange={handleChange}
              value={values.city}
              city="city"
              variant="bordered"
              className="col-span-2"
              label="city"
              type="text"
/>


      
         
        <Input
           isInvalid={touched.phone &&errors.phone } errorMessage={errors.phone}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
          name="phone"
          variant="bordered"
          className="col-span-2"
          label="Phone"
          type="tel"
        />
      

  
        <Button  type="submit" className="col-span-2" color="success">
          {" "}
          Place Order  
        </Button>
      </div>
    </form>
  </div>
   </div>
  )
}
