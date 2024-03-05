import React from "react";
import Link from "next/link";
import { AreaChartIcon, UserCog, FileClock } from "lucide-react";

export const metadata = {
	title: "Affitto",
	description: "Affitto - Alquileres en Argentina",
};

export default async function Page() {
	return (
		<div className=" flex flex-col flex-1">
			<div className="flex flex-col flex-1 items-center justify-end bg-[url('../../public/images/casa.webp')] bg-cover bg-center min-h-[450px] text-white">
				<div className="flex flex-col justify-start ">
					<div className="text-8xl text-left font-medium z-10 p-5">
						<p>Somos Affitto</p>
						<p>Tu sistema inmobiliario</p>
					</div>
					<div>
						<form className="flex justify-evenly items-center p-3 text-base  rounded-t-md from-transparent to-blue-900 bg-gradient-to-b">
							<Link href="/gestionUsuarios">
								<button className="flex gap-1 items-center bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1">
									<UserCog size="24" />
									<span>Administrar</span>
								</button>
							</Link>
							<Link href="/reportes">
								<button className="flex gap-1 items-center bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1">
									<AreaChartIcon size="24" />
									<span>Reportes</span>
								</button>
							</Link>
							<Link href="/auditoria">
								<button className="flex gap-1 items-center bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1">
									<FileClock size="24" />
									<span>Auditar</span>
								</button>
							</Link>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
