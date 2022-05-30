import {Link,} from "react-router-dom";
import {CustomLink} from "./CustomLink";

export function MediaViewChangerBar() {

    return (
        <div className="d-flex flex-row">
            <CustomLink tag={Link} style={{display: "block", margin: "0.4rem"}} className="text-dark custom-link"
                        to={"/"}>
                <img alt="" width="30px" height="30px" src="/images_formated.png"/>
            </CustomLink>
            <CustomLink tag={Link} style={{display: "block", margin: "0.4rem"}} className="text-dark m2 custom-link"
                        to="TitleList">
                <img alt="" width="30px" height="30px" src="/lists_formated.png"/>
            </CustomLink>
        </div>
    )
}