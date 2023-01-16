import AppLayout from "@/components/AppLayout";
import SimpleInventoryTable from "@/components/SimpleInventoryTable";
import SimpleSalesChart from "@/components/SimpleSalesChart";
import { OpenInNewSharp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta
                    name="description"
                    content="Singtel Sales Prediction and Inventory App"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppLayout page="Dashboard">
                <div className="flex justify-between flex-wrap">
                    <div className="p-5 w-max">
                        <div className="flex gap-2 items-center mb-5">
                            <h3 className="text-xl">Sales</h3>
                            <IconButton><OpenInNewSharp/></IconButton>
                        </div>
                        <SimpleSalesChart />
                    </div>
                    <div className="p-5 w-max">
                        <div className="flex gap-2 items-center mb-5">
                            <h3 className="text-xl">Recent Transactions</h3>
                            <IconButton><OpenInNewSharp/></IconButton>
                        </div>
                        <SimpleInventoryTable />
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
