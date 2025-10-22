import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AnalyzeBriefInfo, SelectAnalyzeCallback, ChartType2 } from '../../../types/CommonTypes';
import * as patientService from '../../../services/PatientService';
import * as oncoTestService from '../../../services/OncoTestSerive';
import * as dateUtils from '../../../components/DateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faTrash, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import ChartIndicator from './ChartIndicator';
import XrayIndicatorIndicator from './XrayIndicator';
import { useTranslation } from "react-i18next";
import './AnalyzeList.css';

interface Props {
    patientId: string,
    selectAnalyzeCallback: SelectAnalyzeCallback
}

function AnalyzeList({ patientId, selectAnalyzeCallback }: Props) {
    const [oncoTests, setOncoTests] = useState<AnalyzeBriefInfo[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [error, setError] = useState("");
    const [testToDelete, setTestToDelete] = useState<AnalyzeBriefInfo>({});
    const navigate = useNavigate();

    const { t } = useTranslation();


    const loadPatientOncoTests = async () => {
        setError("");

        if (patientId) {
            try {
                const data = await patientService.listAllPatientOncoTests(patientId);
                setOncoTests(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(t('common.error') + err.message);
                } else {
                    setError(t('common.loadingError') + err);
                }
            }
        }
    }

    useEffect(() => {
        loadPatientOncoTests();
    }, [patientId]);

    const handleClick = (id: string) => {
        setActiveId(id);
        selectAnalyzeCallback!!(id);
    }

    const handleEdit = (event: React.MouseEvent, id: string) => {
        event.preventDefault();
        event.stopPropagation();
        navigate("/patient/" + patientId + "/analyzes/" + id);
    }

    const buildPdfReport = async (event: React.MouseEvent, id: string) => {
        event.preventDefault();
        event.stopPropagation();
        navigate("/patient/" + patientId + "/analyzes/" + id + "/pdf");
    }

    const onClickDelete = (selectedTest: AnalyzeBriefInfo) => {
        setTestToDelete(selectedTest);
    }

    const handleDeleteConfirmationCallback = async (id: string) => {
        try {
            selectAnalyzeCallback();
            await oncoTestService.deleteOncoTest(Number(id));
            const result = oncoTests.filter((item) => {
                return item.id !== id
            });
            setOncoTests(result);
        } catch (err) {
            console.log(err);
        }
    }

    const isChartIncluded = (chartName: string, charts?: string[]) => {
        return charts ? charts.includes(chartName) : false;
    };

    return (
        <>
            <ConfirmationModal
                title={t('analyzeList.confirmDelTitle')}
                body={t('analyzeList.confirmDelBody') + dateUtils.formatDate(testToDelete.testDate) + "\""}
                yesCallback={() => { handleDeleteConfirmationCallback(testToDelete.id!!) }} />

            {!oncoTests && <h5 className="text-center m-3">
                {t('analyzeList.noData')}
            </h5>}
            <ul className="list-group overflow-auto" style={{ "maxHeight": "412px", "scrollbarWidth": "thin" }}>
                {oncoTests?.map((test) =>
                    <li key={test.id}
                        role='button'
                        className={"list-group-item list-group-item-action " + (test.id === activeId ? "active" : "")}
                        onClick={() => handleClick(test.id!!)}>
                        <div className='d-flex justify-content-between'>
                            <div className="d-flex text-dark">
                                <div>
                                    {t('analyzeList.analize') + dateUtils.formatDate(test.testDate)}
                                </div>
                                <div className="d-flex ms-4 me-4">
                                    <ChartIndicator
                                        isActive={(isChartIncluded(ChartType2.Regeneration_Type, test.possibleCharts) && isChartIncluded(ChartType2.Inflammation_Type, test.possibleCharts))}
                                    />
                                    <ChartIndicator
                                        isActive={(isChartIncluded(ChartType2.B_Type, test.possibleCharts) && isChartIncluded(ChartType2.T_Type, test.possibleCharts))}
                                    />
                                    <ChartIndicator
                                        isActive={isChartIncluded(ChartType2.Cytokine_Type, test.possibleCharts)}
                                    />
                                    <XrayIndicatorIndicator
                                        isActive={test.isDuringRadiationTherapy ?? false}
                                    />
                                </div>
                            </div>
                            <div>
                                {test.testNote &&
                                    <FontAwesomeIcon
                                        className="ps-1 me-3"
                                        icon={faInfoCircle}
                                        role="button"
                                        title={test.testNote ?? t('analyzeList.noData')} />
                                }

                                <FontAwesomeIcon
                                    className="ps-1 me-3"
                                    icon={faPrint}
                                    onClick={(event) => buildPdfReport(event, test.id!!)}
                                    role="button"
                                    title={t('analyzeList.buildRebotnBtn')} />

                                <FontAwesomeIcon
                                    className="ps-1 me-3"
                                    onClick={(event) => handleEdit(event, test.id!!)}
                                    icon={faEdit}
                                    role="button"
                                    title={t('analyzeList.editAnalyzeBtn')} />

                                <FontAwesomeIcon
                                    className="ps-1"
                                    data-bs-toggle="modal" data-bs-target="#confirmationModal"
                                    icon={faTrash}
                                    onClick={() => onClickDelete(test)}
                                    role="button"
                                    title={t('analyzeList.deleteAnalyzeBtn')} />
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    );
}

export default AnalyzeList;