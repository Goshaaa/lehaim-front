interface Props {
  diagnosisCode: string;
}

export default function GeneticsInfoBlock({
  diagnosisCode} : Props) {
  return (
    <>
      <p>{diagnosisCode}</p>
    </>
  )
};
