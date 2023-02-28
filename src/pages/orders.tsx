import React, { useEffect, useState } from 'react'
import { collection, DocumentData, onSnapshot, query, where } from 'firebase/firestore';
import { Container } from '../components/Container'
import { Navbar } from '../components/Navbar'
import { useAuthListener } from '../hooks/useAuthListener';
import { ICartItem } from '../interfaces/IRestaurant';
import { db } from '../lib/Firebase';

function Orders() {
    const [orders,setOrders]=useState<ICartItem[]>([])
const {user}=useAuthListener()

    useEffect(() => {
        if (!user) return;
    
        const q = query(
          collection(db, "my-orders"),
          where("user.uid", "==", user.uid)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          let data = snapshot.docs.map((doc: DocumentData) => ({
            data: doc.data(),
          }));
    
          setOrders(data.map((item: { data: ICartItem }) => item.data));
        });
    
        return () => {
          unsubscribe();
        };
      }, [user]);




  return (
    <>
    <Navbar/>
    <main>
      <Container>
<div className="">

<div className="relative overflow-x-auto  sm:rounded-lg">
    <table className="w-1/2 text-xl text-left text-gray-500 dark:text-gray-400">
        <thead className="text-2xl font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
            
                
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        Price
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                
            </tr>
        </thead>
        <tbody>
            {orders?.map(order=>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.name}
                </th>
                
                
                <td className="px-6 py-4">
                    Rs.{order.price}
                </td>
                
            </tr>
                )}
            
        </tbody>
    </table>
</div>

  
</div>
      </Container>
    </main>
    </>
  )
}

export default Orders