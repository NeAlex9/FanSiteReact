import {useSearchParams} from "react-router-dom";
import {useState} from "react";

export default function SearchComponent() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [title, setTitle] = useState(searchParams.get("title") === null || searchParams.get("title") === ""
        ? ""
        : searchParams.get("title"));

    function setUrlParams(title) {
        const searchObject = Object.fromEntries([...searchParams]);
        if (title !== "") {
            searchObject.title = title;
        } else {
            delete searchObject.title;
        }

        setSearchParams(searchObject);
    }

    return (
        <div className="d-flex flex-row me-2 w-50">
            <input onChange={(e) => {
                e.preventDefault();
                const value = e.target.value
                setTitle(value);
                setUrlParams(value);
            }}
                   value={title}
                   style={{display: "block", width: "100%"}}
                   placeholder="Enter media name" type="text"/>
        </div>
    );
}