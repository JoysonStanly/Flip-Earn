import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import MyListings from './pages/MyListings';
import ListingDetails from './pages/ListingDetails';
import ManageListing from './pages/ManageListing';
import Loading from './pages/Loading';
import MyOrders from './pages/MyOrders';
import Messages from './pages/Messages';
import ChatBox from './components/ChatBox';
import { useSelector } from "react-redux";

const App = () => {
  const { isOpen } = useSelector((state) => state.chat);
  const { pathname } = useLocation();

  return (
    <div>
            {!pathname.includes('/admin') && <Navbar />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/marketplace' element={<Marketplace />} />
                <Route path='/my-listings' element={<MyListings />} />
                <Route path='/listing/:listingId' element={<ListingDetails />} />
                <Route path='/messages' element={<Messages />} />
                <Route path='/create-listing' element={<ManageListing />} />
                <Route path='/edit-listing/:id' element={<ManageListing />} />
                <Route path='/my-orders' element={<MyOrders />} />
                <Route path='/loading' element={<Loading />} />
                
            </Routes>
            {isOpen && <ChatBox />}
            
        </div>
  )
}

export default App