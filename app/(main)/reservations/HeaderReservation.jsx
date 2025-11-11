import { Search, Settings, Bell } from "lucide-react";

const userInfo = [
    { name: "Jaylon Dorwart", role: "Admin", pathImg: "" }
];

export const Header = () => {
    return (
        <header className="bg-card px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Réservation</h1>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    {userInfo.map((userInfo, index) => (
                        <div key={index} className="flex items-center gap-2 ml-2">
                        <img
                            src={userInfo.pathImg ?? "default-avatar-icon.jpg"}
                            alt={userInfo.name}
                            className="w-9 h-9 rounded-full"
                        />
                        <div className="text-sm">
                            <div className="font-bold
                            ">{userInfo.name}</div>
                            <div className="text-muted-foreground text-xs">{userInfo.role}</div>
                        </div>
                        </div>
                    ))}
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted relative">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                    </button>
                </div>
            </div>
        </header>
    );
};
