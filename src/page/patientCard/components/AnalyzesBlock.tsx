import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AnalyzeList from "./AnalyzeList";
import { AnalyzeBriefInfo, SelectAnalyzeCallback } from '../../../types/CommonTypes';
import { ApiHost } from '../../../config';

interface Props {
    selectAnalyzeCallback: SelectAnalyzeCallback
}

function AnalyzesBlock( { selectAnalyzeCallback } : Props) {
    const { patientId } = useParams();

    const [analyzes, setAnalyzes] = useState<AnalyzeBriefInfo[]>([]);
    const [selectedAnalyzeId, setSelectedAnalyzeId] = useState<string>();
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(ApiHost + '/results/tests/' + patientId + "/all", {
            method: "GET"
        })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data);
                setAnalyzes(data);
            },
                (error) => {
                    setError(error.message);
                })
    }, [])

    return (
        <div className="container-lg border border-secondary rounded-3 text-secondary p-3 mb-3 clearfix">
            <h3 className="text-center mb-3">Список результатов анализов</h3>
            <AnalyzeList
                analyzes={analyzes}
                selectAnalyzeCallback={selectAnalyzeCallback}/>
            
            <div className='mt-3'>
                <Link to="/addAnalyzes">
                    <button type="button" className="btn btn-outline-secondary float-end">Добавить</button>
                </Link>
            </div>

        </div>
    );
}

export default AnalyzesBlock;