import { FormEvent, useState, useEffect } from "react";
import { GeneDto, Patient, PatientAllGenesDto, PatientGeneDto, XrayTherapyDto } from "../../../types/CommonTypes";
import * as patientService from '../../../services/PatientService';
import * as diagnosisService from '../../../services/DiagnosisService';
import * as geneticService from '../../../services/GeneticService';
import { DiagnosisDTO } from "../../../services/DiagnosisService";
import GeneticsInfoBlock from "./GeneticsInfoBlock";
import MultipleSelect from "../../../components/MultipleSelect"
import { useTranslation } from "react-i18next";

interface Props {
    patient: Patient;
}

function AdditionaInfolBlock({ patient }: Props) {
    const [editMode, setEditMode] = useState(false);
    const [sourcePatient, setSourcePatient] = useState<Patient>(patient);
    const [changePatient, setChangePatient] = useState<Patient>(patient);
    const [xrayTherapy, setXrayTherapy] = useState<XrayTherapyDto | undefined>(patient.radiationTherapy);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [diagnosisId, setDiagnosisId] = useState<number | undefined>(patient.diagnosisId);

    const [diagnosisCatalog, setDiagnosisCatalog] = useState<DiagnosisDTO[]>([]);
    const [patientAllGenes, setPatientAllGenes] = useState<PatientAllGenesDto>();
    const [origPatientDiagnosisGenes, setOrigPatientDiagnosisGenes] = useState<PatientGeneDto[]>([]);
    const [patientDiagnosisGenes, setPatientDiagnosisGenes] = useState<PatientGeneDto[]>([]);
    const [diagnosisGenes, setDiagnosisGenes] = useState<GeneDto[] | undefined>([]);

    const fioRegexEn = /^[A-Za-z- ]+$/
    const fioRegexRu = /^[А-Яа-я- ]+$/

    const { t } = useTranslation();

    useEffect(() => {
        const loadDiagnosisCatalog = async () => {
            setError("");
            setLoading(true);
            try {
                const data = await diagnosisService.loadAllDiagnosis();
                setDiagnosisCatalog(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(t('common.error') + err.message);
                } else {
                    setError(t('common.loadingError') + err);
                }
            }
            setLoading(false);
        }

        const loadAllPatientGenes = async () => {
            setError("");
            setLoading(true);
            try {
                const data = await geneticService.loadGenesByPatient(patient.id!!)
                setPatientAllGenes(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(t('common.error') + err.message);
                } else {
                    setError(t('common.loadingError') + err);
                }
            }
            setLoading(false);
        }

        loadDiagnosisCatalog();
        loadAllPatientGenes();
    }, []);

    useEffect(() => {
        const selectedDiagnosis = diagnosisCatalog.find(diag => diag.id === Number(changePatient.diagnosisId));
        setDiagnosisId(selectedDiagnosis?.id);
        setDiagnosisGenes(selectedDiagnosis?.genes);
    }, [diagnosisCatalog, changePatient]);

    useEffect(() => {
        let patientGenesByDiagnosis: PatientGeneDto[] = [];
        if (patientAllGenes && diagnosisId) {
            patientGenesByDiagnosis = patientAllGenes[diagnosisId] ?? [];

            //Установить для всех возможных генов данного диагноза дефолтное значение, если имеется дефолтное значение и не установлено свое
            diagnosisGenes
                ?.filter(gene => gene.defaultValue)
                .forEach(gene => {
                    if (!patientGenesByDiagnosis.find(patientGene => patientGene.geneId == gene.id)) {
                        patientGenesByDiagnosis.push({
                            geneId: gene.id,
                            geneValue: gene.defaultValue!!,
                            diagnosisId: diagnosisId!!
                        });
                    }
                });
        }
        setPatientDiagnosisGenes(patientGenesByDiagnosis ? patientGenesByDiagnosis : []);
        setOrigPatientDiagnosisGenes(patientGenesByDiagnosis ? patientGenesByDiagnosis : []);
    }, [diagnosisId, patientAllGenes]);

    useEffect(() => {
        calcAdditionalDiagnosis();
    }, [patientDiagnosisGenes])

    useEffect(() => {
        setChangePatient(prevData => ({ ...prevData, 'radiationTherapy': xrayTherapy }));
    }, [xrayTherapy])

    const toggleEditMode = () => {
        if (editMode) {
            setChangePatient(sourcePatient);
            setPatientDiagnosisGenes(origPatientDiagnosisGenes);
            setXrayTherapy(sourcePatient.radiationTherapy);
            setError("");
        }
        setEditMode(!editMode);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setChangePatient(prevData => ({ ...prevData, [name]: value }));
    }

    const handleXrayChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setXrayTherapy(prevData => ({ ...prevData, [name]: value }));
    }

    const handleGeneChange = (changedGene: PatientGeneDto) => {
        const copyGenes = [...patientDiagnosisGenes];

        const updGene = copyGenes.find(gen => gen.geneId == changedGene.geneId);
        if (updGene) {
            updGene.geneValue = changedGene.geneValue;
        } else {
            copyGenes.push({
                geneId: changedGene.geneId,
                geneValue: changedGene.geneValue,
                diagnosisId: diagnosisId!!
            });
        }
        setPatientDiagnosisGenes(copyGenes);
    }

    const calcAdditionalDiagnosis = () => {
        if (diagnosisId === 45 && patientDiagnosisGenes) {//С50
            let ER = patientDiagnosisGenes?.find(gene => gene.geneId == "18")?.geneValue; //"id":18,"geneName":"ER"
            let PR = patientDiagnosisGenes?.find(gene => gene.geneId == "19")?.geneValue; //"id":19,"geneName":"PR"
            let Ki67 = patientDiagnosisGenes?.find(gene => gene.geneId == "20")?.geneValue; //"id":20,"geneName":"Ki67"
            let HER2neu = patientDiagnosisGenes?.find(gene => gene.geneId == "21")?.geneValue; //"id":21,"geneName":"HER2neu"

            let calcValue = 'N/A';
            if (ER === "5-8" && PR === "5-8" && (Ki67 === "<1" || Ki67 === "1-14") && HER2neu === "0") {
                calcValue = "ЛА";
            } else if ((ER === "1-2" || ER === "3-4" || ER === "5-8") && (PR === "<1" || PR === "1-2" || PR === "3-4" || PR === "5-8") && (Ki67 === "15-30" || Ki67 === "31-70" || Ki67 === "71-100") && (HER2neu === "0" || HER2neu === "1+")) {
                calcValue = "ЛБ Her-";
            } else if ((ER === "<1" || ER === "1-2" || ER === "3-4" || ER === "5-8") && (PR === "1-2" || PR === "3-4" || PR === "5-8") && (Ki67 === "15-30" || Ki67 === "31-70" || Ki67 === "71-100") && (HER2neu === "0" || HER2neu === "1+")) {
                calcValue = "ЛБ Her-";
            } else if (ER === "<1" && PR === "<1" && (Ki67 === "<1" || Ki67 === "1-14" || Ki67 === "15-30" || Ki67 === "31-70" || Ki67 === "71-100") && (HER2neu === "2+" || HER2neu === "3+")) {
                calcValue = "Her3+";
            } else if (ER === "<1" && PR === "<1" && (Ki67 === "<1" || Ki67 === "1-14" || Ki67 === "15-30" || Ki67 === "31-70" || Ki67 === "71-100") && HER2neu === "0") {
                calcValue = "ТН";
            } else if ((ER === "<1" || ER === "1-2" || ER === "3-4" || ER === "5-8") && (PR === "1-2" || PR === "3-4" || PR === "5-8") && (Ki67 === "<1" || Ki67 === "1-14" || Ki67 === "15-30" || Ki67 === "31-70" || Ki67 === "71-100") && (HER2neu === "2+" || HER2neu === "3+")) {
                calcValue = "ЛБ Her+";
            } else if ((ER === "1-2" || ER === "3-4" || ER === "5-8") && (PR === "<1" || PR === "1-2" || PR === "3-4" || PR === "5-8") && (Ki67 === "<1" || Ki67 === "1-14" || Ki67 === "15-30" || Ki67 === "31-70" || Ki67 === "71-100") && (HER2neu === "2+" || HER2neu === "3+")) {
                calcValue = "ЛБ Her+";
            }
            setChangePatient(prevData => ({ ...prevData, ['additionalDiagnosis']: calcValue }));
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const err = validateBeforeSubmit();
        if (err) {
            setError(err);
            return;
        }
        setLoading(true);
        setError("");

        try {
            const data = await patientService.updatePatient(changePatient);
            const geneData = await geneticService.updatePatientGenes(patient.id!!, patientDiagnosisGenes);
            setSourcePatient(data);
            setChangePatient(data);
            setOrigPatientDiagnosisGenes(patientDiagnosisGenes);
            setEditMode(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(t('common.error') + err.message);
            } else {
                setError(t('common.saveError') + err);
            }
        }
        setLoading(false);
    }

    const isNullOrEmpty = (input: String | undefined): boolean => {
        if (input === null || input === "") return true;
        return false;
    }

    const validateBeforeSubmit = (): string | null => {
        const errMsgs: string[] = [];
        if (changePatient.name.trim().length === 0) {
            errMsgs.push("Не заполнено имя пациента");
        }
        if (changePatient.lastname.trim().length === 0) {
            errMsgs.push("Не заполнена фамилия пациента");
        }
        if (!changePatient.gender || changePatient.gender === '-') {
            errMsgs.push("Не указан пол пациента");
        }

        const fio = changePatient.name + changePatient.lastname + changePatient.patronymic;
        if (!((fioRegexEn.test(fio) && !fioRegexRu.test(fio)) || 
            (!fioRegexEn.test(fio) && fioRegexRu.test(fio)))) {
                errMsgs.push("ФИО может быть указано либо только на кирилице либо только на латинице");
        }

        if (!changePatient.birthdate) {
            errMsgs.push("Не указана дата рождения пациента");
        } else {
            const parsedDate = new Date(changePatient.birthdate);
            if (parsedDate >= new Date()) {
                errMsgs.push("Дата рождения не может быть в будущем");
            } else if (parsedDate < new Date("1900-01-01")) {
                errMsgs.push("Неверная дата рождения");
            }
        }
        if ((isNullOrEmpty(changePatient.radiationTherapy?.startTherapy) && !isNullOrEmpty(changePatient.radiationTherapy?.endTherapy)) ||
             (!isNullOrEmpty(changePatient.radiationTherapy?.startTherapy) && isNullOrEmpty(changePatient.radiationTherapy?.endTherapy))) {
            errMsgs.push("У лучевой терапии должны быть заполнены обе даты");
        }
        if (changePatient.operationDate && changePatient.radiationTherapy?.startTherapy && changePatient.radiationTherapy?.endTherapy) {
            const operationDate = new Date(changePatient.operationDate);
            const therapyStart = new Date(changePatient.radiationTherapy.startTherapy);
            const therapyEnd = new Date(changePatient.radiationTherapy.endTherapy);
            
            if (operationDate >= therapyStart && operationDate <= therapyEnd) {
                errMsgs.push("Дата операции не может быть в период лучевой терапии");
            }
        }
        return errMsgs.length > 0 ? "Ошибка заполнения формы: " + errMsgs.join('; ') : null;
    }

    return (
        <>
            <div className="border border-secondary rounded-3 text-secondary p-3 clearfix">
                <form onSubmit={handleSubmit} className="container-fluid">
                    <div className="mb-2 d-flex justify-content-between gap-2">
                        <label htmlFor="lastNameArea" className="fw-bold">
                            {t('patientAdditionalBlock.lastName')}:
                        </label>
                        <input className="w-50"
                            id="lastNameArea"
                            name="lastname"
                            value={changePatient.lastname ?? ""}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className="mb-2 d-flex justify-content-between gap-2">
                        <label htmlFor="nameArea" className="fw-bold">
                            {t('patientAdditionalBlock.firstName')}:
                        </label>
                        <input className="w-50"
                            id="nameArea"
                            name="name"
                            value={changePatient.name ?? ""}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className="mb-2 d-flex justify-content-between gap-2">
                        <label htmlFor="patronymicArea" className="fw-bold">
                            {t('patientAdditionalBlock.middleName')}:
                        </label>
                        <input className="w-50"
                            id="patronymicArea"
                            name="patronymic"
                            value={changePatient.patronymic ?? ""}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className="mb-2 d-flex justify-content-between gap-2">
                        <label htmlFor="birthDateArea" className="fw-bold">
                            {t('patientAdditionalBlock.birthDate')}:
                        </label>
                        <input className="w-50"
                            type="date"
                            min='1900-01-01'
                            max={new Date().toISOString().split('T')[0]}
                            id="birthDateArea"
                            name="birthdate"
                            value={changePatient.birthdate}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>


                    <div className="mb-2 d-flex justify-content-between gap-2">
                        <label htmlFor="birthDateArea" className="fw-bold">
                            {t('patientAdditionalBlock.gender')}:
                        </label>

                        <select
                            id="patientGender"
                            name="gender"
                            value={changePatient.gender}
                            onChange={handleChange}
                            disabled={!editMode}
                            className=" w-50"
                        >
                            <option value="Male">{t('patientAdditionalBlock.maleGenderOption')}</option>
                            <option value="Female">{t('patientAdditionalBlock.femaleGenderOption')}</option>
                        </select>
                    </div>


                    <div className="mb-3 mt-2">
                        <label htmlFor="mainDiagnosisArea"
                            className="fw-bold">
                            {t('patientAdditionalBlock.diagnosis')}:
                        </label>
                        <div className="mt-2">
                            <select
                                id="mainDiagnosisArea"
                                disabled={!editMode}
                                name="diagnosisId"
                                className="container-fluid"
                                value={changePatient.diagnosisId ?? ""}
                                onChange={handleChange}>
                                {!sourcePatient.diagnosisId &&
                                    <option>-</option>
                                }
                                {diagnosisCatalog?.map((diag) =>
                                    <option value={diag.id} key={diag.id}>
                                        {diag.code + " - " + diag.description}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>



                    <MultipleSelect
                        label="T:"
                        value={changePatient.t ?? ""}
                        onChange={(newValue) => setChangePatient(prevData => ({ ...prevData, t: newValue }))}
                        disabled={!editMode}
                        numberOptions={["0", "X", "1", "2", "3", "4"]}
                        letterOptions={["a", "b", "c", "d"]}
                    />

                    <MultipleSelect
                        label="N:"
                        value={changePatient.n ?? ""}
                        onChange={(newValue) => setChangePatient(prevData => ({ ...prevData, n: newValue }))}
                        disabled={!editMode}
                        numberOptions={["0", "X", "1", "2", "3"]}
                        letterOptions={["a", "b", "(s/n)"]}
                    />

                    <MultipleSelect
                        label="M:"
                        value={changePatient.m ?? ""}
                        onChange={(newValue) => setChangePatient(prevData => ({ ...prevData, m: newValue }))}
                        disabled={!editMode}
                        numberOptions={["0", "X", "1"]}
                        letterOptions={["Hep", "Pul", "OSS", "BRA", "PL", "PER"]}
                    />

                    <MultipleSelect
                        label="G:"
                        value={changePatient.g ?? ""}
                        onChange={(newValue) => setChangePatient(prevData => ({ ...prevData, g: newValue }))}
                        disabled={!editMode}
                        numberOptions={["X", "1", "2", "3", "LG", "HG"]}
                        letterOptions={["Adc", "Squam CC", "Small CC", "Muc", "Ductal", "Lobular", "Scirr"]}
                    />

                    <GeneticsInfoBlock
                        genesList={diagnosisGenes}
                        patientGenes={patientDiagnosisGenes}
                        isEditMode={editMode}
                        onChange={handleGeneChange} />

                    {/* Applied only for C-50 */}
                    {diagnosisId === 45 &&
                        <div className="mb-2 d-flex justify-content-between">
                            <label htmlFor="additionalDiagArea" className="fw-bold">
                                {t('patientAdditionalBlock.extraDiagnosis')}:
                            </label>
                            <input className="w-50"
                                id="additionalDiagArea"
                                name="additionalDiagnosis"
                                value={changePatient.additionalDiagnosis ?? ""}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                    }

                    <div className="mb-3">
                        <label htmlFor="operationDateArea" className="fw-bold">
                            {t('patientAdditionalBlock.surgeryDate')}:
                        </label>
                        <div className="mt-2">
                            <input className="w-100"
                                type="date"
                                min={changePatient.birthdate || '1900-01-01'}
                                max='2199-12-12'
                                id="operationDateArea"
                                name="operationDate"
                                autoComplete="off"
                                value={changePatient.operationDate ?? ""}
                                onChange={handleChange}
                                disabled={!editMode} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="diagnosisArea"
                            className="fw-bold">
                            {t('patientAdditionalBlock.diagnosisComment')}:
                        </label>
                        <div className="mt-2">
                            <textarea className="w-100"
                                id="diagnosisArea"
                                name="diagnosisComments"
                                value={changePatient.diagnosisComments ?? ""}
                                onChange={handleChange}
                                disabled={!editMode} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="surgeryArea" className="fw-bold">
                            {t('patientAdditionalBlock.surgeryComment')}:
                        </label>
                        <div className="mt-2">
                            <textarea
                                className="w-100"
                                id="surgeryArea"
                                name="operationComments"
                                value={changePatient.operationComments ?? ""}
                                onChange={handleChange}
                                disabled={!editMode} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="therapyArea" className="fw-bold">
                            {t('patientAdditionalBlock.therapyComment')}:
                        </label>
                        <div className="mt-2">
                            <textarea
                                className="w-100"
                                id="therapyArea"
                                name="chemotherapyComments"
                                value={changePatient.chemotherapyComments ?? ""}
                                onChange={handleChange}
                                disabled={!editMode} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="therapyArea" className="fw-bold">
                            {t('patientAdditionalBlock.xrayPeriod')}:
                        </label>
                        <div className="mt-2 mb-3">
                            <div className="d-flex gap-2 flex-wrap">
                                <div className="d-flex align-items-center gap-2 flex-grow-1">
                                    <label htmlFor="xrayterapyfrom" className="fw-bold">
                                        {t('patientAdditionalBlock.xrayPeriodBegan')}:
                                    </label>
                                    <input
                                        className="flex-grow-1"
                                        type="date"
                                        min='2000-01-01'
                                        max={xrayTherapy?.endTherapy || "2199-12-12"}
                                        id="xrayterapyfrom"
                                        name="startTherapy"
                                        value={xrayTherapy?.startTherapy ?? ""}
                                        onChange={handleXrayChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                
                                <div className="d-flex align-items-center gap-2 flex-grow-1">
                                    <label htmlFor="xrayterapyfrom" className="fw-bold">
                                        {t('patientAdditionalBlock.xrayPeriodEnd')}:
                                    </label>
                                    <input
                                        className="flex-grow-1"
                                        type="date"
                                        min={xrayTherapy?.startTherapy || "2000-01-01"}
                                        max='2199-12-12'
                                        id="xrayterapyfrom"
                                        name="endTherapy"
                                        value={xrayTherapy?.endTherapy ?? ""}
                                        onChange={handleXrayChange}
                                        disabled={!editMode}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="xrayTherapyArea" className="fw-bold">
                            {t('patientAdditionalBlock.xrayTherapyComment')}:
                            </label>
                            <div className="mt-2">
                                <textarea
                                    className="w-100"
                                    id="xrayTherapyArea"
                                    name="comment"
                                    value={xrayTherapy?.comment ?? ""}
                                    onChange={handleXrayChange}
                                    disabled={!editMode} />
                            </div>
                        </div>
                    </div>
                    {error &&
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    }
                    <div className="d-flex justify-content-end mt-3">
                        {editMode &&
                            <button type="submit"
                                className="btn btn-outline-success float-end"
                                disabled={loading}
                                title={t('patientAdditionalBlock.saveBtnTooltip')}>
                                {loading &&
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                }
                                {t('patientAdditionalBlock.saveBtn')}
                            </button>
                        }
                        <button
                            type="button"
                            onClick={toggleEditMode}
                            className="btn btn-outline-secondary ms-3 float-end"
                            disabled={loading}
                            title={editMode ? t('patientAdditionalBlock.cancelBtnTooltip') : t('patientAdditionalBlock.editBtnTooltip')}
                        >
                            {editMode ? t('patientAdditionalBlock.cancelBtn') : t('patientAdditionalBlock.editBtn')}
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
}

export default AdditionaInfolBlock;