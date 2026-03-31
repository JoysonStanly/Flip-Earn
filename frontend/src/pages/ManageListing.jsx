import { useState, useEffect } from 'react';
import { Loader2Icon, Upload } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyListings } from '../assets/assets';

const ManageListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loadingListing, setLoadingListing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        platform: '',
        username: '',
        followers_count: '',
        engagement_rate: '',
        monthly_views: '',
        niche: '',
        price: '',
        description: '',
        verified: false,
        monetized: false,
        country: '',
        age_range: '',
        images: [],
    });

    const platforms = ['youtube', 'instagram', 'tiktok', 'facebook', 'twitter', 'linkedin', 'pinterest', 'snapchat', 'twitch', 'discord'];
    const niches = ['lifestyle', 'fitness', 'food', 'travel', 'tech', 'gaming', 'fashion', 'beauty', 'business', 'education', 'entertainment', 'music', 'art', 'sports', 'health', 'finance', 'other'];
    const ageRanges = ['13-17 years', '18-24 years', '25-34 years', '35-44 years', '45-54 years', '55+ years', 'Mixed ages'];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;

        if (files.length + formData.images.length > 5) {
            setErrors(['You can add up to 5 images']);
            return;
        }

        setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
        setErrors([]);
    };

    const removeImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== indexToRemove),
        }));
    };

    // Load listing data in edit mode
    useEffect(() => {
        if (!id) return;

        setIsEditing(true);
        setLoadingListing(true);

        const listing = dummyListings.find((listing) => listing.id === id);
        if (listing) {
            setFormData(listing);
            setLoadingListing(false);
        } else {
            setErrors(['Listing not found']);
            navigate('/my-listings');
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = [];

        if (!formData.title.trim()) newErrors.push('Listing title is required');
        if (!formData.platform) newErrors.push('Platform is required');
        if (!formData.username.trim()) newErrors.push('Username is required');
        if (!formData.niche) newErrors.push('Niche is required');
        if (!formData.followers_count) newErrors.push('Followers count is required');
        if (!formData.price) newErrors.push('Price is required');
        if (!formData.description.trim()) newErrors.push('Description is required');

        if (newErrors.length > 0) {
            setErrors(newErrors);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setErrors([]);
        setSubmitted(true);
    };

    if (loadingListing) {
        return (
            <div className='h-screen flex items-center justify-center'>
                <Loader2Icon className='size-7 animate-spin text-indigo-600' />
            </div>
        );
    }

    if (submitted) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='flex flex-col items-center gap-4 text-center p-10'>
                    <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
                        <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                    </div>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        {isEditing ? 'Listing Updated!' : 'Listing Created!'}
                    </h2>
                    <p className='text-gray-500'>
                        {isEditing
                            ? 'Your listing has been successfully updated.'
                            : 'Your listing has been successfully created.'}
                    </p>
                    <button
                        onClick={() => navigate('/my-listings')}
                        className='mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg'
                    >
                        Go to My Listings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen py-8'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        {isEditing ? 'Edit Listing' : 'List Your Account'}
                    </h1>
                    <p className='text-gray-600 mt-2'>
                        {isEditing ? 'Update your existing account listing' : 'Create a mock listing to display your account info'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-8'>

                    {/* Error Messages */}
                    {errors.length > 0 && (
                        <div className='bg-red-50 border border-red-200 rounded-md p-4'>
                            {errors.map((err, i) => (
                                <p key={i} className='text-sm text-red-600'>{err}</p>
                            ))}
                        </div>
                    )}

                    {/* BASIC INFO */}
                    <Section title='Basic Information'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <InputField label='Listing Title *' value={formData.title} placeholder='e.g., Premium Travel Instagram Account' onChange={(v) => handleInputChange('title', v)} required={true} />
                            <SelectField label='Platform *' options={platforms} value={formData.platform} onChange={(v) => handleInputChange('platform', v)} required={true} />
                            <InputField label='Username/Handle *' value={formData.username} placeholder='@username' onChange={(v) => handleInputChange('username', v)} required={true} />
                            <SelectField label='Niche/Category *' options={niches} value={formData.niche} onChange={(v) => handleInputChange('niche', v)} required={true} />
                        </div>
                    </Section>

                    {/* METRICS */}
                    <Section title='Account Metrics'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                            <InputField label='Followers Count *' type='number' min={0} value={formData.followers_count} placeholder='10000' onChange={(v) => handleInputChange('followers_count', v)} required={true} />
                            <InputField label='Engagement Rate (%)' type='number' min={0} max={100} placeholder='4' value={formData.engagement_rate} onChange={(v) => handleInputChange('engagement_rate', v)} />
                            <InputField label='Monthly Views/Impressions' type='number' min={0} placeholder='100000' value={formData.monthly_views} onChange={(v) => handleInputChange('monthly_views', v)} />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                            <InputField label='Primary Audience Country' value={formData.country} placeholder='United States' onChange={(v) => handleInputChange('country', v)} />
                            <SelectField label='Primary Audience Age Range' options={ageRanges} value={formData.age_range} onChange={(v) => handleInputChange('age_range', v)} />
                        </div>

                        <div className='space-y-3'>
                            <CheckboxField label='Account is verified on the platform' checked={formData.verified} onChange={(v) => handleInputChange('verified', v)} />
                            <CheckboxField label='Account is monetized' checked={formData.monetized} onChange={(v) => handleInputChange('monetized', v)} />
                        </div>
                    </Section>

                    {/* PRICING */}
                    <Section title='Pricing & Description'>
                        <InputField label='Asking Price (USD) *' type='number' min={0} value={formData.price} placeholder='2500.00' onChange={(v) => handleInputChange('price', v)} required={true} />
                        <TextareaField label='Description *' value={formData.description} onChange={(v) => handleInputChange('description', v)} required={true} />
                    </Section>

                    {/* IMAGES */}
                    <Section title='Screenshots & Proof'>
                        <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
                            <input id='images' type='file' multiple accept='image/*' onChange={handleImageUpload} className='hidden' />
                            <Upload className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                            <button
                                type='button'
                                onClick={() => document.getElementById('images').click()}
                                className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50'
                            >
                                Choose Files
                            </button>
                            <p className='text-sm text-gray-500 mt-2'>Upload screenshots or proof of account analytics (max 5)</p>
                        </div>

                        {formData.images.length > 0 && (
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
                                {formData.images.map((img, index) => (
                                    <div key={index} className='relative'>
                                        <img
                                            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                                            alt={`image ${index + 1}`}
                                            className='w-full h-24 object-cover rounded-lg'
                                        />
                                        <button
                                            type='button'
                                            onClick={() => removeImage(index)}
                                            className='absolute -top-2 -right-2 size-6 bg-red-600 text-white rounded-full hover:bg-red-700'
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Section>

                    <div className='flex justify-end gap-3 text-sm'>
                        <button
                            onClick={() => navigate(-1)}
                            type='button'
                            className='px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
                        >
                            {isEditing ? 'Update Listing' : 'Create Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/* --- Common Elements --- */
const Section = ({ title, children }) => (
    <div className='bg-white rounded-lg border border-gray-200 p-6 space-y-6'>
        <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
        {children}
    </div>
);

const InputField = ({ label, value, onChange, placeholder, type = 'text', required = false, min = null, max = null }) => (
    <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
        <input
            type={type}
            min={min}
            max={max}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className='w-full px-3 py-1.5 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300'
            required={required}
        />
    </div>
);

const SelectField = ({ label, options, value, onChange, required = false }) => (
    <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className='w-full px-3 py-1.5 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300'
            required={required}
        >
            <option value=''>Select...</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

const TextareaField = ({ label, value, onChange, required = false }) => (
    <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
        <textarea
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className='w-full px-3 py-1.5 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300'
            required={required}
        />
    </div>
);

const CheckboxField = ({ label, checked, onChange }) => (
    <label className='flex items-center space-x-2 cursor-pointer'>
        <input
            type='checkbox'
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className='size-4'
        />
        <span className='text-sm text-gray-700'>{label}</span>
    </label>
);

export default ManageListing;