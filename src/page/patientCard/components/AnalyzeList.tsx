import { useState } from 'react';
import { AnalyzeBriefInfo, SelectAnalyzeCallback } from '../../../types/CommonTypes';

interface Props {
    analyzes?: AnalyzeBriefInfo[]
    selectAnalyzeCallback: SelectAnalyzeCallback
}

function AnalyzeList({ analyzes, selectAnalyzeCallback }: Props) {
    const [activeId, setActiveId] = useState<string>("");

    const handleClick = (id: string) => {
        setActiveId(id);
        selectAnalyzeCallback!!(id);
    }

    return (
        <>
            {!analyzes && <h5 className="text-center m-3">Нет данных</h5>}
            <ul className="list-group">
                {analyzes?.map((analyze) =>
                    <li key={analyze.id}
                        className={"list-group-item list-group-item-action " + (analyze.id === activeId ? "active" : "")}
                        onClick={() => handleClick(analyze.id!!)}>
                        Результаты от {analyze.testDate}
                    </li>
                )}
            </ul>
        </>
    );
}

export default AnalyzeList;