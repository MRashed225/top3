import  axios  from 'axios';
import { Bounce, toast } from 'react-toastify';


export async function addProductToCart(productId) {

    const { data } = await axios.post(
      " https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      { headers: { token: localStorage.getItem("token") } }
    )

   console.log(data);

   toast.success("the Product Add ", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick:  true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
  }
// Assuming this is in your AddTocart.js file
// import { toast } from 'react-toastify';
// import axios from 'axios';

// export async function addProductToCart(productId) {
//     try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             toast.error("Please log in to add items to the cart.", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//             return;
//         }

//         const { data } = await axios.post(
//             "https://ecommerce.routemisr.com/api/v1/cart",
//             { productId },
//             { headers: { token } }
//         );

//         if (data && data.success) {
//             toast.success("Product added to cart successfully!", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//         } else {
//             toast.error("Failed to add product to cart. Please try again.", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//         }
//     } catch (error) {
//         console.error("Error adding product to cart:", error);
//         toast.error("Something went wrong. Please try again later.", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//         });
//     }
// }
