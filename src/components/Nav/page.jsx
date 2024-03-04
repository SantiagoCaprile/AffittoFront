import Link from "next/link";
import { User, UserPlus, Home, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Nav() {
	const { data: session } = useSession();

	const handleLogout = async () => {
		try {
			await signOut();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className="flex items-center justify-between bg-blue-500 min-w-full pl-3 pr-3">
			<div className=" text-white text-2xl font-bold p-4 flex gap-1 items-baseline">
				<Home />
				<Link href="/">Affitto</Link>
				<div className="flex gap-6 text-base pl-4">
					<Link className="hover:underline" href="/clientes">
						Clientes
					</Link>
					<Link className="hover:underline" href="/propiedades">
						Propiedades
					</Link>
				</div>
			</div>
			<ul className="flex justify-end border-l-2 gap-4 px-6">
				<li className="text-white font-bold hover:underline">
					{session ? (
						<Link href="/profile" className="flex gap-2">
							<User />
							<span>
								{session.user.name.toUpperCase() || "Autorizado"}
								{" - "}
								{session.user.role || "Usuario"}
							</span>
						</Link>
					) : (
						<Link href="/login" className="flex gap-2">
							<User />
							<span>Iniciar Sesión</span>
						</Link>
					)}
				</li>
				<li className="text-white font-bold hover:underline">
					{session && (
						<button onClick={handleLogout} className="flex gap-2 items-center">
							<LogOut height={18} />
							<span>Cerrar Sesión</span>
						</button>
					)}
				</li>
			</ul>
		</nav>
	);
}
