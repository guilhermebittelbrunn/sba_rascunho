function ListItems(prop) {
    return (
        <>
            {prop.list.map((item, k) => {
                return (
                    <li key={k} id={k}>
                        {item}
                    </li>
                );
            })}
        </>
    );
}

export default ListItems;
