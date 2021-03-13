import React from "react";
import {useGet, useMutate} from "restful-react";

const base = "https://jsonplaceholder.typicode.com";

const Apost = ({post, id, children}) => {
    const {mutate: del, loading} = useMutate({verb: 'DELETE', path: 'posts', base})
    return <li>
        {loading? 'Deleting..' : <button onClick={() => {
            del(id).then(() => alert('done delete'))
        }}>X
        </button>}
        &nbsp;
        {/*<Mutate verb={"PATCH"} children={()=>{console.log(`mutate`)}}/>*/}
        {post.title}
        <br/>{post.body.substr(0, 20)}</li>
}

const MyHugeList = () => {
    const {data: posts} = useGet({
        base,
        path: '/posts'
    })
    return <ol>
        {posts && posts.map(post => (<Apost post={post} key={post.id} id={post.id}> </Apost>)
        )}
    </ol>
}

export default MyHugeList;
