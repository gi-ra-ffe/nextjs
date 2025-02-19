'use client';

import { useLikes } from './LikesContext';

export default function LikeButton() {
    const {likes, setLikes} = useLikes();
    function handleClick() {
        setLikes(likes + 1);
    }
    return <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2' onClick={handleClick}>Like({likes})</button>;
}
