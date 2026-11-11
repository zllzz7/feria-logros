
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";



export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, institution, role, reason } = body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof institution !== "string" ||
      !institution.trim()
    ) {
      return NextResponse.json(
        { error: "El nombre y la institución son obligatorios." },
        { status: 400 }
      );
    }

    if (
      name.trim().length > 120 ||
      institution.trim().length > 160 ||
      (role != null &&
        (typeof role !== "string" || role.length > 100)) ||
      (reason != null &&
        (typeof reason !== "string" || reason.length > 100))
    ) {
      return NextResponse.json(
        { error: "Uno de los campos supera la longitud permitida." },
        { status: 400 }
      );
    }

    const year = new Intl.DateTimeFormat("en", {
      year: "numeric",
      timeZone: "America/El_Salvador",
    }).format(new Date());

    const visitor = await prisma.visitante.create({
      data: {
        ticket: `FL-${year}-${randomBytes(5).toString("hex").toUpperCase()}`,
        name: name.trim(),
        institution: institution.trim(),
        role: typeof role === "string" ? role.trim() || null : null,
        reason:
          typeof reason === "string" && reason.trim()
            ? reason.trim()
            : "No especificado",
      },
    });

    return NextResponse.json(
      {
        visitor: {
          ...visitor,
          createdAt: visitor.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al guardar visitante:", error);

    return NextResponse.json(
      { error: "No se pudo guardar el registro. Intenta nuevamente." },
      { status: 500 }
    );
  }
}
