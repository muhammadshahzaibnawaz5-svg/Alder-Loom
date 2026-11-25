import { FormEvent, useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PRODUCTS } from '../data/catalogue';

interface EnquirySectionProps {
  selectedPieceName: string;
  selectedFinishName: string;
  onPieceChange: (pieceName: string) => void;
  onFinishChange: (finishName: string) => void;
  focusTrigger: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const GENERAL_ENQUIRY_LABEL = 'General Showroom Enquiry';
const EASE = [0.22, 1, 0.36, 1] as const;

export function EnquirySection({
  selectedPieceName,
  selectedFinishName,
  onPieceChange,
  onFinishChange,
  focusTrigger,
}: EnquirySectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const matchedProduct = PRODUCTS.find((p) => p.name === selectedPieceName);
  const availableFinishNames = matchedProduct
    ? matchedProduct.finishes.map((f) => f.name)
    : ['Oat Linen', 'Moss Wool', 'Smoked Oak', 'To Be Advised'];

  useEffect(() => {
    if (focusTrigger > 0) {
      setSubmitted(false);
    }
  }, [focusTrigger]);

  const handlePieceSelect = (nextPiece: string) => {
    onPieceChange(nextPiece);
    const nextProduct = PRODUCTS.find((p) => p.name === nextPiece);
    if (nextProduct && nextProduct.finishes.length > 0) {
      onFinishChange(nextProduct.finishes[0].name);
    } else {
      onFinishChange('To Be Advised');
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) {
      nextErrors.message = 'Please include a short note.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="enquire"
      aria-labelledby="enquire-heading"
      className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-20 sm:pt-20 sm:pb-24 border-t border-[#E5DCCE]"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: EASE }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
      >
        <div className="lg:col-span-5">
          <h2
            id="enquire-heading"
            className="font-serif text-[clamp(2rem,3.4vw,2.85rem)] leading-[1.05] tracking-[-0.015em] text-[#302923] text-balance"
          >
            Which piece do you have in mind?
          </h2>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                role="status"
                aria-live="polite"
                className="border-t border-b border-[#9B573E] py-7"
              >
                <div className="flex items-start gap-3.5">
                  <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#302923] text-[#F7F4EE] shrink-0">
                    <Check size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="font-serif text-[26px] leading-[1.15] text-[#302923]">
                      Your demo enquiry is ready. No message has been sent.
                    </p>
                    <dl className="mt-5 pt-4 border-t border-[#E5DCCE] grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
                      <div>
                        <dt className="text-[#302923]/60">Name</dt>
                        <dd className="mt-0.5 font-medium text-[#302923]">{name}</dd>
                      </div>
                      <div>
                        <dt className="text-[#302923]/60">Piece</dt>
                        <dd className="mt-0.5 font-medium text-[#302923]">
                          {selectedPieceName || GENERAL_ENQUIRY_LABEL}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[#302923]/60">Finish</dt>
                        <dd className="mt-0.5 font-medium text-[#302923]">
                          {selectedFinishName || 'To Be Advised'}
                        </dd>
                      </div>
                    </dl>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                      }}
                      className="mt-6 min-h-[44px] px-5 py-2 border border-[#302923]/30 text-[#302923] text-[14px] font-medium rounded-[4px] cursor-pointer hover:bg-[#E5DCCE]/50 transition-colors duration-150"
                    >
                      Prepare another enquiry
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-[12px] uppercase tracking-[0.06em] text-[#302923]/70 mb-1.5"
                    >
                      Name <span aria-hidden="true" className="text-[#9B573E]">*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
                      placeholder="Clara Jensen"
                      className={`w-full min-h-[44px] px-0 py-2 bg-transparent text-[#302923] placeholder:text-[#302923]/35 text-[15px] border-0 border-b transition-colors duration-200 focus:outline-none ${
                        errors.name
                          ? 'border-[#9B573E]'
                          : 'border-[#E5DCCE] focus:border-[#302923]'
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="enquiry-name-error"
                        role="alert"
                        className="mt-1.5 text-[13px] text-[#9B573E]"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-email"
                      className="block text-[12px] uppercase tracking-[0.06em] text-[#302923]/70 mb-1.5"
                    >
                      Email <span aria-hidden="true" className="text-[#9B573E]">*</span>
                    </label>
                    <input
                      id="enquiry-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
                      placeholder="clara@studio-example.com"
                      className={`w-full min-h-[44px] px-0 py-2 bg-transparent text-[#302923] placeholder:text-[#302923]/35 text-[15px] border-0 border-b transition-colors duration-200 focus:outline-none ${
                        errors.email
                          ? 'border-[#9B573E]'
                          : 'border-[#E5DCCE] focus:border-[#302923]'
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="enquiry-email-error"
                        role="alert"
                        className="mt-1.5 text-[13px] text-[#9B573E]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="enquiry-piece"
                      className="block text-[12px] uppercase tracking-[0.06em] text-[#302923]/70 mb-1.5"
                    >
                      Piece of interest
                    </label>
                    <select
                      id="enquiry-piece"
                      name="piece"
                      value={selectedPieceName}
                      onChange={(e) => handlePieceSelect(e.target.value)}
                      className="w-full min-h-[44px] px-0 py-2 bg-transparent text-[#302923] text-[15px] border-0 border-b border-[#E5DCCE] focus:border-[#302923] focus:outline-none cursor-pointer transition-colors duration-200"
                    >
                      {PRODUCTS.map((product) => (
                        <option key={product.id} value={product.name} className="bg-[#F7F4EE]">
                          {product.name}
                        </option>
                      ))}
                      <option value={GENERAL_ENQUIRY_LABEL} className="bg-[#F7F4EE]">
                        {GENERAL_ENQUIRY_LABEL}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-finish"
                      className="block text-[12px] uppercase tracking-[0.06em] text-[#302923]/70 mb-1.5"
                    >
                      Preferred finish
                    </label>
                    <select
                      id="enquiry-finish"
                      name="finish"
                      value={
                        availableFinishNames.includes(selectedFinishName)
                          ? selectedFinishName
                          : availableFinishNames[0]
                      }
                      onChange={(e) => onFinishChange(e.target.value)}
                      className="w-full min-h-[44px] px-0 py-2 bg-transparent text-[#302923] text-[15px] border-0 border-b border-[#E5DCCE] focus:border-[#302923] focus:outline-none cursor-pointer transition-colors duration-200"
                    >
                      {availableFinishNames.map((finishName) => (
                        <option key={finishName} value={finishName} className="bg-[#F7F4EE]">
                          {finishName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block text-[12px] uppercase tracking-[0.06em] text-[#302923]/70 mb-1.5"
                  >
                    Message <span aria-hidden="true" className="text-[#9B573E]">*</span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) {
                        setErrors((prev) => ({ ...prev, message: undefined }));
                      }
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
                    placeholder="Notes on layout, swatches, or timing."
                    className={`w-full px-0 py-2 bg-transparent text-[#302923] placeholder:text-[#302923]/35 text-[15px] border-0 border-b transition-colors duration-200 focus:outline-none resize-y ${
                      errors.message
                        ? 'border-[#9B573E]'
                        : 'border-[#E5DCCE] focus:border-[#302923]'
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="enquiry-message-error"
                      role="alert"
                      className="mt-1.5 text-[13px] text-[#9B573E]"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="min-h-[44px] px-6 py-2.5 bg-[#302923] text-[#F7F4EE] text-[14px] font-medium tracking-[0.01em] rounded-[4px] whitespace-nowrap cursor-pointer hover:bg-[#463B32] transition-colors duration-200"
                  >
                    Prepare enquiry
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
