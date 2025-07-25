
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { mkdir } from 'fs/promises';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file found' });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create a unique filename to avoid overwrites
  const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
  const uploadDir = path.join(process.cwd(), 'public/images/post');
  const uploadPath = path.join(uploadDir, filename);

  try {
    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });
    
    // Write the file to the public/images/post directory
    await writeFile(uploadPath, buffer);
    console.log(`File saved to ${uploadPath}`);
    
    // Return the public path to the file
    const publicPath = `/images/post/${filename}`;
    return NextResponse.json({ success: true, path: publicPath });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ success: false, message: 'Error saving file' }, { status: 500 });
  }
}
