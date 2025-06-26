import { PrismaClient } from '@prisma/client';
import e, { Request, Response } from 'express';
import { sendEmail } from '../utils/EmailService';

const prisma = new PrismaClient();

export const sendCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'E-mail inválido' });
  }

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  /* Validação de e-mail existente comentada
  const existing = await prisma.users.findUnique({
    where: { email: email },
  });

  if (existing) {
  } else {
    console.log('O e-mail não foi encontrado.', new Date()); 
  }
  */

  await prisma.users.update({
    where: { email: email  },
    data: {
      access_code: code,
      expires_at: expiresAt,
    },
  });
  await sendEmail(email, code);

  res.json({ message: 'Código enviado para seu e-mail' });
};

export const validateCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  const record = await prisma.users.findFirst({
    where: {
      email: email,
      access_code: code,
      expires_at: {
        gte: new Date(),
      },
    },
  });

  if (!record) {
    return res.status(400).json({ error: 'Código inválido ou expirado' });
  }

  res.json({ message: 'Código validado com sucesso!' });
};
