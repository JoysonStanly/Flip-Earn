import { assets } from '../assets/assets';
import {
  BoxIcon,
  GripIcon,
  ListIcon,
  MenuIcon,
  MessageCircleMoreIcon,
  XIcon
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className='h-20'>
      {/* Top Navbar */}
      <div className='fixed left-0 top-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white'>

        {/* Logo */}
        <img
          onClick={() => {
            navigate('/');
            scrollTo(0, 0);
          }}
          src={assets.logo}
          alt='logo'
          className='h-10 cursor-pointer'
        />

        {/* Desktop Menu */}
        <div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800'>
          <Link to='/' onClick={() => scrollTo(0, 0)}>Home</Link>
          <Link to='/marketplace' onClick={() => scrollTo(0, 0)}>Marketplace</Link>
          <Link to='/messages' onClick={() => scrollTo(0, 0)}>Messages</Link>
          <Link to='/my-listings' onClick={() => scrollTo(0, 0)}>My Listings</Link>
          <Link to='/my-orders' onClick={() => scrollTo(0, 0)}>My Orders</Link>
        </div>

        {/* Right Side */}
        <div>
          <button
            onClick={() => alert('Login Clicked')}
            className='max-sm:hidden cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full'
          >
            Login
          </button>

          <MenuIcon
            className='sm:hidden cursor-pointer'
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden fixed inset-0 ${
          menuOpen ? 'w-full' : 'w-0'
        } overflow-hidden bg-white/90 backdrop-blur z-50 text-sm transition-all`}
      >
        <div className='flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4'>

          <Link to='/' onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to='/marketplace' onClick={() => setMenuOpen(false)}>Marketplace</Link>
          <Link to='/messages' onClick={() => setMenuOpen(false)}>Messages</Link>
          <Link to='/my-listings' onClick={() => setMenuOpen(false)}>My Listings</Link>
          <Link to='/my-orders' onClick={() => setMenuOpen(false)}>My Orders</Link>

          <button
            onClick={() => alert('Login Clicked')}
            className='px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full'
          >
            Login
          </button>

          <XIcon
            onClick={() => setMenuOpen(false)}
            className='absolute size-8 right-6 top-6 text-gray-500 cursor-pointer'
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;