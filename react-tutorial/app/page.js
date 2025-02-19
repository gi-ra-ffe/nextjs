import LikeButton from './like-button';
import ResetButton from './reset-button';
import { LikesProvider } from './LikesContext';

function Header({ title }) {
    return <h1 className='text-2xl/7 font-bold text-gray-900'>{title ? title : 'Default title'}</h1>;
}
export default function HomePage() {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    return (
        <LikesProvider>
            <div>
                {/* Nesting the Header component */}
                <Header title="Develop. Preview. Ship." />
                <ul className='mt-5 ml-5 mb-5 list-disc'>
                    {names.map((name) => ( // array.map()メソッドを使用して配列を反復処理
                        <li key={name}>{name}</li> // keyはID のようにユニークなものであったほうがいい
                    ))}
                </ul>
                <LikeButton />
                <ResetButton />
            </div>
        </LikesProvider>
    );
}