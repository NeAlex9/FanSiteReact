import {useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MediaService from "../../../services/MediaService";
import MediaFilter from "../../../services/MediaFilter";

export default function Collection(props) {
    let location = useLocation();
    let [searchParams] = useSearchParams();
    let [state, setState] = useState({
        media: [],
        isLoaded: false,
    });

    useEffect(() => {
        const fetcher = new MediaService();
        fetcher.GetMedia()
            .then(items => {
                const filter = Object.fromEntries([...searchParams]);
                const mediaFilter = new MediaFilter();
                const filtered = mediaFilter.Filter(items, filter);
                setState({media: filtered, isLoaded: true});
            })
    }, [location.search])

    return props.render(state);
}