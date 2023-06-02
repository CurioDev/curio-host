"use client";
import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import QRCode from "qrcode";
import { processReceivedData } from "../services/peerService";
import { PeerData } from "../services/types";
import Peer from "peerjs";

export default function Joystick() {
	const [qrCode, setQrCode] = useState<string | undefined>(undefined);
	const [isPeerConnected, setIsPeerConnected] = useState<boolean>(false);

	useEffect(() => {
		const roomID: string = `curio-joystick-controller-${Date.now()}`; /*"";*/ /*"Cruio-Joystick-Controller-1684517547128";*/

		const peer = new Peer(roomID);
		peer.on("open", () => {
			const url = `https://curio-joystick.vercel.app/${roomID}`; //Prod
			// const url = `http://localhost:3001/${roomID}`;

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
				Joystick
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
