import { useState, useEffect } from "react";
import "./App.css";
import FooterLink from "./Footer";

import SearchIcon from "./assets/search.svg";
import MovieCard from "./Movie";

const API_KEY = "ee9f47eb4590fb599d346fa5bc8f2271";
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR`;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // Função para buscar filmes da API
    const fetchMovies = async (title) => {
        if (!title.trim()) return; // Se o input estiver vazio, não faz a busca

        setLoading(true);
        const url = `${API_URL}&query=${title}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
            
            const data = await response.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        } finally {
            setLoading(false);
        }
    };

    // Executa a busca ao pressionar Enter no input
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            fetchMovies(searchTerm);
        }
    };

    useEffect(() => {
        fetchMovies("one piece"); // Busca inicial
    }, []);

    return (
        <div className="app">
            <h1>MovieSearch</h1>

            <div className="search">
                <input
                    type="text"
                    placeholder="Pesquise seu filme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress} // Captura a tecla pressionada
                />
                <img src={SearchIcon} alt="Buscar" onClick={() => fetchMovies(searchTerm)} />
            </div>

            {/* Exibe um loading enquanto os filmes carregam */}
            {loading && <p className="whiteText">Carregando...</p>}

            <div className="container">
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.id} movie1={movie} />)
                ) : (
                    !loading && <p className="whiteText">Nenhum filme encontrado.</p>
                )}
            </div>

            <footer className="footer">
                <FooterLink />
            </footer>
        </div>
    );
};

export default App;
