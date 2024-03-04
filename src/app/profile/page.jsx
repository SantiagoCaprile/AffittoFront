import Image from "next/image";
import userImage from "../../../public/images/user.jpg";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { CambiarPass } from "@/components/CambiarPass/page";

export default async function UserProfile() {
	const session = await getServerSession(options).then((session) => {
		console.log("session", session);
		return session;
	});

	if (!session) {
		redirect("/login");
	}
	return (
		<div className="w-1/2 mx-auto p-4 flex flex-1 flex-col justify-center">
			<div className="flex flex-col md:flex-row pb-2 items-center ">
				<div className="w-full md:w-1/2 mb-6">
					<div className="relative square-image-wrapper mb-6">
						<div className="flex justify-center min-h-full min-w-full rounded-md">
							<Image
								src={userImage}
								alt={"user"}
								width={300}
								className="rounded-lg min-h-full"
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
				</div>
				<div className="w-full md:w-1/2 mb-6 md:pl-6 flex flex-col">
					<h1 className="text-4xl mb-2">
						{session.user.name.replace(".", " ")}
					</h1>
					<div className="mb-4 flex flex-col h-1/2 justify-evenly">
						<p className="text-gray-700">
							Email: <span className="text-blue-500">{session.user.email}</span>
						</p>
						<p className="text-gray-700">
							Cargo: <span className="text-blue-500">{session.user.role}</span>
						</p>
					</div>
					<CambiarPass user={session.user} />
				</div>
			</div>
		</div>
	);
}
