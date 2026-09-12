import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:8000"
})

export function getEtudiants() {
    return API.get("/etudiants/")
}

export function getEtudiant(id) {
    return API.get(`/etudiants/${id}`)
}

export function createEtudiant(data) {
    return API.post("/etudiants/", data)
}

export function updateEtudiant(id, data) {
    return API.put(`/etudiants/${id}`, data)
}

export function deleteEtudiant(id) {
    return API.delete(`/etudiants/${id}`)
}