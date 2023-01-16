import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "week", headerName: "Week", width: 300 },
    { field: "amount", headerName: "Amount", width: 300 },
];

export default function SalesTable({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (!data) return;

        const tableData = data.map((e, i) => {
            return {
                id: e.id,
                week: e.week.id,
                amount: e.amount,
            };
        });

        setRows(tableData);
    }, [data]);

    if (!data.length)
        return null;

    return (
        <div className="flex justify-center mt-10">
            <div style={{ height: 400, width: 650 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );
}
