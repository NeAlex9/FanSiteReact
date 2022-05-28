import {Outlet} from "react-router-dom";
import SearchComponent from "./filterComponents/SearchComponent";
import {FilterForm} from "./filterComponents/FilterForm";
import {MediaViewChangerBar} from "./orderComponents/MediaViewChangerBar";

export default function WorksCollectionLayout(){
    return (
        <div className='container'>
            <div className='d-flex flex-row m-4 w-100'>
                <SearchComponent />
                <MediaViewChangerBar className="pe-2"/>
            </div>
            <div className="row">
                <div className="col-9">
                    <Outlet />
                </div>
                <div className="col-3">
                     <FilterForm/>
                </div>
            </div>
        </div>
    )
}