import Link from "next/link";

export default async function Home() {
    return (
        <>
            <h1>Hello world by Next JS App!</h1>
            <div className="flex flex-col gap-3 w-36">
                <Link href="/teste" className="text-blue-400 border rounded-md px-2 py-1">
                    Teste page
                </Link>
                <Link href="/users" className="text-blue-400 border rounded-md px-2 py-1">
                    User page
                </Link>
            </div>
        </>
    );
}
