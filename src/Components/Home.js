import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [animals, setAnimals] = useState([])

    useEffect(() => {
        async function fetchData() {
            const url = `${process.env.REACT_APP_BACKEND_URL}/animals/all`
            const response = await fetch(url)
            const data = await response.json()
            setAnimals(data)
        }

        fetchData()
    }, [])

    const display = animals && animals.map(animal => {
        return (
            <div key={animal._id}>
                <Link to={`/animal/${animal._id}`}>{animal.name}</Link>
            </div>
        )
    })
    return (
        <div>
            {display}
        </div>
    )
}

export default Home