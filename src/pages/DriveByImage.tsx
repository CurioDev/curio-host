"use client";
import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import QRCode from "qrcode";
import { processReceivedData } from "../services/peerService";
import { PeerData } from "../services/types";
import Peer from "peerjs";

export default function DriveByImage() {
	const [qrCode, setQrCode] = useState<string | undefined>(undefined);
	const [isPeerConnected, setIsPeerConnected] = useState<boolean>(false);

	useEffect(() => {
		const roomID: string = `curio-drive-by-image-${Date.now()}`;

		const peer = new Peer(roomID);
		peer.on("open", () => {
			const url = `https://drive-by-image.vercel.app/${roomID}`; //Prod
			// const url = `https://localhost:3001/${roomID}`;

			console.log(url);
			QRCode.toDataURL(
				url,
				{
					width: 500,
					margin: 1,
				},
				(err, url) => {
					if (err) {
						console.error(err);
					} else {
						setQrCode(url);
					}
				}
			);
		});

		peer.on("connection", (connection) => {
			console.log(connection.peer);
			setIsPeerConnected(true);
			setQrCode(undefined);

			connection.on("data", (data) => {
				processReceivedData(data as PeerData);
			});
		});
	}, []);

	return (
		<Container className="flex min-h-screen flex-col items-center">
			<Typography variant="h2" gutterBottom pt={2}>
				Drive By Image
			</Typography>
			{qrCode && (
				<img alt="QR Code" height={500} src={qrCode} width={500} />
			)}
			{isPeerConnected && (
				<Typography variant="h2" gutterBottom pt={2}>
					Peer connected
				</Typography>
			)}
		</Container>
	);
}
