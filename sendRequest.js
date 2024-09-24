export const editReportData = async (id, reportBody) => {
  const response = await fetch(
    `https://najm.alexondev.net/api/report-classification/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportBody),
    }
  );
  if (!response.ok) {
    throw new Error("Coludn't Fetch Request Data");
  }
  const data = await response.json();
  return data;
};
