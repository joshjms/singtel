import { useState, useEffect } from "react";
import axios from "axios";

import AppLayout from "@/components/AppLayout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Head from "next/head";
import {
    Button,
    ButtonGroup,
    CircularProgress,
    Divider,
    FormControl,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import SalesChart from "@/components/SalesChart";
import PredictionChart from "@/components/PredictionChart";
import ModalForms from "@/components/ModalForms";
import SalesTable from "@/components/SalesTable";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

const devices = [
    "iPhone 13",
    "iPhone 14",
    "Galaxy S21",
    "Galaxy S22",
    "Galaxy S23",
];

export default function Statistics() {
    const [device, setDevice] = useState("iPhone 13");
    const [data, setData] = useState(null);
    const [amount, setAmount] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (!device) return;
        const getData = async (device) => {
            await axios
                .get(process.env.NEXT_PUBLIC_API_BASE_URL + "device/sales/", {
                    params: {
                        device: device,
                    },
                })
                .then((response) => {
                    const data = response.data;
                    setData(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getData(device);
    }, [device, isLoading]);

    const handleUpdate = async () => {
        setLoading(true);
        await axios
            .post(process.env.NEXT_PUBLIC_API_BASE_URL + "sales/create/", {
                device: device,
                amount: amount,
            })
            .then((response) => {
                setMessage(response.data.message);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const handleRunModel = async () => {
        setLoading(true);
        await axios
            .post(process.env.NEXT_PUBLIC_API_BASE_URL + "prediction/run/", {})
            .then((response) => {
                setMessage(response.data.message);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!device) {
        return (
            <>
                <Head>
                    <title>Statistics</title>
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
                <AppLayout page="Statistics">
                    <FormControl className="w-40 mb-10">
                        <InputLabel id="device">Type</InputLabel>
                        <Select
                            labelId="device"
                            id="device-select"
                            value={device}
                            label="Type"
                            onChange={(e) => {
                                setData(null);
                                setDevice(e.target.value);
                            }}
                        >
                            {devices.map((e, i) => {
                                return (
                                    <MenuItem key={i} value={e}>
                                        {e}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </AppLayout>
            </>
        );
    }

    const Graph = data ? (
        <>
            <SalesChart
                data={data.sales.sort((a, b) => a.week.id - b.week.id).slice(-20)}
                prediction={data.predicted}
                device={device}
            />
            <SalesTable data={data.sales} device={device} />
        </>
    ) : device ? (
        <div className="flex justify-center">
            <CircularProgress />
        </div>
    ) : null;

    const Prediction = data ? (
        data.isEOL ? (
            <div className="flex justify-center">
                <p>Device is no longer sold</p>
            </div>
        ) : (
            <>
                <PredictionChart
                    data={data.predicted.sort((a, b) => a.week.id - b.week.id).slice(-10)}
                    device={device}
                />
            </>
        )
    ) : device ? (
        <div className="flex justify-center">
            <CircularProgress />
        </div>
    ) : null;

    const Message = message ? (
        <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => {
                setMessage("");
            }}
        >
            <Alert
                onClose={() => {
                    setMessage("");
                }}
                severity="success"
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    ) : null;

    return (
        <>
            <Head>
                <title>Statistics</title>
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
            <AppLayout page="Statistics">
                {Message}
                <FormControl className="w-40 mb-10">
                    <InputLabel id="device">Type</InputLabel>
                    <Select
                        labelId="device"
                        id="device-select"
                        value={device}
                        label="Type"
                        onChange={(e) => {
                            setData(null);
                            setDevice(e.target.value);
                        }}
                    >
                        {devices.map((e, i) => {
                            return (
                                <MenuItem key={i} value={e}>
                                    {e}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <div className="mb-10">
                    <h2 className="text-center text-3xl mb-5">Sales</h2>
                    {Graph}
                </div>
                <div className="mb-10">
                    <h2 className="text-center text-3xl mb-5">Prediction</h2>
                    {Prediction}
                </div>

                <Divider className="my-10" />

                {data && !data.isEOL ? (
                    <>
                        <FormControl>
                            <h3 className="text-3xl mb-5">Add/Update Sales</h3>
                            <TextField
                                variant="outlined"
                                id="outlined-number"
                                label="Amount"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />
                            <ButtonGroup className="mt-3">
                                <Button
                                    onClick={handleUpdate}
                                    variant="outlined"
                                >
                                    Add
                                </Button>
                                <Button
                                    onClick={handleRunModel}
                                    variant="outlined"
                                >
                                    Run Predictions
                                </Button>
                            </ButtonGroup>
                        </FormControl>

                        <Divider className="my-10" />
                    </>
                ) : null}
            </AppLayout>
        </>
    );
}
