import React, {useState} from 'react';
import {useSearchParams} from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';

export function FilterForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState(
        {
            yearsFrom: searchParams.get("yearFrom") !== null ? parseInt(searchParams.get("yearFrom")) : 0,
            yearsTo: searchParams.get("yearTo") !== null ? parseInt(searchParams.get("yearTo")) : 0,
            ratingFrom: searchParams.get("ratingFrom") !== null ? parseInt(searchParams.get("ratingFrom")) : 0,
            ratingTo: searchParams.get("ratingTo") !== null ? parseInt(searchParams.get("ratingTo")) : 0,
            mediaType: searchParams.get("mediaType") !== null ? parseInt(searchParams.get("mediaType")) : 0,
        });

    function onSubmit(e) {
        e.preventDefault();
        const searchObject = Object.fromEntries([...searchParams]);
        for (const key in state) {
            if (state[key] !== 0 && state[key] !== "" && Number(state[key])) {
                searchObject[key] = state[key];
            } else {
                delete searchObject[key];
            }
        }

        setSearchParams(searchObject);
    }

    function onChangeCheckboxValue(e, key, number) {
        const previous = state.mediaType;
        if (e.target.checked) {
            setState(state => ({...state, [key]: previous | number}));
        } else {
            setState(state => ({...state, [key]: previous ^ number}));
        }
    }

    function onChangeFilterRange(e, key) {
        setState(state => ({...state, [key]: e.target.value}));
    }

    function renderCheckbox(title, number) {
        return (
            <>
                <Checkbox
                    style={{padding: "0.2rem"}}
                    id="bookCheckedLabel"
                    checked={(state.mediaType & number) !== 0}
                    onClick={(e) => onChangeCheckboxValue(e, "mediaType", number)}
                />
                <label className="form-check-label" htmlFor="bookCheckedLabel">
                    {title}
                </label>
            </>);
    }

    function renderInput(handler, placeholder) {
        return (
            <input style={{display: "block", height: "1.5rem", width: "5rem"}}
                   onChange={handler}
                   placeholder={placeholder}
                   type="number"/>
        );
    }

    return (
        <form className="d-flex flex-column align-items-center">

            <div className="m-3 d-flex flex-column align-items-center">
                <h5>Years</h5>
                <div className="d-flex flex-row m-1 align-items-center">
                    {renderInput((e) => {
                        onChangeFilterRange(e, "yearsFrom")
                    }, 1977)}
                    {renderInput((e) => {
                        onChangeFilterRange(e, "yearsTo")
                    }, 2022)}
                </div>
            </div>

            <div className="d-flex flex-column m-2">
                <h5>Select media type</h5>
                <div className="form-check">
                    {renderCheckbox("Book", 1)}
                </div>
                <div className="form-check">
                    {renderCheckbox("Film", 2)}
                </div>
            </div>

            <div className="m-3 d-flex flex-column align-items-center">
                <h5>Rating</h5>
                <div className="d-flex flex-row m-1 align-items-center">
                    {renderInput((e) => {
                        onChangeFilterRange(e, "ratingFrom")
                    }, 0)}
                    {renderInput((e) => {
                        onChangeFilterRange(e, "ratingTo")
                    }, 10)}
                </div>
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-primary">Submit</button>
        </form>
    );
}