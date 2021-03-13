import {useGet} from "restful-react"

const SearchThis = props => {
    const { data } = useGet({
        path: "http://localhost:3000/test.json",
        debounce: 2000,
    });

    return (
        <div>
            <h1>Here's all the things I search</h1>
            <ul>
                {data && (typeof data === 'object') && data.map(thing => (
                    <li>{thing}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchThis
