import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = (params) => {
    const request = axios
        .get(baseURL)
    return request.then(response => response.data)
}

const createPerson = newPerson => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    console.log(baseURL + `/${id}`)
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => console.log(response.data))
}

const updatePerson = (person) => {
    const request = axios.put(`${baseURL}/${person.id}`, person)
    return request.then(response => response.data)
}

export default {getAll, createPerson, deletePerson, updatePerson}
