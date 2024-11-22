import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import commonStyles from "../commonStyles";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";

function GIF() {
    const containerRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [gridWidth, setGridWidth] = useState("");

    // Setting GIF container width.
    useEffect(() => {
        setGridWidth(containerRef.current.offsetWidth);
    }, []);

    // Fetching GIFs
    const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
    const fetchGifs = async (offset) => {
        if (searchTerm) {
            return await gf.search(searchTerm, { offset: offset, limit: 10 });
        } else {
            return await gf.trending({ offset: offset, limit: 10 });
        }
    };

    // What happens when user clicks on any paticular GIF.
    const handleOnGifClick = (gif, event) => {
        event.preventDefault();
    };

    // Debounce Functionality
    function debounce(func, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }

    // Debounce Fetch Gifs
    const debounceFetchGifs = useCallback(debounce(fetchGifs, 500), []);

    return (
        <div className={`px-4 pb-4`}>
            <input
                ref={containerRef}
                type="text"
                className={`w-full ${commonStyles.inputBackground} text-black dark:text-white outline-none border-2 border-transparent focus-within:border-primary h-10 rounded-full text-sm px-4 tracking-wide mb-4`}
                placeholder="Search for GIF"
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                    debounceFetchGifs(); // offset: 0
                }}
            />

            <div className="h-40 overflow-auto no-scrollbar">
                <Grid
                    width={gridWidth}
                    columns={8}
                    gutter={6}
                    fetchGifs={fetchGifs}
                    key={searchTerm}
                    onGifClick={handleOnGifClick}
                />
            </div>
        </div>
    );
}

export default GIF;
