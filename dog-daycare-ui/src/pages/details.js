import Link from 'next/link';

const people = [
    {pet: 'dog', name: 'Kristen'},
    {pet: 'snake', name: 'Zeke'},
    {pet: 'cat', name: 'Josie'}
]

export default function details() {
    return <div>
        {people.map( e => (
            <div>
                <Link as={`/${e.name}/${e.pet}`} href="/[person]/[pet]">
                    <a>{e.name}'s {e.pet}</a>
                </Link>
            </div>
        ))}
        
    </div>
}