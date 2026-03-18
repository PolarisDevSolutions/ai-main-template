import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  honeypot: z.string().max(0, 'Bot detected'), // Should remain empty
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const formBody = new URLSearchParams({
        'form-name': 'contact',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || '',
        message: data.message,
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      toast.success('Thank you! We will contact you soon.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-brand-card border border-brand-border p-[30px]">
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-[25px]"
      >
        <input type="hidden" name="form-name" value="contact" />
        {/* First Name */}
        <div>
          <Input
            {...register('firstName')}
            name="firstName"
            type="text"
            placeholder="First Name *"
            className="bg-[rgb(247,247,247)] border-[rgb(196,196,196)] text-[rgb(107,107,107)] h-[50px] text-[16px] placeholder:text-[rgb(107,107,107)]"
            aria-invalid={errors.firstName ? 'true' : 'false'}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <Input
            {...register('lastName')}
            name="lastName"
            type="text"
            placeholder="Last Name *"
            className="bg-[rgb(247,247,247)] border-[rgb(196,196,196)] text-[rgb(107,107,107)] h-[50px] text-[16px] placeholder:text-[rgb(107,107,107)]"
            aria-invalid={errors.lastName ? 'true' : 'false'}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            {...register('email')}
            name="email"
            type="email"
            placeholder="Email Address *"
            className="bg-[rgb(247,247,247)] border-[rgb(196,196,196)] text-[rgb(107,107,107)] h-[50px] text-[16px] placeholder:text-[rgb(107,107,107)]"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Input
            {...register('phone')}
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="bg-[rgb(247,247,247)] border-[rgb(196,196,196)] text-[rgb(107,107,107)] h-[50px] text-[16px] placeholder:text-[rgb(107,107,107)]"
          />
        </div>

        {/* Message */}
        <div>
          <Textarea
            {...register('message')}
            name="message"
            placeholder="Message *"
            className="bg-[rgb(247,247,247)] border-[rgb(196,196,196)] text-[rgb(107,107,107)] min-h-[200px] text-[16px] placeholder:text-[rgb(107,107,107)] resize-y"
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Netlify Honeypot field (hidden from users) */}
        <div className="absolute invisible" aria-hidden="true">
          <label htmlFor="bot-field-form">
            If you are a human seeing this field, please leave it empty.
            <Input
              {...register('honeypot')}
              type="text"
              id="bot-field-form"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-accent-dark text-brand-accent border-brand-accent font-outfit text-[22px] h-[50px] hover:bg-brand-accent hover:text-black transition-all duration-300"
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
          </Button>
        </div>
      </form>
    </div>
  );
}
