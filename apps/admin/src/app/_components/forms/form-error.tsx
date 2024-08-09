interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-red-50 p-3 text-sm text-primary">
      <p>{message}</p>
    </div>
  );
}
