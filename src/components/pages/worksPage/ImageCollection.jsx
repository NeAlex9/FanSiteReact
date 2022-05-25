import ImageItem from "./ImageItem";
import Collection from "./Collection";

export default function ImageCollection() {

    function render(state) {
        return state.isLoaded ?
            (
                <div className='my_row'>
                    {state.media.map((media) =>
                        <ImageItem key={media.id} media={media}/>
                    )}
                </div>
            )
            :
            (
                <div style={{height: "36.7vw"}}>
                    {/*<LoadingComponent/>*/}
                </div>
            );
    }

    return <Collection render={render}/>;
}