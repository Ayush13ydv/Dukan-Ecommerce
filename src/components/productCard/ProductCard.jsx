import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/MyContext'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart } from '../store/cartSlice'
import { toast } from 'react-toastify'
import { GiShoppingBag } from 'react-icons/gi'


function ProductCard() {
    const context = useContext(myContext)
    const { mode,product, searchkey,filterType,
        filterPrice } = context
    const dispatch = useDispatch();
    const cartItems = useSelector((state)=>state.cart)

    const addCart = (item,event)=>{
        event.stopPropagation();
        
        const isItemInCart = cartItems.some(cartItem => cartItem.id == item.id);

        if (isItemInCart) {
          // Show toast notification
          toast.error('Item is already in the cart!');
        } else {
          // Add item to cart
          dispatch(AddToCart(item))
          toast.success('Added to cart');

         
        }
    }
       
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cartItems))
    },[cartItems])
    return (
        <section className="text-gray-600 body-font"  style={{fontFamily:'Poppins,sans-serif'}}>
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {
                       product.filter((obj) => {
                        if(searchkey){
                            
                         return obj.title.toLowerCase().includes(searchkey.toLowerCase())
                        }
                        return true;
                    })
                        
                    .filter((obj) => {
                        // Check if filterType is provided and filter by category
                        if (filterType) {
                          return obj.category.toLowerCase().includes(filterType.toLowerCase());
                        }
                        return true; // No filtering if filterType is empty
                      })
                      .filter((obj) => {
                        // Check if filterPrice is provided and filter by price
                        if (filterPrice) {
                          return obj.price.toString().includes(filterPrice.toString());
                        }
                        return true; // No filtering if filterPrice is empty
                      }).slice(0,8).map((item,index)=>{
                        const {title,price,description,imgUrl,id} = item;
                        return(
                            <div onClick={()=> window.location.href = `/productinfo/${id}`} key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                            <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <div className="flex justify-center cursor-pointer" >
                                    <img className=" rounded-2xl w-full h-90 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imgUrl} alt="blog" />
                                </div>
                                <div className="p-5 border-t-2">
                                    <h2 className="tracking-widest flex text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>Dukan <GiShoppingBag style={{marginTop:'-1px'}} size={15}/></h2>
                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
                                    {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                                    <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                                    <div className=" flex justify-center">
                                        <button onClick={(event)=>addCart(item,event)} type="button" className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>
    
                                    </div>
                                </div>
    
                            </div>
                        </div>
                        )
                       })
                    }
                 

                    
                    

                </div>

            </div>
        </section >

    )
}

export default ProductCard