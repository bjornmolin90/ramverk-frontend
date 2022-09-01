import "../styles/Toolbar.css"
import { FaRegSave } from "react-icons/fa";


function Toolbar ( {value} ) {
    return (
        <div className="toolbar">
            <FaRegSave className="saveIcon" onClick={() => save (value)} />
        </div>
    );
}

export default Toolbar;

function save (val) {
    console.log(val)
}