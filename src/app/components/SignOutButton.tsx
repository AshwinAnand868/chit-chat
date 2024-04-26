'use client';

import { Loader2, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ButtonHTMLAttributes, FC, useState } from 'react';
import toast from 'react-hot-toast';
import Button from './ui/Button';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }: SignOutButtonProps) => {
    const [isSigningOut, setisSigningOut] = useState<boolean>(false);

    return (
        <Button {...props} variant='ghost' disabled={isSigningOut} onClick={async () => {
            setisSigningOut(true);

            try {
                await signOut();
            } catch (error) {
                toast.error('There was a problem signing out')
            } finally {
                setisSigningOut(false);
            }
        }}>

            {isSigningOut ? (
                <Loader2 className='animate-spin h-4 w-4' />
            ) : (
                <LogOut className='w-4 h-4' />
            )}
        </Button>
    )
}

export default SignOutButton