import {useNavigate} from "react-router-dom";
import "./TitleItem.css"

export function TitleItem(props) {
    const navigate = useNavigate();

    const {
        id, title, type, publicationDate, rating
    } = props.media;
    const index = publicationDate.indexOf(":");
    const date = publicationDate.substring(0, index - 3);
    const url = `/media/${id}`;
    return (
        <tr className="clickable_row"
            onClick={(id) => navigate(url)}>
            <th>
                {props.index}
            </th>
            <td>
                {title}
            </td>
            <td>
                {type.name}
            </td>
            <td>
                {date}
            </td>
            <td>
                {rating}
            </td>
        </tr>

    );
}