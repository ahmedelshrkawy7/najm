import UsableReport from "./UsableReport"

const ReportEscalation = () => {
  return (
    <div className="px-5 py-3 flex flex-col gap-2">
        <UsableReport selectTitle={"سبب التصعيد"} textAreaLabel={"الملاحظات"}/>
    </div>
  )
}

export default ReportEscalation