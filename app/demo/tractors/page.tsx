import React from 'react';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

const TractorsPage = () => {
    return ( 
        <div className='p-6'>
            <Link href="/seller/create">
            <Button>
                New Tractor
           </Button>
            </Link>
            
        </div>
    );
}

export default TractorsPage;
