import type { MiembroEquipo } from "./type";
import { useOurTeam } from "../../hooks/useOurTeam";
import DesktopOurTeam from "./components/DesktopOurTeam";
import MobileOurTeam from "./components/MobileOurTeam";

export default function OurTeam() {
    const { data: members = [] as MiembroEquipo[], isLoading: loading, activeId, toggleMember } = useOurTeam();

    if (loading) {
        return <div className="text-neutral-500 w-full text-center py-16">Cargando equipo…</div>;
    }

    if (members.length === 0) {
        return <div className="text-neutral-500 w-full text-center py-16">Aún no hay miembros.</div>;
    }

    return (
        <>
            <MobileOurTeam members={members} activeId={activeId} toggleMember={toggleMember} />
            <DesktopOurTeam members={members} toggleMember={toggleMember} />
        </>
    );
}
