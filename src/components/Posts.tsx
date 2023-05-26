import {VscBug} from 'react-icons/vsc'

const Post = () => {
    return <button className="btn" onClick={(e) => {
        e.preventDefault()
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => console.log(data))  
            .catch(error => console.error(error)
            )

    }} >
        <VscBug/>
        Traer Datos
    </button>
{/*Modulo de practica de Fetch*/}
}
export default Post;
