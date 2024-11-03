import { GeneDto, PatientGeneDto } from '../../../services/GeneticService';

interface Props {
  genesList: GeneDto[] | undefined,
  patientGenes: PatientGeneDto[],
  isEditMode: boolean,
  onChange?: Function
}

export default function GeneticsInfoBlock({ genesList, patientGenes, isEditMode, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const gene = patientGenes.find(gen => gen.geneId == name)
      ?? {
      geneId: name,
      geneValue: value
    };
    gene.geneValue = value;
    if (onChange) {
      onChange(gene);
    }
  }

  const getGeneValue = (geneId: string) => {
    const gene = patientGenes.find(gen => gen.geneId == geneId);
    return gene?.geneValue ? gene?.geneValue : "N/A";
  }

  return (
    <>
      {genesList?.map((genItem) =>
        <div
          key={genItem.id}
          className="mb-3 d-flex justify-content-between">
          <label htmlFor={genItem.id}
            className="fw-bold me-3">{genItem.geneName}:
          </label>
          <select
            disabled={!isEditMode}
            id={genItem.id}
            name={genItem.id}
            className='w-50'
            onChange={handleChange}
            value={getGeneValue(genItem.id)}
          >
            <option value="">
              N/A
            </option>
            {genItem.possibleValues?.map((valueItem) =>
              <option key={genItem.id + valueItem} value={valueItem}>
                {valueItem}
              </option>
            )}
          </select>
        </div>
      )}
    </>
  )
};
