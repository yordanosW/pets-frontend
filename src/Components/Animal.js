import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"

function Animal() {
    const [animal, setAnimal] = useState(null)

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const url = `${process.env.REACT_APP_BACKEND_URL}/animals/${id}`
            const response = await fetch(url)
            const data = await response.json()
            setAnimal(data)
        }

        fetchData()
    }, [id])

    const deleteAnimal = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/animals/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
        })
        if (response.status !== 200) console.log('ERROR deleting animal') // better error handling needed
        navigate('/')
    }

    const display = animal && (
        <div>
            <img src={animal.profilePicture} alt='animal' height={'100px'} />
            <h2>name: {animal.name}</h2>
            <h3>age: {animal.age}</h3>
            <h3>species: {animal.species}</h3>
            <p>description: {animal.description}</p>
            <button onClick={deleteAnimal}>Delete</button>
            <button><Link to={`/animal/update/${id}`}>Update</Link></button>
        </div>
    )

    return (
        <div>
            {display}
        </div>
    )
}

export default Animal