"use client";
import IUser from "../interface/User";
import Link from "next/link";
import { ChangeEvent } from "react";

export interface IAppProps {}

export default async function App(props: IAppProps) {
    const data: any = await fetch("http://localhost:3333/users");
    const users: IUser[] = await data.json();

    function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const input = document.getElementById("input_name");

        console.log(input);

        // console.log(name);
    }

    return (
        <>
            <div>
                {data &&
                    users.map((user: IUser) => {
                        return (
                            <>
                                <Link href={`/users/${user.id}`} key={user.id}>
                                    <h3>{user.name}</h3>
                                </Link>
                            </>
                        );
                    })}
            </div>
            <div className="mt-4">
                <h3>Create a new user</h3>
                <form onSubmit={handleSubmit}>
                    <input placeholder="name" id="input_name" />
                    <button type="submit" className="border py-1 px-2">
                        Create
                    </button>
                </form>
            </div>
        </>
    );
}
