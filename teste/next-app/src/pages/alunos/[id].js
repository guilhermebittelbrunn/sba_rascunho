export async function getServerSideProps(context) {
    const { id } = context.query;

    return { props: { id } };
}

function Alunos({ id }) {
    return (
        <>
            <h3>Aluno: {id}</h3>
        </>
    );
}

export default Alunos;
