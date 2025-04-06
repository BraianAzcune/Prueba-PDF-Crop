import { useState, useRef } from "react";
import "./styles.css";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// Configuramos el worker de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function App() {
	const [pdfImage, setPdfImage] = useState<string>(""); // Imagen base64 extraída del PDF
	const [crop, setCrop] = useState<Crop | undefined>(undefined);
	const [finalCroppedImage, setFinalCroppedImage] = useState<string>("");
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.type !== "application/pdf") {
			alert("Please select a PDF file.");
			return;
		}
		const fileURL = URL.createObjectURL(file);
		try {
			const loadingTask = pdfjsLib.getDocument(fileURL);
			const pdf = await loadingTask.promise;
			const page = await pdf.getPage(1);
			const scale = 2; // Ajusta el scale para mejorar la visualización
			const viewport = page.getViewport({ scale });
			const canvas = canvasRef.current;
			if (canvas) {
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				const context = canvas.getContext("2d");
				const renderContext = {
					canvasContext: context!,
					viewport,
				};
				await page.render(renderContext).promise;
				// Convertimos el canvas en imagen (base64)
				const dataUrl = canvas.toDataURL("image/png");
				setPdfImage(dataUrl);
			}
		} catch (error) {
			console.error("Error loading PDF:", error);
		}
	};

	const handleCropChange = (newCrop: Crop) => {
		setCrop(newCrop);
	};

	const handleCropComplete = (crop: Crop, percentCrop: Crop) => {
		console.log("Crop complete:", crop, percentCrop);
	};

	const handleConfirmCrop = () => {
		if (imageRef.current && crop && crop.width && crop.height) {
			const croppedImageUrl = getCroppedImg(imageRef.current, crop);
			setFinalCroppedImage(croppedImageUrl);
		} else {
			alert("Please make a selection first.");
		}
	};

	// Helper para extraer la imagen recortada
	const getCroppedImg = (image: HTMLImageElement, crop: Crop) => {
		const canvas = document.createElement("canvas");
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return "";
		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height,
		);
		return canvas.toDataURL("image/png");
	};

	return (
		<div className="App">
			{!pdfImage && (
				<>
					<button
						type="button"
						onClick={() => document.getElementById("file-input")?.click()}
					>
						Select PDF File
					</button>
					<input
						type="file"
						id="file-input"
						accept="application/pdf"
						style={{ display: "none" }}
						onChange={handleFileSelect}
					/>
				</>
			)}
			{/* Canvas oculto usado para renderizar el PDF */}
			<canvas ref={canvasRef} style={{ display: "none" }} />
			{pdfImage && (
				<div className="crop-container">
					<ReactCrop
						crop={crop}
						onChange={handleCropChange}
						onComplete={handleCropComplete}
					>
						<img ref={imageRef} src={pdfImage} alt="PDF to crop" />
					</ReactCrop>
					<button
						type="button"
						className="crop-button"
						onClick={handleConfirmCrop}
					>
						Confirm Crop
					</button>
				</div>
			)}
			{finalCroppedImage && (
				<div className="result-container">
					<h3>imagen resultante</h3>
					<img
						src={finalCroppedImage}
						alt="Cropped Result"
						style={{ maxWidth: "100%" }}
					/>
				</div>
			)}
		</div>
	);
}
