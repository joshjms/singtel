import { NotificationsNoneOutlined } from "@mui/icons-material";

export default function Header() {
    const getCurrentDate = () => {
        const d = new Date();

        return (
            <div className="text-center">
                <p className="text-xl">
                    {d.toLocaleString("en-US", {
                        timeZone: "Asia/Singapore",
                        weekday: "long",
                    })}
                </p>
                <p className="font-light text-sm">
                    {d.toLocaleString("en-US", {
                        timeZone: "Asia/Singapore",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>
        );
    };

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h1 className="text-3xl"> Dashboard </h1>
                <div className="hidden lg:block">{getCurrentDate()}</div>

                <div className="flex gap-3 items-center">
                    <div className="bg-gray-100 rounded-2xl p-2">
                        <NotificationsNoneOutlined />
                    </div>
                    <p>Joshua James</p>
                </div>
            </div>
        </>
    );
}
