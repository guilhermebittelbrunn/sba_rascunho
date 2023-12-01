import Link from "next/link";
import IUser from "../../interface/User";

async function getUser(id: string) {
    const data: any = await fetch(`http://localhost:3333/users/${id}`);
    const user: IUser = await data.json();

    return user;
}

export default async function User({ params }: { params: { id: string } }) {
    const { id } = params;
    const user: IUser = await getUser(id);

    return (
        <>
            <h3>User page</h3>
            <p>Name: {user.name}</p>
            <Link href="/users">Go back</Link>
        </>
    );
}
