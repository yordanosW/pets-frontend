import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdateAnimal() {
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
    const handleChange = (e) => {
        setAnimal({
            ...animal,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        animal.age = Number(animal.age)
        const url = `${process.env.REACT_APP_BACKEND_URL}/animals/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(animal)
        })

        if (response.status !== 200) console.log('ERROR:') // add error handling here
        navigate('/')
    }

    const display = animal && (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={animal.name} name='name' placeholder='name' />
            <input onChange={handleChange} type='number' value={animal.age} name='age' placeholder='age' />
            <select name='species' onChange={handleChange} defaultValue={animal.species}>
                <option value='cat'>cat</option>
                <option value='dog'>dog</option>
            </select>
            <input onChange={handleChange} value={animal.profilePicture} name='profilePicture' placeholder='profile picture' />
            <input type="textarea" onChange={handleChange} value={animal.description} name='description' placeholder='description' />
            <input type="submit" />
        </form>
    )

    return (
        <div>
            {display}
        </div>
    )
}

export default UpdateAnimal