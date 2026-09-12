import {Link} from 'react-router-dom'

export default function Navbar(){
    return (
        <nav className='fixed top-0 left-0 w-full z-50'>
            <div className='bg-white shadow-md w-full'>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        CRUD
                    </Link>

                    <div className="flex items-center gap-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Accueil
                        </Link>

                        <Link
                            to="/create"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Ajouter
                        </Link>

                        <Link
                            to="/show"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Afficher
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}