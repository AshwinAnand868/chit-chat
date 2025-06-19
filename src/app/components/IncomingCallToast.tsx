'use client';

import { useGetCallById } from '@/hooks/useGetCallById';
import { useRouter } from 'next/navigation';
import toast, { Toast } from 'react-hot-toast';

interface IncomingCallToastProps {
    t: Toast; // React Hot Toast's toast instance
    callId: string;
    chatId: string;
    calleeId: string;
}

const IncomingCallToast = ({ t, callId, chatId, calleeId }: IncomingCallToastProps) => {

    const router = useRouter();
    console.log(calleeId);

    const { call, isCallLoading} = useGetCallById(callId);
    if(isCallLoading || !call) {
        return "Loading Call";
    }

    const handleAccept = () => {
        toast.dismiss(t.id);
        router.push(`/dashboard/chat/${chatId}/meeting/${callId}?setUpComplete=true`);
        // return <MeetingRoom />  
    }

    const handleReject = async () => {
        await call.leave({ reject: true });
        toast.dismiss(t.id);
    }

    return (
        <div className='flex flex-col items-center shadow-lg rounded p-4 bg-white z-[1000]'>
            <h3 className='text-lg font-semibold'>Incoming Call</h3>
            <div className='flex w-full justify-between gap-10 mt-2'>
                <button onClick={handleAccept} className='bg-green-500 rounded-md text-white px-4 py-2'>Accept</button>
                <button onClick={handleReject} className='bg-red-500 rounded-md text-white px-4 py-2'>Reject</button>
            </div>
        </div>
    )
}

export default IncomingCallToast;
