import { CatalogItem } from "../../types/CommonTypes";
import { ChangeEventHandler } from "react";

interface Props {
    param: CatalogItem;
    value?: number | undefined;
    onChange?: ChangeEventHandler | undefined;
}
function CatalogParamItem({ param, value, onChange }: Props) {

    return (
        <div className="p-1 text-secondary">
            <div className="d-flex justify-content-start col-12">
                <div className="text-truncate "
                    title={param.name + " " + param.unit + " (" + param.additionalName + ")"}>
                    {param.name}, {param.unit} ({param.additionalName})
                </div>
                
            </div>
            <input
                name={param.id.toString()}
                onChange={onChange}
                step="0.01" min="0" max="1000"
                className="col-12 mb-2"
                value={value ?? ""}
                type='number' />
        </div>
    );
}

export default CatalogParamItem;