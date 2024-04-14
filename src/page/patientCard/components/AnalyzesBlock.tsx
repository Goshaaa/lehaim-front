import { Link, useParams } from 'react-router-dom';
import AnalyzeList from "./AnalyzeList";
import { SelectAnalyzeCallback } from '../../../types/CommonTypes';


interface Props {
    selectAnalyzeCallback: SelectAnalyzeCallback
}

function AnalyzesBlock({ selectAnalyzeCallback }: Props) {
    const { patientId } = useParams();

    return (
        <div className="container-lg border border-secondary rounded-3 text-secondary p-3 mb-3 clearfix">
            <h3 className="text-center mb-3">Список обследований</h3>
            {patientId &&
                <>
                    <AnalyzeList
                        patientId={Number(patientId)}
                        selectAnalyzeCallback={selectAnalyzeCallback} />

                    <div className='mt-3'>
                        <Link to={"/patient/" + patientId + "/analyzes/"}>
                            <button type="button" className="btn btn-outline-secondary float-end">Добавить</button>
                        </Link>
                    </div>
                </>
            }
        </div>
    );
}

export default AnalyzesBlock;