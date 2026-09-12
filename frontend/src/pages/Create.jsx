import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createEtudiant } from '../api/etudiants'

export default function Create() {

    const navigate = useNavigate()

    const [etudiant, setEtudiant] = useState({
        matricule: '',
        nom: '',
        prenom: '',
        sexe: '',
        classe: '',
        age: ''
    })

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)


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

            await createEtudiant({
                ...etudiant,
                age: Number(etudiant.age)
            })

            navigate('/students')

        } catch (error) {

            console.error(error)
            setError("Impossible de créer l'étudiant.")

        } finally {

            setSaving(false)

        }
    }


    return (
        <div className="min-h-screen w-full bg-sky-300 px-4 pt-20">

            <div className="mx-auto w-full max-w-xl">

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Ajouter un étudiant
                        </h1>

                        <p className="mt-1 text-sm text-gray-700">
                            Enregistrement d'un nouvel étudiant
                        </p>
                    </div>

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
                                htmlFor="matricule"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Matricule
                            </label>

                            <input
                                id="matricule"
                                type="text"
                                name="matricule"
                                value={etudiant.matricule}
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
                                htmlFor="sexe"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Sexe
                            </label>

                            <select
                                id="sexe"
                                name="sexe"
                                value={etudiant.sexe}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300
                                           bg-white px-4 py-3 outline-none transition
                                           focus:border-sky-500
                                           focus:ring-2 focus:ring-sky-200"
                            >
                                <option value="">
                                    Sélectionner le sexe
                                </option>

                                <option value="M">
                                    Masculin
                                </option>

                                <option value="F">
                                    Féminin
                                </option>
                            </select>
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
                            {saving ? 'Création...' : 'Enregistrer'}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}