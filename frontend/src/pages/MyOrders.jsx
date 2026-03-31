import { useState } from 'react';
import { platformIcons, dummyOrders } from '../assets/assets';
import { CheckCircle2, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

const MyOrders = () => {
    const currency = import.meta.env.VITE_CURRENCY || '$';
    const [orders] = useState(dummyOrders);
    const [expandedId, setExpandedId] = useState(null);
    const [copiedField, setCopiedField] = useState(null);

    const mask = (val, type) => {
        if (!val && val !== 0) return '-';
        return type.toLowerCase() === 'password' ? '•'.repeat(8) : String(val);
    };

    const copy = async (txt, fieldName) => {
        try {
            await navigator.clipboard.writeText(txt);
            setCopiedField(fieldName);
            setTimeout(() => setCopiedField(null), 2000);
        } catch {
            // silently fail
        }
    };

    if (!orders.length) {
        return (
            <div className='px-4 md:px-16 lg:px-24 xl:px-32'>
                <div className='max-w-2xl mx-auto mt-14 bg-white rounded-xl border border-gray-200 p-8 text-center'>
                    <h3 className='text-lg font-semibold'>No orders yet</h3>
                    <p className='text-sm text-gray-500 mt-2'>You haven't purchased any listings yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='px-4 md:px-16 lg:px-24 xl:px-32 py-6'>
            <h2 className='text-2xl font-semibold mb-6'>My Orders</h2>

            <div className='space-y-4'>
                {orders.map((order) => {
                    const id = order.id;
                    const listing = order.listing;
                    const credential = order.credential;
                    const isExpanded = expandedId === id;

                    return (
                        <div key={id} className='bg-white rounded-lg border border-gray-200 p-5 flex flex-col max-w-4xl'>
                            <div className='flex items-start gap-4 flex-1'>
                                <div className='p-2 rounded-lg bg-gray-50 max-sm:hidden'>
                                    {platformIcons[listing.platform]}
                                </div>

                                <div className='flex-1'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <div>
                                            <h3 className='text-lg font-semibold'>{listing.title}</h3>
                                            <p className='text-sm text-gray-500 mt-1'>
                                                @{listing.username} • <span className='capitalize'>{listing.platform}</span>
                                            </p>

                                            <div className='flex gap-2 mt-2'>
                                                {listing.verified && (
                                                    <span className='flex items-center text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md'>
                                                        <CheckCircle2 className='w-3 h-3 mr-1' /> Verified
                                                    </span>
                                                )}
                                                {listing.monetized && (
                                                    <span className='flex items-center text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md'>
                                                        <span className='text-xs font-medium'>$</span> Monetized
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className='text-right'>
                                            <p className='text-2xl font-bold'>
                                                {currency}{Number(order.amount).toLocaleString()}
                                            </p>
                                            <p className='text-sm text-gray-500'>USD</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 items-end mt-3'>
                                <button
                                    onClick={() => setExpandedId((p) => (p === id ? null : id))}
                                    className='flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded hover:shadow text-sm'
                                    aria-expanded={isExpanded}
                                >
                                    {isExpanded ? (
                                        <><ChevronUp className='size-4' /> Hide Credentials</>
                                    ) : (
                                        <><ChevronDown className='size-4' /> View Credentials</>
                                    )}
                                </button>

                                <div className='text-xs text-gray-500 mt-1 text-right'>
                                    Credential Purchased: {format(new Date(order.createdAt), 'MMM d, yyyy')}
                                </div>
                            </div>

                            {isExpanded && (
                                <div className='mt-4 pt-4 border-t border-gray-100'>
                                    <div className='space-y-2'>
                                        {credential.updatedCredential.map((cred) => (
                                            <div
                                                key={cred.name}
                                                className='flex items-center justify-between gap-3 bg-gray-50 rounded-md p-2'
                                            >
                                                <div>
                                                    <p className='text-sm font-medium text-gray-800'>{cred.name}</p>
                                                    <p className='text-xs text-gray-500'>{cred.type}</p>
                                                </div>

                                                <div className='flex items-center gap-2'>
                                                    <code className='text-sm font-mono'>
                                                        {mask(cred.value, cred.type)}
                                                    </code>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copy(cred.value, cred.name);
                                                        }}
                                                        className={`px-2 py-1 text-xs border rounded hover:shadow flex items-center gap-1 transition-colors ${
                                                            copiedField === cred.name
                                                                ? 'bg-green-50 border-green-200 text-green-600'
                                                                : 'bg-white border-gray-200'
                                                        }`}
                                                        title='Copy credential'
                                                    >
                                                        <Copy className='size-4' />
                                                        {copiedField === cred.name && (
                                                            <span className='text-xs'>Copied!</span>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyOrders;