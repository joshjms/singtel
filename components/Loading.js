import Head from "next/head";
import { CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <>
            <Head>
                <title>Loading</title>
            </Head>
            <div className="h-screen w-full flex justify-center items-center">
                <CircularProgress />
            </div>
        </>
    );
}
