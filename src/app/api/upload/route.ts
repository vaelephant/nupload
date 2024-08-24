import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // 禁用默认的 body 解析
  },
};

export async function POST(req: NextRequest) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  // 确保上传目录存在
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  try {
    const formData = await req.formData(); // 获取表单数据
    const file = formData.get('file') as File; // 获取文件
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const filePath = path.join(uploadDir, file.name); // 使用原始文件名
    const buffer = Buffer.from(await file.arrayBuffer()); // 将文件数据转换为 Buffer
    fs.writeFileSync(filePath, buffer); // 将文件保存到服务器

    return NextResponse.json({ message: 'File uploaded successfully', fileName: file.name });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}