import React from "react";
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL;

const ReportesPage = () => {
	return (
		<div className="flex flex-1">
			<iframe
				style={{
					background: "#e7effe",
					border: "none",
					borderRadius: "2px",
					boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
					width: "100%",
					height: "89vh",
				}}
				src={DASHBOARD_URL}
			></iframe>
		</div>
	);
};

export default ReportesPage;
