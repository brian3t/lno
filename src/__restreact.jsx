import React from "react";
import {useGet, useMutate} from "restful-react";

const base = "https://jsonplaceholder.typicode.com";

const ListItem = ({ id, children }) => {
    const { mutate: del, loading } = useMutate({
        verb: "DELETE",
        path: `/posts/`,
        base,
    });

    return (
        <li key={id}>
            {loading ? (
                "Deleting..."
            ) : (
                <button onClick={() => del(id).then(() => alert("Deleted successfully. Pretend it got removed from the DOM."))}>
                    ❌
                </button>
            )}
            &nbsp;{children}
        </li>
    );
};

const MyHugeList = () => {
    const { data: posts } = useGet({
        path: "/posts",
        base,
    });
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts &&
                posts.map(post => (
                    <ListItem key={post.id} id={post.id}>
                        {post.title}
                    </ListItem>
                ))}
            </ul>
        </div>
    );
};
export default MyHugeList;
