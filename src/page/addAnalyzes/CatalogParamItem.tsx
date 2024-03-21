import { CatalogItem } from "../../types/CommonTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

interface Props {
    param: CatalogItem;
}
function CatalogParamItem({ param }: Props) {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4 p-1 text-secondary">
            <div className="d-flex justify-content-start col-sm-10 col-md-8">
                <div className="text-truncate "
                    title={param.name + " " + param.unit}>
                    {param.name}, {param.unit}
                </div>
                <div >
                    <FontAwesomeIcon
                        className="ps-1"
                        icon={faQuestionCircle}
                        role="button"
                        title={param.additionalName} />
                </div>
            </div>
            <input className="col-12 col-md-8 mb-2" type='text'></input>
        </div>
    );
}

export default CatalogParamItem;