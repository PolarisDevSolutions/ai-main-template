import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const heroContactFormSchema = z.object({
  firstName: z.string().min(1, "Ime je obavezno"),
  lastName: z.string().min(1, "Prezime je obavezno"),
  email: z.string().email("Unesite validnu email adresu"),
  phone: z.string().min(1, "Broj telefona je obavezan"),
  honeypot: z.string().max(0),
});

type HeroContactFormData = z.infer<typeof heroContactFormSchema>;

const inputClass =
  "bg-white/5 border border-brand-border/40 text-white placeholder:text-white/40 h-[46px] text-[15px] font-manrope focus-visible:ring-0 focus-visible:border-brand-accent transition-colors duration-200 rounded-none";

interface HeroContactFormProps {
  title?: string;
}

export default function HeroContactForm({ title }: HeroContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HeroContactFormData>({
    resolver: zodResolver(heroContactFormSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: HeroContactFormData) => {
    try {
      const formBody = new URLSearchParams({
        "form-name": "hero-contact",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || "",
      });

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });

      toast.success("Hvala! Uskoro ćemo vas kontaktirati.");
      reset();
    } catch (error) {
      console.error("Error submitting hero form:", error);
      toast.error("Nešto je pošlo po krivu. Pokušajte ponovo.");
    }
  };

  return (
    <div>
      {title && (
        <p className="font-manrope text-[12px] font-semibold tracking-[0.22em] uppercase text-brand-accent mb-5 text-center">
          {title}
        </p>
      )}

      <form
        name="hero-contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="hero-contact" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              {...register("firstName")}
              name="firstName"
              type="text"
              placeholder="Ime *"
              required
              className={inputClass}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register("lastName")}
              name="lastName"
              type="text"
              placeholder="Prezime *"
              required
              className={inputClass}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Input
            {...register("email")}
            name="email"
            type="email"
            placeholder="Email adresa *"
            required
            className={inputClass}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("phone")}
            name="phone"
            type="tel"
            placeholder="Broj telefona *"
            required
            className={inputClass}
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="absolute invisible" aria-hidden="true">
          <label htmlFor="bot-field-hero-form">
            Leave this field empty
            <Input
              {...register("honeypot")}
              type="text"
              id="bot-field-hero-form"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-brand-accent text-brand-accent bg-transparent hover:bg-brand-accent hover:text-brand-dark font-manrope text-[14px] tracking-widest uppercase h-[46px] transition-all duration-200"
        >
          {isSubmitting ? "Slanje..." : "Pošalji"}
        </Button>
      </form>
    </div>
  );
}
