import React, { useState } from "react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function Register() {
  const navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState( " ")
  
  const initialValues = {
    name: "rashed",
    email: "rashed123@gmail.com",
    password: "rashed789",
    rePassword: "rashed789",
    phone: "+201144335454",
  };

  const onSubmit =  () => {
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then((res) => {console.log(res);
      navigate("/login");
    })
    .catch((err) => {
      setErrorMessage(err.response.data.message)
 
    })
    .finally(() => {setIsLoading(false);})
  };
 

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number:"
      ),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "error"),
    phone: Yup.string().matches(
      /^(\+\d{1,3}[-.\s]?)?\d{1,14}$/,
      "Invalid phone number"
    ),
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
     
    });



  return (
    <div className="my-10">
      <form onSubmit={handleSubmit}>
        <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
          <Input isInvalid={touched.name &&errors.name } errorMessage={errors.name}

            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            name="name"
            variant="bordered"
            className="col-span-2"
            label="Name"
            type="name"
          />
         
          <Input
                    isInvalid={touched.email &&errors.email } errorMessage={errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            variant="bordered"
            className="col-span-2"
            label="Email"
            type="email"
          />
         

          <Input
          isInvalid={touched.password &&errors.password } errorMessage={errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            variant="bordered"
            className="col-span-1"
            label="PassWord"
            type="password"
          />
          {/* {touched.password && errors.password && (
            <p className="text-warning">{errors.password}</p>
          )} */}
          <Input isInvalid={touched.rePassword &&errors.rePassword } errorMessage={errors.rePassword}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.rePassword}
            name="rePassword"
            variant="bordered"
            className="col-span-1"
            label="Repassword"
            type="password"
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
        
 
    
          <Button isLoading={isLoading} type="submit" className="col-span-2" color="primary">
            {" "}
            Register 
          </Button>
{ errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}
