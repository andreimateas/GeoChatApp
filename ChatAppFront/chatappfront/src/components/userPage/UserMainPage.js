import React from 'react';
import { useAuthContext } from '../../auth/AuthProvider';

export default function UserMainPage() {
    const { userProfile } = useAuthContext();


    return (
        <div>
            <h1>Welcome, {userProfile.username}!</h1>
        </div>
    );
}