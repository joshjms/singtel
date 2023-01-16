import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";

const columns = [
    { field: "date", headerName: "Date", width: 100 },
    { field: "device", headerName: "Device", width: 180 },
    { field: "amount", headerName: "Amount", width: 100 },
    { field: "type", headerName: "Type", width: 100 },
];

const rows = [];

export default function SimpleInventoryTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const getTransactions = async () => {
            await axios
                .get(process.env.NEXT_PUBLIC_API_BASE_URL + "transactions/", {})
                .then((response) => {
                    const data = response.data;
                    const transactions = data.slice(-10).reverse();

                    const tableData = transactions.map((e, i) => {
                        return {
                            id: i,
                            date: e.transactionDate,
                            device: e.device.name,
                            amount: e.amount,
                            type: e.transactionType,
                        };
                    });

                    setRows(tableData);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getTransactions();
    }, []);

    return (
        <div style={{ height: 300, width: 500 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={4}
                rowsPerPageOptions={[3]}
            />
        </div>
    );
}
