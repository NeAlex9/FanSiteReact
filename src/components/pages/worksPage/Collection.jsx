import {useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MediaService from "../../../services/MediaService";

export default function Collection(props) {
    let location = useLocation();
    let [searchParams] = useSearchParams();
    let [state, setState] = useState({
        media: [],
        isLoaded: false,
    });

    function getFilter() {
        let yearsTo = searchParams.get("yearsTo") ?? 100000;
        let yearsFrom = searchParams.get("yearsFrom") ?? 0;
        let ratingTo = searchParams.get("ratingTo") === null || searchParams.get("ratingTo") === "" ? 10 : searchParams.get("ratingTo");
        let ratingFrom = searchParams.get("ratingFrom") === null || searchParams.get("ratingFrom") === "" ? 0 : searchParams.get("ratingFrom");
        let mediaType = searchParams.get("mediaType") === null ? 3 : searchParams.get("mediaType");
        let searchName = searchParams.get("searchName") === null ? "" : searchParams.get("searchName");

        return  {yearsTo, yearsFrom, ratingTo, ratingFrom, mediaType, searchName};
    }

    useEffect(() => {
        let fetcher = new MediaService();
        fetcher.GetMedia()
            .then(items => {
               /* let filter = getFilter();
                let mediaFilter = new MediaFilter();
                let filtered = mediaFilter.Filter(items, filter);*/
                setState({media: items, isLoaded: true});
            })
    }, [location.search])

    return props.render(state);
}