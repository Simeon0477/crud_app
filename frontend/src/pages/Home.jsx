import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen w-full bg-sky-400 px-6 pt-16">

            <div className="mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center">

                {/* En-tête */}
                <div className="mb-10 text-center">
                    <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                        Gestion scolaire
                    </span>

                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Gestion des étudiants
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-sky-50">
                        Une application simple et efficace pour gérer les étudiants,
                        leurs informations et leur parcours scolaire.
                    </p>
                </div>

                {/* Carte principale */}
                <div className="rounded-2xl bg-white p-8 shadow-2xl md:p-10">

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Tableau de bord
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Gérez facilement les informations de vos étudiants.
                        </p>
                    </div>

                    {/* Statistiques */}
                    <div className="grid gap-4 sm:grid-cols-3">

                        <div className="rounded-xl bg-sky-50 p-5">
                            <p className="text-sm font-medium text-gray-500">
                                Étudiants
                            </p>

                            <p className="mt-2 text-3xl font-bold text-sky-600">
                                0
                            </p>
                        </div>

                        <div className="rounded-xl bg-green-50 p-5">
                            <p className="text-sm font-medium text-gray-500">
                                Classes
                            </p>

                            <p className="mt-2 text-3xl font-bold text-green-600">
                                0
                            </p>
                        </div>

                        <div className="rounded-xl bg-purple-50 p-5">
                            <p className="text-sm font-medium text-gray-500">
                                Dernière action
                            </p>

                            <p className="mt-2 text-lg font-bold text-purple-600">
                                Aucune
                            </p>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">

                        <Link to="/create"
                            className="rounded-xl bg-sky-500 px-6 py-4
                                       font-semibold text-white
                                       shadow-md transition
                                       hover:bg-sky-600 hover:shadow-lg
                                       active:scale-[0.98]"
                        >
                            + Ajouter un étudiant
                        </Link>

                        <Link to="/show"
                            className="rounded-xl border-2 border-gray-200
                                       px-6 py-4 font-semibold text-gray-700
                                       transition hover:border-sky-500
                                       hover:text-sky-500
                                       active:scale-[0.98]"
                        >
                            Voir les étudiants
                        </Link>

                    </div>

                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-sky-100">
                    Application CRUD • Gestion des étudiants
                </p>

            </div>
        </div>
    );
}
