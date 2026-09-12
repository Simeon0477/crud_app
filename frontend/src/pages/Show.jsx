import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    getEtudiants,
    getEtudiant,
    deleteEtudiant
} from '../api/etudiants'

export default function Show() {

    const [etudiants, setEtudiants] = useState([])
    const [selectedEtudiant, setSelectedEtudiant] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function loadEtudiants() {
        try {
            setLoading(true)

            const response = await getEtudiants()

            setEtudiants(response.data)
            setError(null)

        } catch (error) {
            console.error(error)
            setError("Impossible de récupérer les étudiants.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadEtudiants()
    }, [])

    async function handleShow(id) {
        try {
            const response = await getEtudiant(id)

            setSelectedEtudiant(response.data)

        } catch (error) {
            console.error(error)
            setError("Impossible de récupérer cet étudiant.")
        }
    }

    async function handleDelete(id) {

        const confirmation = window.confirm(
            "Voulez-vous vraiment supprimer cet étudiant ?"
        )

        if (!confirmation) {
            return
        }

        try {

            await deleteEtudiant(id)

            loadEtudiants()

        } catch (error) {
            console.error(error)
            setError("Impossible de supprimer cet étudiant.")
        }
    }

    return (
        <div className="min-h-screen w-full bg-sky-300 px-4 pt-20">

            <div className="mx-auto w-full max-w-7xl">

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Liste des étudiants
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Consultez et gérez les étudiants.
                        </p>
                    </div>

                    <Link
                        to="/create"
                        className="rounded-lg bg-sky-500 px-5 py-3
                                   font-semibold text-white shadow-md
                                   transition hover:bg-sky-600"
                    >
                        + Ajouter
                    </Link>

                </div>

                {error && (
                    <div className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[850px]">

                            <thead className="bg-sky-500 text-white">

                                <tr>
                                    <th className="px-6 py-4 text-left">#</th>
                                    <th className="px-6 py-4 text-left">Matricule</th>
                                    <th className="px-6 py-4 text-left">Nom</th>
                                    <th className="px-6 py-4 text-left">Prénom</th>
                                    <th className="px-6 py-4 text-left">Classe</th>
                                    <th className="px-6 py-4 text-center" colSpan="3">
                                        Opérations
                                    </th>
                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {loading ? (

                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            Chargement...
                                        </td>
                                    </tr>

                                ) : etudiants.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            Aucun étudiant enregistré.
                                        </td>
                                    </tr>

                                ) : (

                                    etudiants.map((etudiant, ind) => (

                                        <tr
                                            key={etudiant.id}
                                            className="transition hover:bg-sky-50"
                                        >

                                            <td className="px-6 py-4">
                                                {ind + 1}
                                            </td>

                                            <td className="px-6 py-4">
                                                {etudiant.matricule} 
                                            </td>

                                            <td className="px-6 py-4 font-medium">
                                                {etudiant.nom}
                                            </td>

                                            <td className="px-6 py-4">
                                                {etudiant.prenom}
                                            </td>

                                            <td className="px-6 py-4">
                                                {etudiant.classe}
                                            </td>

                                            <td className="px-6 py-4 text-center">

                                                <button
                                                    onClick={() => handleShow(etudiant.id)}
                                                    className="rounded-lg bg-sky-100 px-4 py-2
                                                               text-sm font-semibold text-sky-700
                                                               hover:bg-sky-200"
                                                >
                                                    Voir
                                                </button>

                                            </td>

                                            <td className="px-6 py-4 text-center">

                                                <Link
                                                    to={`/update?id=${etudiant.id}`}
                                                    className="rounded-lg bg-amber-100 px-4 py-2
                                                               text-sm font-semibold text-amber-700
                                                               hover:bg-amber-200"
                                                >
                                                    Modifier
                                                </Link>

                                            </td>

                                            <td className="px-6 py-4 text-center">

                                                <button
                                                    onClick={() => handleDelete(etudiant.id)}
                                                    className="rounded-lg bg-red-100 px-4 py-2
                                                               text-sm font-semibold text-red-700
                                                               hover:bg-red-200"
                                                >
                                                    Supprimer
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* Modal étudiant */}
            {selectedEtudiant && (

                <div className="fixed inset-0 z-50 flex items-center justify-center
                                bg-black/50 px-4">

                    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                        <div className="mb-6 flex items-center justify-between">

                            <h2 className="text-2xl font-bold text-gray-800">
                                Informations
                            </h2>

                            <button
                                onClick={() => setSelectedEtudiant(null)}
                                className="text-2xl text-gray-400 hover:text-gray-700"
                            >
                                ×
                            </button>

                        </div>

                        <div className="space-y-4">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Matricule
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {selectedEtudiant.matricule}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Nom
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {selectedEtudiant.nom}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Prénom
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {selectedEtudiant.prenom}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Classe
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {selectedEtudiant.classe}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Sexe
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {selectedEtudiant.sexe === 'M' ? 'Masculin' : 'Feminin'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Âge
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {selectedEtudiant.age} ans
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() => setSelectedEtudiant(null)}
                            className="mt-8 w-full rounded-lg bg-sky-500 px-5 py-3
                                       font-semibold text-white hover:bg-sky-600"
                        >
                            Fermer
                        </button>

                    </div>

                </div>

            )}

        </div>
    )
}