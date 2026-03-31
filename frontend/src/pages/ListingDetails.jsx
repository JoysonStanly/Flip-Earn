import { DollarSign, Users, LineChart, Eye, Calendar, MapPin, CheckCircle2, ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, Loader2Icon, ShoppingBagIcon, ArrowUpRightFromSquareIcon, MessageSquareMoreIcon } from 'lucide-react';
import { getProfileLink, platformIcons, dummyListings } from '../assets/assets';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';

export default function ListingDetails() {

    const { user, isLoaded } = useUser();
    const { openSignIn } = useClerk();

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY || '$';

    const [listing, setListing] = useState(null);

    const { listingId } = useParams();

    const [current, setCurrent] = useState(0);
    const images = listing?.images || [];

    const profileLink = listing && getProfileLink(listing.platform, listing.username);

    const prevSlide = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const nextSlide = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    // ✅ NO REDUX → USE DUMMY DATA
    useEffect(() => {
        const data = dummyListings.find((item) => item.id === listingId);
        if (data) setListing(data);
    }, [listingId]);

    const loadChatbox = () => {
        if (!isLoaded || !user) return toast('Please login to chat with seller');
        toast('Chat feature works after backend setup');
    };

    const purchaseAccount = () => {
        if (!user) return openSignIn();
        toast('Payment works after backend integration');
    };

    return listing ? (
        <div className='mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 '>

            <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-slate-600 py-5'>
                <ArrowLeftIcon className='size-4' /> Go to Previous Page
            </button>

            <div className='flex items-start max-md:flex-col gap-10'>

                <div className='flex-1 max-md:w-full'>

                    {/* TOP */}
                    <div className='bg-white rounded-xl border p-6 mb-5'>
                        <div className='flex justify-between'>

                            <div className='flex gap-3'>
                                <div className='p-2'>{platformIcons[listing.platform]}</div>

                                <div>
                                    <h2 className='flex items-center gap-2 text-xl font-semibold'>
                                        {listing.title}
                                        <Link to={profileLink} target='_blank'>
                                            <ArrowUpRightFromSquareIcon className='size-4' />
                                        </Link>
                                    </h2>

                                    <p className='text-sm text-gray-500'>
                                        @{listing.username} • {listing.platform}
                                    </p>

                                    <div className='flex gap-2 mt-2'>
                                        {listing.verified && (
                                            <span className='text-xs bg-indigo-50 px-2 py-1 rounded'>
                                                <CheckCircle2 className='w-3 h-3 inline' /> Verified
                                            </span>
                                        )}
                                        {listing.monetized && (
                                            <span className='text-xs bg-green-50 px-2 py-1 rounded'>
                                                <DollarSign className='w-3 h-3 inline' /> Monetized
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className='text-2xl font-bold'>
                                    {currency}{listing.price}
                                </h3>
                            </div>

                        </div>
                    </div>

                    {/* IMAGE SLIDER */}
                    <div className='bg-white rounded-xl border mb-5 overflow-hidden'>

                        <div className='relative w-full aspect-video'>

                            <div className='flex transition-transform'
                                style={{ transform: `translateX(-${current * 100}%)` }}>
                                {images.map((img, i) => (
                                    <img key={i} src={img} className='w-full' />
                                ))}
                            </div>

                            <button onClick={prevSlide} className='absolute left-3 top-1/2 bg-white p-2 rounded'>
                                <ChevronLeftIcon />
                            </button>

                            <button onClick={nextSlide} className='absolute right-3 top-1/2 bg-white p-2 rounded'>
                                <ChevronRightIcon />
                            </button>

                        </div>
                    </div>

                    {/* METRICS */}
                    <div className='bg-white rounded-xl border mb-5 p-4 grid grid-cols-2 md:grid-cols-4 text-center'>
                        <div>
                            <Users />
                            <p>{listing.followers_count}</p>
                        </div>
                        <div>
                            <LineChart />
                            <p>{listing.engagement_rate}%</p>
                        </div>
                        <div>
                            <Eye />
                            <p>{listing.monthly_views}</p>
                        </div>
                        <div>
                            <Calendar />
                            <p>{new Date(listing.createdAt).toDateString()}</p>
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className='bg-white rounded-xl border p-4 mb-5'>
                        {listing.description}
                    </div>

                    {/* DETAILS */}
                    <div className='bg-white rounded-xl border p-4 mb-5 grid grid-cols-2 gap-4'>
                        <p>Niche: {listing.niche}</p>
                        <p><MapPin /> {listing.country}</p>
                        <p>Age: {listing.age_range}</p>
                        <p>Status: {listing.status}</p>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className='bg-white rounded-xl border p-5 min-w-[300px]'>

                    <h4>Seller</h4>

                    <img src={listing.owner?.image} className='w-10 h-10 rounded-full' />

                    <p>{listing.owner?.name}</p>
                    <p>{listing.owner?.email}</p>

                    <button onClick={loadChatbox} className='w-full bg-indigo-600 text-white py-2 mt-3'>
                        Chat
                    </button>

                    <button onClick={purchaseAccount} className='w-full bg-purple-600 text-white py-2 mt-2'>
                        Purchase
                    </button>

                </div>

            </div>
        </div>

    ) : (
        <div className='h-screen flex justify-center items-center'>
            <Loader2Icon className='animate-spin' />
        </div>
    );
}