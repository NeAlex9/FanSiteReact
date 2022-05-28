import React, {useState} from 'react';
import {useSearchParams} from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';

export function FilterForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState(
        {
            yearsFrom: searchParams.get("yearsFrom") !== null ? parseInt(searchParams.get("yearsFrom")) : "",
            yearsTo: searchParams.get("yearsTo") !== null ? parseInt(searchParams.get("yearsTo")) : "",
            ratingFrom: searchParams.get("ratingFrom") !== null ? parseInt(searchParams.get("ratingFrom")) : "",
            ratingTo: searchParams.get("ratingTo") !== null ? parseInt(searchParams.get("ratingTo")) : "",
            mediaType: searchParams.get("mediaType") !== null ? parseInt(searchParams.get("mediaType")) : "",
        });

    function onSubmit(e) {
        e.preventDefault();
        const searchObject = Object.fromEntries([...searchParams]);
        for (const key in state) {
            if (state[key] !== "" && !isNaN(state[key])) {
                searchObject[key] = state[key];
            } else {
                delete searchObject[key];
            }
        }

        setSearchParams(searchObject);
    }

    function onChangeCheckboxValue(e, key, number) {
        const previous = state.mediaType;
        let actual;
        if (e.target.checked) {
            actual = previous | number;
        } else {
            actual = previous ^ number;
        }

        setState(state => ({...state, [key]: actual === 0 ? "" : actual}));
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

    function renderInput(handler, placeholder, value) {
        return (
            <input style={{display: "block", height: "1.5rem", width: "5rem"}}
                   value={value}
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
                        }
                        , 1977, state.yearsFrom)}
                    {renderInput((e) => {
                        onChangeFilterRange(e, "yearsTo")
                    }, 2022, state.yearsTo)}
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
                    }, 0, state.ratingFrom)}
                    {renderInput((e) => {
                        onChangeFilterRange(e, "ratingTo")
                    }, 10, state.ratingTo)}
                </div>
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-primary">Submit</button>
        </form>
    );
}