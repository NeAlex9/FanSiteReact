import Collection from "./Collection";
import {TitleItem} from "./TitleItem";

export default function TitleCollection() {

    function render(state) {
        return state.isLoaded ? (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date</th>
                        <th scope="col">Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.media.map((media, index) =>
                        <TitleItem key={media.id} index={index} media={media}/>
                    )}
                    </tbody>
                </table>
            )
            : (<div style={{height: "36.7vw"}}>

            </div>)
    }

    return <Collection render={render}/>;
}