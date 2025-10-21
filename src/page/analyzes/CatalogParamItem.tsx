import { CatalogItem } from "../../types/CommonTypes";
import { ChangeEventHandler } from "react";

import './CatalogParamItem.css';

interface Props {
    param: CatalogItem;
    value?: number | undefined;
    onChange?: ChangeEventHandler | undefined;
}
function CatalogParamItem({ param, value, onChange }: Props) {

    const getInputMaxValue = (item: CatalogItem) => {
        if (item.unit === '%') return "100"
        return "999.99"; 
    }

    return (
        <div className="p-1 text-dark">
            <div className="d-flex justify-content-start col-12 border border-secondary rounded-2 p-2">
                <div className="col-8"
                    title={param.name + " " + param.unit + " (" + param.additionalName + ")"}>
                    {param.name} ({param.additionalName})
                </div>
                <div className="col-2">
                    <input
                        name={param.id.toString()}
                        onChange={onChange}
                        step="0.01" min="0" max={getInputMaxValue(param)}
                        className="col-12"
                        value={value ?? ""}
                        type='number'/>
                </div>
                <div className="text-truncate col-2 px-1"
                    title={param.unit}>
                    {param.unit}
                </div>

            </div>

        </div>
    );
}

export default CatalogParamItem;