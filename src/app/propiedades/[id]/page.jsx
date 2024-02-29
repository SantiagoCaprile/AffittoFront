"use client";
import React from "react";
import NextImage from "next/image";
import { useState, useEffect } from "react";
import { Pencil, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Propiedad from "@/classes/Propiedad";
import CargarSenia from "@/components/CargarSenia/page";
import OperacionNueva from "@/components/OperacionNueva/page";
import OperacionInfo from "@/components/OperacionInfo/page";
import PosiblesInteresados from "@/components/PosiblesInteresados/page";
import SeniaInfo from "@/components/SeniaInfo/page";
import Map from "@/components/Map";

const images = [
	"/images/house1.webp",
	"/images/house2.webp",
	"/images/house3.webp",
];

const clientesInteresados = [
	{
		_id: "1",
		nombre_razon_social: "Juan Perez",
		celular: "3512345678",
		email: "pepe",
		cuit: "	20155555551",
		operacion: "Alquiler",
	},
	{
		_id: "2",
		nombre_razon_social: "Jose Gomez",
		celular: "3512345678",
		email: "pepe",
		cuit: "	20155555551",
		operacion: "Venta",
	},
	{
		_id: "3",
		nombre_razon_social: "Maria Rodriguez",
		celular: "3512345678",
		email: "pepe",
		cuit: "	20155555551",
		operacion: "Alquiler",
	},
];

const InfoPropiedadPage = () => {
	const router = useRouter();
	const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
	const [propiedad, setPropiedad] = useState({});
	const [agregarSenia, setAgregarSenia] = useState(false);
	const [verOperaciones, setverOperaciones] = useState(false);
	const [operacionSeleccionada, setOperacionSeleccionada] = useState(null);
	const [operaciones, setOperaciones] = useState([]);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		const _id = document.location.pathname.split("/")[2];
		async function fetchData() {
			const propiedad = await Propiedad.buscarPropiedad(_id);
			setPropiedad(propiedad);
			setOperaciones(propiedad.operaciones);
			console.log(propiedad);
		}
		fetchData();
		setUpdate(false);
	}, [update]);

	const handleImageClick = (index) => {
		setImagenSeleccionada(index);
	};

	const toggleOperacionSeleccionada = (operacion) => {
		operacionSeleccionada === operacion
			? setOperacionSeleccionada(null)
			: setOperacionSeleccionada(operacion);
	};

	return (
		<div className="flex flex-1 flex-col justify-center items-center bg-[#E8EFFF] p-4 min-w-fit">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4">
				<div className="flex justify-between mb-4">
					<h2 className="text-2xl font-bold mb-4">Información de Propiedad</h2>
					<div className="flex gap-2">
						<Link
							href={`/propiedades/${propiedad._id}/editar`}
							className="flex gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<Pencil size={20} />
							Editar
						</Link>
						<Link
							href="/propiedades"
							className="flex gap-2 bg-blue-300 hover:bg-blue-500 transition-all text-white px-4 py-2 rounded-md items-center justify-center"
						>
							<ChevronLeft size={20} />
							Volver
						</Link>
					</div>
				</div>
				<div className="flex items-center">
					<div className="flex flex-col gap-2">
						<div className="m-2 flex flex-col gap-2">
							<div className="min-w-[616px] h-[400px] pb-2 flex justify-start">
								<NextImage
									src={
										imagenSeleccionada ? images[imagenSeleccionada] : images[0]
									}
									alt={"house"}
									key={0}
									width={616}
									height={500}
									className="rounded-lg cursor-pointer transition-all ease-in-out duration-300"
									style={{ objectFit: "cover" }}
								/>
							</div>
							<div className="flex flex-wrap mt-2 gap-2">
								{images.map((image, index) => (
									<NextImage
										src={image}
										alt={"house"}
										key={index}
										width={200}
										height={250}
										className={
											"rounded-lg cursor-pointer transition-opacity duration-300 " +
											(imagenSeleccionada == index
												? "opacity-100"
												: "opacity-50")
										}
										style={{ objectFit: "cover" }}
										onClick={() => handleImageClick(index)}
									/>
								))}
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-between">
						<div className="grid grid-cols-2 gap-2 w-full">
							<div>
								<label className="block font-bold">Domicilio:</label>
								<span>
									{propiedad.domicilio?.calle ? propiedad.domicilio?.calle : ""}{" "}
									{propiedad.domicilio?.altura
										? propiedad.domicilio?.altura
										: ""}{" "}
									{propiedad.domicilio?.piso ? propiedad.domicilio?.piso : ""}{" "}
									{propiedad.domicilio?.dpto ? propiedad.domicilio?.dpto : ""}
								</span>
							</div>
							<div>
								<label className="block font-bold">Localidad:</label>
								<span>{propiedad.domicilio?.localidad}</span>
							</div>
							<div>
								<label className="block font-bold">Tipo de Propiedad:</label>
								<span>{propiedad.tipo}</span>
							</div>
							<div>
								<label className="block font-bold">Superficie:</label>
								<span>{propiedad.dimension} m2</span>
							</div>
							<div>
								<label className="block font-bold">Operaciones:</label>
								{operaciones?.filter((op) => op.tipo === "Venta").length}{" "}
								Ventas,{" "}
								{operaciones?.filter((op) => op.tipo === "Alquiler").length}{" "}
								Alquileres
							</div>
							<div>
								<label className="block font-bold">Estado:</label>
								<span>{propiedad.estado}</span>
							</div>
							<div>
								<label className="block font-bold">Descripción:</label>
								<span>{propiedad.descripcion}</span>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2 items-end pt-4">
							<button
								className="bg-orange-500 hover:bg-orange-600 transition-all text-white px-4 py-2 rounded-md flex justify-center items-center gap-2"
								onClick={() => setverOperaciones(!verOperaciones)}
							>
								Operaciones
								{verOperaciones ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
							<button
								disabled={propiedad.estado !== "Disponible"}
								className={
									styles.button +
									(propiedad.estado !== "Disponible"
										? styles.disabled
										: "bg-yellow-500 hover:bg-yellow-600") +
									" flex justify-center items-center gap-2"
								}
								onClick={() => setAgregarSenia(!agregarSenia)}
							>
								{propiedad.estado !== "Reservada"
									? "Cargar Seña"
									: "Seña Cargada"}
								{!agregarSenia ? <Eye size={18} /> : <EyeOff size={18} />}
							</button>
							<Link
								href={`/propiedades/${propiedad._id}/contratos`}
								className=" bg-fuchsia-500 hover:bg-fuchsia-600 transition-all text-white px-4 py-2 rounded-md text-center flex justify-center items-center gap-2"
							>
								<span>Contratos</span>
								<ChevronRight size={18} />
							</Link>
							<button
								disabled={propiedad.estado === "Alquilada"}
								className={
									styles.button +
									(propiedad.estado === "Alquilada"
										? styles.disabled
										: "bg-green-500 hover:bg-green-600") +
									" flex justify-center items-center gap-2"
								}
								onClick={() => router.push(`/crearContrato/${propiedad._id}`)}
							>
								Nuevo Contrato
								<ChevronRight size={18} />
							</button>
							<button className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-md">
								Vender
							</button>
							<Link
								href={`/propiedades/${propiedad._id}/tasaciones`}
								className="bg-lime-700 hover:bg-lime-900 transition-all text-white px-4 py-2 rounded-md text-center flex justify-center items-center gap-2"
							>
								<span>Tasaciones</span>
								<ChevronRight size={18} />
							</Link>
						</div>
					</div>
				</div>
			</div>
			{verOperaciones && (
				<div className="flex flex-1 justify-center px-8 pt-6 pb-8 mb-4 gap-2">
					{operacionSeleccionada && (
						<OperacionNueva
							operacion={operacionSeleccionada}
							idProp={propiedad._id}
							fuerzaUpdate={() => {
								Propiedad.buscarPropiedad(propiedad._id).then((prop) => {
									setOperaciones(prop.operaciones);
									setOperacionSeleccionada(null);
								});
							}}
						/>
					)}
					<div className="flex gap-1 flex-wrap justify-center h-fit w-2/3">
						{operaciones?.map((operacion, index) => (
							<OperacionInfo
								key={index}
								onClick={
									operacionSeleccionada
										? () => setOperacionSeleccionada(null)
										: () => toggleOperacionSeleccionada(operacion)
								}
								operacion={operacion}
							/>
						))}
						<button
							className="bg-green-500 hover:bg-green-600 text-clip h-[250px] w-[270px] transition-all text-white px-4 py-4	 rounded-md"
							onClick={() => {
								operacionSeleccionada
									? setOperacionSeleccionada(null)
									: setOperacionSeleccionada({});
							}}
						>
							Agregar Operación
						</button>
					</div>
				</div>
			)}
			{agregarSenia && (
				<CargarSenia propiedadId={propiedad._id} update={setUpdate} />
			)}
			<div className="w-2/3 h-[400px] bg-black">
				{propiedad.ubicacion?.lat ? (
					<Map
						center={[propiedad.ubicacion.lat, propiedad.ubicacion.lng]}
						zoom={16}
					>
						{({ TileLayer, Marker, Popup }) => (
							<>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								/>
								<Marker
									position={[propiedad.ubicacion.lat, propiedad.ubicacion.lng]}
								>
									<Popup>
										{propiedad.domicilio?.calle} {propiedad.domicilio?.altura},{" "}
										{propiedad.domicilio?.localidad}
									</Popup>
								</Marker>
							</>
						)}
					</Map>
				) : (
					<div className="flex justify-center items-center h-full">
						<h2 className="text-2xl font-bold text-white">Cargando Mapa...</h2>
					</div>
				)}
			</div>
			{propiedad.senias && propiedad.senias.length > 0 && (
				<div className="grid grid-cols-2 w-4/5 pt-4 gap-4 place-items-center">
					{propiedad.senias
						.sort((a, b) => {
							return new Date(b.fecha) - new Date(a.fecha);
						})
						.map((senia, index) => (
							<SeniaInfo key={index} senia={senia} />
						))}
				</div>
			)}
			<PosiblesInteresados clientes={clientesInteresados} />
		</div>
	);
};

const styles = {
	button: "transition-all text-white px-4 py-2 rounded-md ",
	disabled: "bg-gray-500 cursor-not-allowed",
};

export default InfoPropiedadPage;
