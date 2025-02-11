// import { useRouter } from "next/router";
// import { GetServerSideProps } from "next";

// import Link from "next/link";
// import Image from "next/image";
// import styles from "@/styles/Home.module.css";

// // product の型定義
// interface Product {
//     id: string;
//     name: string;
//     image: string;
// }
// // SSG : 一度だけデータを取る
// // export async function getStaticProps({params}){
// //     // const req = await fetch(`http://localhost:3000/public/${params.id}.json`); // fetch: 取得
// //     const req = await fetch(`http://localhost:3000/${params.id}.json`); // fetch: 取得
// //     const data = await req.json();

// //     return {
// //         props: {
// //             product: data,
// //         }
// //     }
// // };
// // export async function getStaticPaths({params}){
// //     const req = await fetch(`http://localhost:3000/products.json`); // fetch: 取得
// //     const data = await req.json();

// //     const paths = data.map(product => {
// //         return{
// //             params: {
// //                 id: product,
// //             }
// //         }
// //     });

// //     return {
// //         paths,
// //         fallback: false,
// //     }
// // };

// // SSR : リクエストしたときにレンダリングする
// export const  getServerSideProps: GetServerSideProps= async (context) => {
//     const { params } = context;
//     if (!params || typeof params.id !== "string") {
//         return { notFound: true }; // idが無効な場合は404ページ
//     }

//     // const req = await fetch(`http://localhost:3000/public/${params.id}.json`); // fetch: 取得
//     const req = await fetch(`http://localhost:3000/${params.id}.json`); // fetch: 取得
//     const data = await req.json();

//     return {
//         props: {
//             product: data,
//         }
//     }
// };

// // Product コンポーネントに型定義
// interface ProductPageProps {
//     product: Product;
// }

// const Product = ({ product }: ProductPageProps) => {
//     const router = useRouter();
//     const  {id} = router.query;
//     return (
//         <div className={styles.container}>
//             <main className={styles.main}>
//                 <h1>{id}のページです</h1>
//                 <Image src={product.image} width={300} height={400} alt={product.name}/>
//                 <p>{product.name}</p>
//                 <br />
//                 <Link href="/products">商品一覧へ</Link>
//             </main>
//         </div>
//     );
// }

// export default Product;

import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
export async function getServerSideProps({ params }) {
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: { product: data },
    };
}

const Product = ({ product }) => {
    const router = useRouter();
    const { id } = router.query;

    //   console.log(id);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>{id}のページです</h1>
                <img src={product.image} width="300" height="400" />
                <p>{product.name}</p>
                <br />
                <Link href="/products">
                    <a>商品一覧へ</a>
                </Link>
            </main>
        </div>
    );
};

export default Product;