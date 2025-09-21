import { Link, useParams } from 'react-router-dom';
import AnalyzeList from "./AnalyzeList";
import { SelectAnalyzeCallback } from '../../../types/CommonTypes';
import { useTranslation } from "react-i18next";


interface Props {
    selectAnalyzeCallback: SelectAnalyzeCallback
}

function AnalyzesBlock({ selectAnalyzeCallback }: Props) {
    const { patientId } = useParams();
    const { t } = useTranslation();

    return (
        <div className="container-lg border border-dark rounded-3 text-dark p-3 mb-3 clearfix">
            <h3 className="text-center mb-3">
                {t('analyzeList.title')}
            </h3>
            {patientId &&
                <>
                    <AnalyzeList
                        patientId={patientId}
                        selectAnalyzeCallback={selectAnalyzeCallback} />

                    <div className='mt-3'>
                        <Link to={"/patient/" + patientId + "/analyzes/"}>
                            <button type="button" className="btn btn-outline-dark float-end" title="Добавить обследование">
                                {t('analyzeList.addAnalyzeBtn')}
                            </button>
                        </Link>
                    </div>
                </>
            }
        </div>
    );
}

export default AnalyzesBlock;