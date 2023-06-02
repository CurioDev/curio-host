import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import DriveByImagePng from "../images/drive_by_image.png";
import JoystickPng from "../images/joystick_controller.png";

export default function Home() {
	const { roomID } = useParams();

	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			height="100vh"
		>
			<Typography variant="h2" gutterBottom pt={2}>
				Curio Host
			</Typography>
			<Stack direction="row" spacing={2}>
				<Link href="/drive-by-image">
					<Card sx={{ width: 300 }}>
						<CardActionArea>
							<CardMedia
								component="img"
								image={DriveByImagePng}
								style={{ padding: 10 }}
							/>
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
								>
									Drive By Image
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									Drive Curio with any image.
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Link>
				<Link href="/joystick">
					<Card sx={{ width: 300 }}>
						<CardActionArea>
							<CardMedia
								component="img"
								image={JoystickPng}
								style={{ padding: 20 }}
							/>
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
								>
									Joystick Controller
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									Drive Curio with joystick controller.
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Link>
			</Stack>
		</Stack>
	);
}
