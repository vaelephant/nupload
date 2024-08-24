import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // 禁用 Next.js 的默认 body 解析
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

    const files = formData.getAll('files') as unknown as File[]; // 获取所有文件
    if (!files || files.length === 0) {
      return NextResponse.json({ error: '未上传文件' }, { status: 400 });
    }

    // 处理每个文件
    const savedFiles = [];
    for (const file of files) {
      const filePath = path.join(uploadDir, file.name); // 使用原始文件名
      const buffer = Buffer.from(await file.arrayBuffer()); // 将文件数据转换为 Buffer
      fs.writeFileSync(filePath, buffer); // 将文件保存到服务器
      savedFiles.push(file.name);
    }

    return NextResponse.json({ message: '文件上传成功', fileNames: savedFiles });
  } catch (error) {
    console.error('上传文件时出错:', error);
    return NextResponse.json({ error: '文件上传失败' }, { status: 500 });
  }
}