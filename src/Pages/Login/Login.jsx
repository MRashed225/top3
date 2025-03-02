
import React, { useContext, useState } from "react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";

export default function Login() {
  const navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false)
   const [errorMessage, setErrorMessage] = useState( " ")
   const {setIsLoggedIn}=useContext(authContext)
  const initialValues = {
     email: "",
    password: "",
 
  };
 
  const onSubmit =  () => {
    setIsLoading(true);
    setErrorMessage("")
     axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
     .then((res) => { 
      if(res.data.message === "success"){
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true)
        navigate(location.pathname=="/login"? "/": location.pathname)
        // navigate("/")
      }
     
     })
     .catch((err) => {setErrorMessage(err.response.data.message)})
     .finally(() => {setIsLoading(false)});
   
 
  };


  const validationSchema = Yup.object({
     email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number:"
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
          
          <Input
        isInvalid={touched.email &&errors.email } errorMessage={errors.email}

            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            variant="bordered"
            className="col-span-2"
            label="Email"
            type="text"
          />
       

          <Input
                       isInvalid={touched.password &&errors.password } errorMessage={errors.password}

            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            variant="bordered"
            className="col-span-2"
            label="PassWord"
            type="password"
          />
         
        

          

    
          <Button isLoading={isLoading} type="submit" className="col-span-2" color="primary">
        
            Login
          </Button>
          { errorMessage && <p className='text-red-500'>{errorMessage}</p>}

        </div>
      </form>
    </div>  )
}
