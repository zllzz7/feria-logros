
"use client";

import { useState, type FormEvent } from "react";

type Ticket = {
  id: string;
  name: string;
  institution: string;
  role: string;
  reason: string;
  date: string;
  time: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState("");
  const [reason, setReason] = useState("");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setError("");
    setTicket(null);

    try {
      const response = await fetch("/api/visitantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          institution,
          role,
          reason,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "No se pudo guardar el registro."
        );
      }

      const saved = result.visitor;
      const createdAt = new Date(saved.createdAt);

      setTicket({
        id: saved.ticket,
        name: saved.name,
        institution: saved.institution,
        role: saved.role ?? "",
        reason: saved.reason,
        date: new Intl.DateTimeFormat("es-SV", {
          dateStyle: "long",
          timeZone: "America/El_Salvador",
        }).format(createdAt),
        time: new Intl.DateTimeFormat("es-SV", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/El_Salvador",
        }).format(createdAt),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al registrar al visitante."
      );
    } finally {
      setIsSaving(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-white/10 bg-[#091711]/80 px-4 py-3.5 text-sm text-[#F1F5F3] outline-none transition placeholder:text-[#71877A] focus:border-[#A3E635]/60 focus:ring-2 focus:ring-[#A3E635]/10";

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#0B1511] text-[#F1F5F3]">
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[450px] w-[450px] rounded-full bg-[#166534]/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-[#A3E635]/10 blur-[120px]" />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#A3E635]/20 bg-[#166534]/30 font-bold text-[#A3E635]">
            FL
          </div>
          <div>
            <p className="text-sm font-bold tracking-[0.18em]">
              FERIA DE LOGROS
            </p>
            <p className="mt-1 text-xs text-[#A7B8AE]">
              Registro de visitantes
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[#A7B8AE] sm:flex">
          <span className="h-2 w-2 rounded-full bg-[#A3E635] shadow-[0_0_10px_#A3E635]" />
          Sistema de registro
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-8 sm:pt-14">
        <div className="mb-9 max-w-2xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#A3E635]">
            BIENVENIDO/A
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Tu visita comienza{" "}
            <span className="text-[#A3E635]">aquí.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#A7B8AE] sm:text-base">
            Registra tus datos para generar tu comprobante de visita a nuestra
            Feria de Logros. Completa el formulario y listo.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[28px] border border-white/10 bg-[#102A23]/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Datos del visitante</h2>
                <p className="mt-2 text-sm text-[#A7B8AE]">
                  Los campos con son obligatorios.
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#166534]/30 text-xl text-[#A3E635]">
                +
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre completo  
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Escribe tu nombre completo"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="institution" className="text-sm font-medium">
                  Institución o procedencia 
                </label>
                <input
                  id="institution"
                  name="institution"
                  required
                  maxLength={160}
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Centro educativo, empresa o procedencia"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="role" className="text-sm font-medium">
                  Grado, cargo o relación
                </label>
                <input
                  id="role"
                  name="role"
                  maxLength={100}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ej. 2.º año, docente, familiar..."
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="reason" className="text-sm font-medium">
                  Motivo de visita
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className={fieldClass}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Visitar los proyectos">
                    Visitar los proyectos
                  </option>
                  <option value="Acompañar a un estudiante">
                    Acompañar a un estudiante
                  </option>
                  <option value="Docente o invitado">Docente o invitado</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="rounded-2xl border border-[#A3E635]/15 bg-[#A3E635]/5 p-4">
                <p className="text-sm font-medium text-[#D9F99D]">
                  Fecha y hora automáticas
                </p>
                <p className="mt-1 text-xs leading-5 text-[#A7B8AE]">
                  Se registrarán al guardar el comprobante, usando la hora local.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#A3E635] px-5 py-4 font-semibold text-[#102016] transition hover:bg-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#A3E635] focus:ring-offset-2 focus:ring-offset-[#102A23] active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
              >
                {isSaving ? "Guardando registro..." : "Generar comprobante"}
                <span aria-hidden="true">{isSaving ? "…" : "↗"}</span>
              </button>
            </form>
          </section>

          <aside className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-2xl sm:p-7">
            <div className="mb-7 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#A3E635]">
                  COMPROBANTE
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  Ticket de visita
                </h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] tracking-wider text-[#A7B8AE]">
                {ticket ? "GUARDADO" : isSaving ? "GUARDANDO..." : "VISTA PREVIA"}
              </span>
            </div>

            {ticket ? (
              <div className="overflow-hidden rounded-2xl border border-[#A3E635]/20 bg-[#102A23]/80">
                <div className="border-b border-dashed border-white/15 p-5">
                  <p className="text-xs text-[#A7B8AE]">Número de ticket</p>
                  <p className="mt-2 break-all text-xl font-bold tracking-wide text-[#A3E635]">
                    {ticket.id}
                  </p>
                  <p className="mt-2 text-xs text-[#A7B8AE]">
                    Feria de Logros · Visitante
                  </p>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-xs text-[#A7B8AE]">Nombre</p>
                    <p className="mt-1 break-words font-medium">{ticket.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A7B8AE]">Procedencia</p>
                    <p className="mt-1 break-words">{ticket.institution}</p>
                  </div>
                  {ticket.role && (
                    <div>
                      <p className="text-xs text-[#A7B8AE]">Grado o cargo</p>
                      <p className="mt-1 break-words">{ticket.role}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[#A7B8AE]">Motivo</p>
                    <p className="mt-1">{ticket.reason}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                    <div>
                      <p className="text-xs text-[#A7B8AE]">Fecha de creación</p>
                      <p className="mt-1 text-sm">{ticket.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A7B8AE]">Hora de creación</p>
                      <p className="mt-1 text-sm">{ticket.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 bg-black/10 p-6 sm:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#A3E635]/20 bg-[#166534]/20 text-2xl text-[#A3E635]">
                  ◈
                </div>
                <h3 className="text-lg font-medium">
                  Tu ticket aparecerá aquí
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#A7B8AE]">
                  Cuando completes el formulario, verás un comprobante con tus
                  datos y la fecha y hora de creación.
                </p>
                <div className="mt-7 space-y-4">
                  {["Datos del visitante", "Número de comprobante", "Fecha y hora"].map(
                    (item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-xs text-[#A3E635]">
                          0{index + 1}
                        </span>
                        <span className="text-sm text-[#A7B8AE]">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <p className="mt-5 text-xs leading-5 text-[#81958A]">
              El comprobante se muestra cuando el registro se guarda
              correctamente en la base de datos.
            </p>
          </aside>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-[#81958A]">
          Feria de Logros · Sistema de registro de visitantes
        </footer>
      </section>
    </main>
  );
}

