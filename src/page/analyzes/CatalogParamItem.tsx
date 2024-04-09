import { CatalogItem } from "../../types/CommonTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { ChangeEventHandler } from "react";

interface Props {
    param: CatalogItem;
    value?: number | undefined;
    onChange?: ChangeEventHandler | undefined;
}
function CatalogParamItem({ param, value, onChange }: Props) {

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
            <input
                name={param.id.toString()}
                onChange={onChange}
                className="col-12 col-md-8 mb-2"
                value={value ?? ""}
                type='number' />
        </div>
    );
}

export default CatalogParamItem;