'use client';
import { useState } from 'react';

export default function Home() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Hello by next-app!</h1>
            <button
                onClick={() => setCount(count + 1)}
                className="mt-4 bg-slate-400 text-black p-2 transition-all hover:bg-slate-500"
            >
                Clicked {count} times
            </button>
        </>
    );
}
