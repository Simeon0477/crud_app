import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
    getEtudiant,
    updateEtudiant
} from '../api/etudiants'

export default function Update() {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const id = searchParams.get('id')

    const [etudiant, setEtudiant] = useState({
        nom: '',
        prenom: '',
        classe: '',
        age: ''
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    // Récupération de l'étudiant
    useEffect(() => {

        async function loadEtudiant() {

            try {
                setLoading(true)

                const response = await getEtudiant(id)

                setEtudiant(response.data)
                setError(null)

            } catch (error) {
                console.error(error)
                setError("Impossible de récupérer cet étudiant.")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            loadEtudiant()
        } else {
            setError("Aucun identifiant d'étudiant fourni.")
            setLoading(false)
        }

    }, [id])


    function handleChange(event) {

        const { name, value } = event.target

        setEtudiant({
            ...etudiant,
            [name]: value
        })
    }


    async function handleSubmit(event) {

        event.preventDefault()

        try {

            setSaving(true)
            setError(null)

            await updateEtudiant(id, {
                ...etudiant,
                age: Number(etudiant.age)
            })

            navigate('/students')

        } catch (error) {

            console.error(error)
            setError("Impossible de modifier l'étudiant.")

        } finally {

            setSaving(false)

        }
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sky-100">
                <p className="text-gray-600">
                    Chargement de l'étudiant...
                </p>
            </div>
        )
    }


    return (
        <div className="min-h-screen w-full bg-sky-300 px-4 py-10">

            <div className="mx-auto w-full max-w-xl">

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Modifier un étudiant
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Modification de l'étudiant #{id}
                        </p>
                    </div>

                    <Link
                        to="/students"
                        className="rounded-lg bg-gray-200 px-4 py-2
                                   text-sm font-semibold text-gray-700
                                   hover:bg-gray-300"
                    >
                        Retour
                    </Link>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white p-8 shadow-xl"
                >

                    {error && (
                        <div className="mb-5 rounded-lg bg-red-100 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}


                    <div className="space-y-5">

                        <div>
                            <label
                                htmlFor="nom"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Nom
                            </label>

                            <input
                                id="nom"
                                type="text"
                                name="nom"
                                value={etudiant.nom}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300
                                           px-4 py-3 outline-none transition
                                           focus:border-sky-500
                                           focus:ring-2 focus:ring-sky-200"
                            />
                        </div>


                        <div>
                            <label
                                htmlFor="prenom"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Prénom
                            </label>

                            <input
                                id="prenom"
                                type="text"
                                name="prenom"
                                value={etudiant.prenom}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300
                                           px-4 py-3 outline-none transition
                                           focus:border-sky-500
                                           focus:ring-2 focus:ring-sky-200"
                            />
                        </div>


                        <div>
                            <label
                                htmlFor="classe"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Classe
                            </label>

                            <input
                                id="classe"
                                type="text"
                                name="classe"
                                value={etudiant.classe}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300
                                           px-4 py-3 outline-none transition
                                           focus:border-sky-500
                                           focus:ring-2 focus:ring-sky-200"
                            />
                        </div>


                        <div>
                            <label
                                htmlFor="age"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Âge
                            </label>

                            <input
                                id="age"
                                type="number"
                                name="age"
                                value={etudiant.age}
                                onChange={handleChange}
                                min="1"
                                required
                                className="w-full rounded-lg border border-gray-300
                                           px-4 py-3 outline-none transition
                                           focus:border-sky-500
                                           focus:ring-2 focus:ring-sky-200"
                            />
                        </div>

                    </div>


                    <div className="mt-8 flex gap-3">

                        <Link
                            to="/students"
                            className="flex-1 rounded-lg border border-gray-300
                                       px-5 py-3 text-center font-semibold
                                       text-gray-700 hover:bg-gray-100"
                        >
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 rounded-lg bg-sky-500 px-5 py-3
                                       font-semibold text-white transition
                                       hover:bg-sky-600 disabled:cursor-not-allowed
                                       disabled:opacity-50"
                        >
                            {saving ? 'Modification...' : 'Enregistrer'}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}