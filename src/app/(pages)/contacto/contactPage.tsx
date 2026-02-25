"use client";

import { useState } from "react";
import styles from "./ContactPage.module.css";
import { site } from "../../../lib/site";
import Breadcrumbs from "@/components/Breadcrums";

// ─── TIPOS ────────────────────────────────────────────────────────────────────

type Field = "name" | "email" | "phone" | "service" | "message";

type FormState = Record<Field, string>;
type TouchedState = Partial<Record<Field, boolean>>;

const SERVICES = [
  "Mesa de ayuda y mantenimiento",
  "Relevamiento de hardware y software",
  "Soluciones de backup",
  "Hardening y control de accesos",
  "Instalaciones (cableado / Wi-Fi)",
  "Estudios de factibilidad",
  "Diseño e implementación de redes",
  "Análisis de gestión IT",
  "No sé todavía / consulta general",
];

const CONTACT_ITEMS = [
  { label: "Dirección",  value: () => site.contact.address,                         href: undefined },
  { label: "Teléfono",  value: () => site.contact.phoneDisplay ?? site.contact.phone, href: () => `tel:${site.contact.phone}` },
  { label: "E-mail",    value: () => site.contact.email,                             href: () => `mailto:${site.contact.email}` },
  { label: "Horarios",  value: () => site.contact.hours,                             href: undefined },
];

// ─── VALIDACIÓN MÍNIMA ────────────────────────────────────────────────────────

