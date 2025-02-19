'use client';

import { useLikes } from './LikesContext';

export default function ResetButton() {
    const {setLikes} = useLikes();
    function handleClick() {
        setLikes(0);
    }
    return <button className='bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2' onClick={handleClick}>Reset</button>;
}