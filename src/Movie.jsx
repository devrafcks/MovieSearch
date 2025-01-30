/* eslint-disable react/prop-types */
const MovieCard = ({ movie1 }) => {
    return (
        <div className="movie">
            <div>
                <p>⭐ {movie1.vote_average.toFixed(1)} / 10</p>
            </div>

            <div>
                <img
                    src={
                        movie1.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie1.poster_path}`
                            : "https://placehold.co/600x400/EEE/31343C"
                    }
                    alt={movie1.title}
                />
            </div>

            <div>
                <span> {movie1.release_date ? new Date(movie1.release_date).getFullYear() : "N/A"}</span>
                <h3>{movie1.title}</h3>
            </div>
        </div>
        
    );
};

export default MovieCard;