function validate(form: FormState): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!form.name.trim())                              errors.name    = "Tu nombre es necesario";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email   = "Email inválido";
  if (!form.service)                                  errors.service = "Elegí un servicio";
  if (form.message.trim().length < 10)                errors.message = "Contanos un poco más";
  return errors;
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [touched, setTouched] = useState<TouchedState>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  function set(field: Field, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function touch(field: Field) {
    setTouched(t => ({ ...t, [field]: true }));
  }

  function fieldState(field: Field): "default" | "error" | "ok" {
    if (!touched[field]) return "default";
    return errors[field] ? "error" : "ok";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Marcar todos como tocados para mostrar errores
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    if (!isValid) return;

    setStatus("sending");
    try {
      // Reemplazá esto con tu endpoint real (Resend, Formspree, etc.)
      await new Promise(r => setTimeout(r, 1400));
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className={styles.page}>
        <Breadcrumbs
                      items={[
                        { label: "Inicio", href: "/" },
                        { label: "Contacto" }, // actual
                      ]}
                      variant="soft"
                    />
      <div className={styles.inner}>
        

        {/* ── COLUMNA IZQUIERDA ── */}
        <aside className={styles.aside}>

          {/* Hero text */}
          <div className={styles.hero}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>Contacto</span>
            </div>
            <h1 className={styles.h1}>
              Hablemos<br />
              <span className={styles.h1Accent}>sin vueltas.</span>
            </h1>
            <p className={styles.sub}>
              Contanos qué necesitás y te devolvemos un diagnóstico con alcance y entregables claros. Sin compromiso.
            </p>
          </div>

          {/* WhatsApp CTA destacado */}
          <a
            className={styles.waBtn}
            href={site.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.waBtnIcon} aria-hidden="true">
              {/* WhatsApp icon SVG inline */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.096 1.508 5.814L.057 23.9c-.07.298.193.562.492.492l6.107-1.447A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.375l-.36-.213-3.724.881.899-3.714-.235-.382A9.818 9.818 0 1112 21.818z"/>
              </svg>
            </span>
            WhatsApp directo
          </a>

          {/* Separador */}
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>o dejanos un mensaje</span>
            <span className={styles.dividerLine} />
          </div>

          {/* Datos de contacto */}
          <div className={styles.contactList}>
            {CONTACT_ITEMS.map(({ label, value, href }) => (
              <div key={label} className={styles.contactItem}>
                <span className={styles.contactLabel}>{label}</span>
                {href ? (
                  <a className={styles.contactValue} href={href()}>{value()}</a>
                ) : (
                  <span className={styles.contactValue}>{value()}</span>
                )}
              </div>
            ))}
          </div>

          {/* Mapa pequeño */}
          <div className={styles.mapWrap} aria-label="Mapa de ubicación">
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27229.815807562714!2d-64.20300358916019!3d-31.4491825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a246ddaef005%3A0xeb247e51452379bf!2sSKN%20IT!5e0!3m2!1sen!2sar!4v1768334868628!5m2!1sen!2sar"
              loading="lazy"
              title="Ubicación SKN IT"
            />
            <div className={styles.mapFx} aria-hidden="true" />
            <div className={styles.mapBadge} aria-hidden="true">
              <span className={styles.mapDot} />
              Córdoba, Argentina
            </div>
          </div>

        </aside>

        {/* ── FORMULARIO ── */}
        <div className={styles.formWrap}>
          {status === "ok" ? (
            <SuccessState />
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulario de contacto"
            >
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Envianos un mensaje</h2>
                <p className={styles.formSub}>Respondemos dentro del horario laboral.</p>
              </div>

              <div className={styles.fields}>

                {/* Nombre */}
                <Field
                  label="Nombre *"
                  id="name"
                  state={fieldState("name")}
                  error={errors.name}
                >
                  <input
                    id="name"
                    type="text"
                    className={`${styles.input} ${styles[`input--${fieldState("name")}`]}`}
                    value={form.name}
                    onChange={e => set("name", e.target.value)}
                    onBlur={() => touch("name")}
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                </Field>

                {/* Email */}
                <Field
                  label="Email *"
                  id="email"
                  state={fieldState("email")}
                  error={errors.email}
                >
                  <input
                    id="email"
                    type="email"
                    className={`${styles.input} ${styles[`input--${fieldState("email")}`]}`}
                    value={form.email}
                    onChange={e => set("email", e.target.value)}
                    onBlur={() => touch("email")}
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                </Field>

                {/* Teléfono (opcional) */}
                <Field
                  label="Teléfono"
                  id="phone"
                  state={fieldState("phone")}
                  hint="Opcional"
                >
                  <input
                    id="phone"
                    type="tel"
                    className={`${styles.input} ${styles[`input--${fieldState("phone")}`]}`}
                    value={form.phone}
                    onChange={e => set("phone", e.target.value)}
                    onBlur={() => touch("phone")}
                    placeholder="+54 9 351 000-0000"
                    autoComplete="tel"
                  />
                </Field>

                {/* Servicio */}
                <Field
                  label="Servicio de interés *"
                  id="service"
                  state={fieldState("service")}
                  error={errors.service}
                  full
                >
                  <select
                    id="service"
                    className={`${styles.select} ${styles[`input--${fieldState("service")}`]}`}
                    value={form.service}
                    onChange={e => set("service", e.target.value)}
                    onBlur={() => touch("service")}
                  >
                    <option value="">Seleccioná un servicio…</option>
                    {SERVICES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                {/* Mensaje */}
                <Field
                  label="Mensaje *"
                  id="message"
                  state={fieldState("message")}
                  error={errors.message}
                  full
                >
                  <textarea
                    id="message"
                    className={`${styles.textarea} ${styles[`input--${fieldState("message")}`]}`}
                    value={form.message}
                    onChange={e => set("message", e.target.value)}
                    onBlur={() => touch("message")}
                    placeholder="Contanos brevemente qué necesitás o qué problema querés resolver…"
                    rows={5}
                  />
                </Field>

              </div>

              {/* Submit */}
              <div className={styles.submitRow}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Enviando…
                    </>
                  ) : "Enviar mensaje →"}
                </button>

                {status === "error" && (
                  <p className={styles.formError} role="alert">
                    Hubo un error al enviar. Intentá de nuevo o escribinos por WhatsApp.
                  </p>
                )}
              </div>

              <p className={styles.privacyNote}>
                Tu información es solo para contactarte. No la compartimos con terceros.
              </p>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}

// ─── FIELD WRAPPER ────────────────────────────────────────────────────────────

function Field({
  label, id, children, state, error, hint, full,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  state: "default" | "error" | "ok";
  error?: string;
  hint?: string;
  full?: boolean;
}) {
  return (
    <div className={`${styles.field} ${full ? styles.fieldFull : ""}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {hint && <span className={styles.labelHint}>{hint}</span>}
      </label>
      <div className={styles.inputWrap}>
        {children}
        {state === "ok" && (
          <span className={styles.inputIcon} aria-hidden="true">✓</span>
        )}
      </div>
      {state === "error" && error && (
        <p className={styles.fieldError} role="alert">{error}</p>
      )}
    </div>
  );
}

// ─── SUCCESS STATE ────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <div className={styles.success} role="status" aria-live="polite">
      <div className={styles.successIcon} aria-hidden="true">✓</div>
      <h2 className={styles.successTitle}>¡Mensaje enviado!</h2>
      <p className={styles.successBody}>
        Te respondemos dentro del horario laboral. Si necesitás respuesta urgente, usá el WhatsApp.
      </p>
      <a className={styles.waBtn} href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer">
        WhatsApp directo
      </a>
    </div>
  );
}