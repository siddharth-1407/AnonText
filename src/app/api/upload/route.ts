import { writeFile } from 'fs';

export async function POST(req: Request) {
	const data = await req.formData();
	const file: File = data.get('file') as unknown as File;
	if (!file) {
		return Response.json(
			{
				success: false,
				message: 'file is required!',
			},
			{ status: 400 }
		);
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);
	const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
	const filename = uniqueSuffix;
	const filePath = `./public/tmp/${filename}`;
	await writeFile(filePath, buffer, (err) => {
		if (err) throw err;
		return Response.json({ success: false, message: 'Error uploading file' });
	});
	return Response.json({ success: true, message: 'file uploaded to local dir', localPath: filePath });
}
