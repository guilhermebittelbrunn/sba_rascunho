import { useRouter } from 'next/router';

function Usuario() {
    const router = useRouter();
    const id = router.query.id;

    return (
        <>
            <h3>Produto {id}</h3>
        </>
    );
}

export default Usuario;
