import { useRouter } from 'next/router';

// this page would be the details about the pet
export default function pet() {
    const router = useRouter();
    console.log(router.query);
    return <h2>{router.query.person}'s {router.query.pet}</h2>
}